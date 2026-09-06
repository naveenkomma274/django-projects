from django.db import models

class Link(models.Model):
    address = models.CharField(max_length=1000, blank=True, null=True)
    name = models.CharField(max_length=1000, blank=True, null=True)

    def __str__(self):
        # Returns name if present, falls back to address, or a default string
        return self.name or self.address or "Unnamed Link"