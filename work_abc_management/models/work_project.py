import json

from odoo import api, fields, models, _


class WorkProject(models.Model):
    _name = "work.project"
    _description = "Task Project"
    _order = 'pin desc, sequence asc, create_date desc'
    _rec_name = "name"

    pin = fields.Integer(string='Pin')
    sequence = fields.Integer(string='Sequence')
    project_name = fields.Char(string='Name', required=True)
    project_key = fields.Char(string='Project Key')
    allowed_user_ids = fields.Many2many('res.users', 'res_user_work_project_rel_1', 'work_project_id', 'res_users_id',
                                        string='Allowed Users')
    allowed_manager_ids = fields.Many2many('res.users', 'res_user_work_project_rel_2', 'work_project_id', 'res_users_id',
                                           string='Managers')
    task_ids = fields.One2many('work.task', 'project_id', string='Tasks')
    chain_work_ids = fields.One2many("work.chain.work.session", "project_id", "Chain Works")
    board_ids = fields.One2many('board.board', 'project_id', string="Boards")
    sprint_ids = fields.One2many('agile.sprint', 'project_id', string="Sprints")
    personal_id = fields.Many2one("res.users", string="Personal Board User")
    company_id = fields.Many2one('res.company', string='Company', required=True, default=lambda self: self.env.company)
    name = fields.Char(string="Name", compute="_compute_name", store=True)
    stage_id = fields.Many2one("work.project.stage", string="Stage", default=lambda self: self.env.ref('work_abc_management.stage_in_progress').id)
    status = fields.Char(name="Status", related="stage_id.key", store=True)
    allowed_type_ids = fields.Many2many("work.type", string="Allowed Issue Types")

    @api.depends('project_name', 'project_key')
    def _compute_name(self):
        for project in self:
            project.name = '%s - %s' % (project.project_key, project.project_name)

    @api.model
    def _name_search(self, name, domain=None, operator='ilike', limit=None, order=None):
        if len(name):
            domain = ['|', ('project_name', 'ilike', name), ('project_key', 'ilike', name)]
        return super()._name_search(name, domain, operator, limit, order)


    def fetch_user_from_task(self):
        for record in self:
            user_ids = self.env['work.task'] \
                .search([('project_id', '=', record.id)]) \
                .mapped('time_log_ids').mapped('user_id')
            create_new_users = user_ids.filtered(lambda r: r.id not in record.allowed_user_ids.ids)
            record.allowed_user_ids = create_new_users.mapped(lambda r: (4, r.id, False))

    @api.model
    def cron_fetch_user_from_task(self):
        self.search([]).fetch_user_from_task()

    def action_start_kick_off(self):
        self.ensure_one()
        action = self.env["ir.actions.actions"]._for_xml_id("work_abc_management.chain_work_base_action")
        action["context"] = {
            'default_project_id': self.id,
        }
        return action

    def action_start_latest_chain(self):
        self.ensure_one()
        my_chain_work_ids = self.chain_work_ids.filtered(
            lambda r: r.create_uid == self.env.user and r.state != "logged")
        if my_chain_work_ids:
            action = self.env["ir.actions.actions"]._for_xml_id("work_abc_management.log_work_action_form_mobile_view")
            action["res_id"] = my_chain_work_ids[0].id
            action["context"] = {"mobile": True}
            return action

    def action_open_sprint(self):
        self.ensure_one()
        action = self.env['ir.actions.actions']._for_xml_id("work_abc_management.action_work_active_sprint")
        action["domain"] = [('project_id', '=', self.id)]
        return action

    def action_open_allocation(self):
        self.ensure_one()
        action = self.env['ir.actions.actions']._for_xml_id("work_abc_management.action_work_allocation")
        action["domain"] = [('project_id', '=', self.id)]
        context = json.loads(action['context'])
        context['default_project_id'] = self.id
        action['context'] = context
        return action
    
    def action_open_finance(self):
        self.ensure_one()
        action = self.env['ir.actions.actions']._for_xml_id("work_abc_management.action_work_finance")
        action["domain"] = [('project_id', '=', self.id)]
        context = json.loads(action['context'])
        context['default_project_id'] = self.id
        action['context'] = context
        return action
    
    def action_export_record(self, workbook):
        self.ensure_one()
        header_format = workbook.add_format({
            'text_wrap': True,
            'valign': 'top',
            'bold': True,
            'align': 'center'
        })
        text_format = workbook.add_format({
            'text_wrap': True,
            'valign': 'top'
        })
        sheet = workbook.add_worksheet(self.display_name)
        sheet.write(0, 0, self.display_name, header_format)
        sheet.write(1, 0, self.project_key, text_format)
        return workbook
    
    @api.model
    def create(self, values):
        if 'allowed_manager_ids' in values:
            values['allowed_user_ids'] = values['allowed_manager_ids']
        return super().create(values)

    def write(self, values):
        if 'project_key' in values:
            for project in self:
                tasks = self.env['work.task'].search([('project_id', '=', project.id)])
                update_stmt = f"""
                    UPDATE work_task SET task_key = REGEXP_REPLACE(task_key, '{project.project_key}', '{values['project_key']}') WHERE id IN %(task_ids)s
                """
                self._cr.execute(update_stmt, {
                    'task_ids': tuple(tasks.ids)
                })

        res = super().write(values)
        if len(values.get('allowed_manager_ids', [])):
            new_record = self.new(values)
            for record in self:
                new_users = new_record.allowed_manager_ids - record.allowed_user_ids
                if (new_users):
                    record.allowed_user_ids = [fields.Command.link(user._origin.id) for user in new_users]

        return res

    def gather_personal_project(self):
        project = self.search([('personal_id', '=', self.env.user.id)])
        if not project:
            board_name = self.env.user.name or self.env.user.employee_id.name
            project = self.create({
                'project_name': "PERSONAL: " + board_name,
                'project_key': "PER" + "".join([x[0] for x in board_name.split(' ') if len(x)]),
                'personal_id': self.env.user.id
            })
        return project
    
    def action_open_allocation_report(self):
        project_ids = self.ids
        action = self.env['ir.actions.act_window']._for_xml_id("work_abc_management.action_work_allocation_pivot_report")
        action['domain'] = [('project_id', 'in', project_ids)]
        action['name'] = f"{self.display_name} - Allocations"
        return action


class WorkProject(models.Model):
    _name = "work.project.stage"
    _description = "Task Project Stages"

    name = fields.Char(string="Name", required=True)
    key = fields.Char(string="Key", required=True)
    color = fields.Float(string="Color")
