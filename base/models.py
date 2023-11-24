from django.db import models

# Create your models here.
class Sentiment(models.Model):
    Review = models.TextField()

    def __str__(self):
        return self.value




