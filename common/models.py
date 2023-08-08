from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def __repr__(self):
        fields = ' '.join([
            '{}={}'.format(f.name, getattr(self, f.name))
            for f in self._meta.fields
        ])

        return '<{class}: {fields}>'.format(**{
            'class': type(self).__name__,
            'fields': fields,
        }).encode('utf-8')
