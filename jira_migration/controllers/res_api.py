import json
from odoo import http, _
from odoo.http import request
from odoo.addons.project_management.controllers.ticket import JiraTicket
from odoo.addons.project_management.controllers.auth import Auth
from odoo.addons.project_management.utils.error_tracking import handling_exception


class JiraTicketMigration(JiraTicket):

    @handling_exception
    @http.route(['/management/ticket/search/<string:keyword>'], type="http", cors="*", methods=['GET', 'POST'],
                auth='jwt')
    def search_ticket(self, keyword):
        try:
            res = super().search_ticket(keyword)
            if res.data == b'[]':
                ticket_ids = request.env['jira.ticket']
                for migrate in request.env['jira.migration'].sudo().search([]):
                    ticket_ids |= migrate.sudo().search_ticket(keyword)
                if ticket_ids:
                    data = self._get_ticket(ticket_ids)
                    return http.Response(json.dumps(data), content_type='application/json', status=200)
        except Exception as e:
            return http.Response(str(e), content_type='application/json', status=400)
        return res
    
    @handling_exception
    @http.route(['/management/ticket/fetch/<int:ticket_id>'], type="http", cors="*", methods=["GET", "POST"],
                auth="jwt")
    def fetch_ticket_from_server(self, ticket_id):
        if not ticket_id:
            return Exception("Need to provide ticket id")
        ticket_id = request.env['jira.ticket'].browse(ticket_id)
        ticket_id.jira_migration_id._search_load('ticket', [ticket_id.ticket_key])
        return http.Response("", content_type='application/json', status=200)
        
    @handling_exception
    @http.route(['/management/ticket/export'], type="http", cors="*", methods=["GET", "POST"], auth="jwt")
    def export_ticket_to_server(self):
        ticket_id = super().check_work_log_prerequisite()
        data = ticket_id.export_ticket_to_server(json.loads(request.params.get('payload', "{}")))
        return http.Response(json.dumps(data), content_type='application/json', status=200)

class AuthInherited(Auth):

    @http.route(['/web/login/jwt'], methods=['GET', 'POST'], cors="*", type="http", auth="none", csrf=False)
    def auth_login_encrypt(self):
        res = super().auth_login_encrypt()
        employee_id = request.env['hr.employee'].sudo().search([('user_id', '=', request.env.user.id)], limit=1)
        if employee_id and employee_id.auto_remove_access:
            request.env['user.access.code'].sudo().search([('uid', '=', request.env.user.id)],
                                                          order='create_date desc',
                                                          offset=employee_id.maximum_connection).unlink()
        return res
