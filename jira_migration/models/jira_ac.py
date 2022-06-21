from datetime import datetime
from odoo import api, fields, models, _
from odoo.addons.jira_migration.utils.ac_parsing import unparsing


class JiraACs(models.Model):
    _inherit = "jira.ac"

    jira_raw_name = fields.Char(string="Jira Name")

    @api.model
    def create(self, values):
        if 'name' in values:
            values['jira_raw_name'] = unparsing(values['name'])
        return super().create(values)

    def write(self, values):
        if 'name' in values:
            values['jira_raw_name'] = unparsing(values['name'])
        return super().write(values)