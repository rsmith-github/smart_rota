# Generated by Django 4.2.1 on 2024-01-25 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_timetable'),
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_user', models.CharField(max_length=255)),
                ('employer_code', models.CharField(max_length=255)),
                ('message_type', models.CharField(max_length=255)),
                ('to_user', models.CharField(max_length=255, null=True)),
                ('content', models.TextField(null=True)),
            ],
        ),
    ]
