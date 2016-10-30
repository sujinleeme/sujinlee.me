"""
Apps for tagging.
"""
from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class TaggingConfig(AppConfig):
    """
    Config for Tagging application.
    """
    name = 'tagging'
    label = 'tagging'
    verbose_name = _('Tagging')
