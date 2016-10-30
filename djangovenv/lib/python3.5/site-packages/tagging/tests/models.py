from django.db import models
from django.utils.encoding import python_2_unicode_compatible

from tagging.fields import TagField


class Perch(models.Model):
    size = models.IntegerField()
    smelly = models.BooleanField(default=True)


@python_2_unicode_compatible
class Parrot(models.Model):
    state = models.CharField(max_length=50)
    perch = models.ForeignKey(Perch, null=True,
                              on_delete=models.CASCADE)

    def __str__(self):
        return self.state

    class Meta:
        ordering = ['state']


@python_2_unicode_compatible
class Link(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


@python_2_unicode_compatible
class Article(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class FormTest(models.Model):
    tags = TagField('Test', help_text='Test')


class FormTestNull(models.Model):
    tags = TagField(null=True)


class FormMultipleFieldTest(models.Model):
    tagging_field = TagField('Test', help_text='Test')
    name = models.CharField(max_length=50)
