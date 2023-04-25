from django.test import TestCase

# Create your tests here.
from django.test import Client, TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from main.models import Company


class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        # self.register_employee_url = reverse(
        #     'register', args=['register-employee'])
        # self.register_employer_url = reverse(
        #     'register', args=['register-employer'])
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.index_url = reverse('index')
        self.register_company_url = reverse('register-company')
        self.get_team_url = reverse('get-team')
        self.team_url = reverse('team')
        self.rota_url = reverse('rota')
        self.user = User.objects.create_user(
            username='testuser', password='testpassword', email='testuser@example.com')
        self.company = Company.objects.create(
            company_name='testcompany', company_code='123456')

    def test_index_view(self):
        response = self.client.get(self.index_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/index.html')

    def test_login_view(self):
        response = self.client.get(self.login_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/login.html')

    def test_logout_view(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.get(self.logout_url)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.index_url)

    # def test_register_employee_view(self):
    #     response = self.client.get(self.register_employee_url)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'main/register.html')
    #     data = {'username': 'testemployee', 'email': 'testemployee@example.com',
    #             'employer-code': self.company.company_code, 'password': 'testpassword', 'confirmation': 'testpassword'}
    #     response = self.client.post(self.register_employee_url, data)
    #     self.assertEqual(response.status_code, 302)
    #     self.assertRedirects(response, self.index_url)

    # def test_register_employer_view(self):
    #     response = self.client.get(self.register_employer_url)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'main/register.html')
    #     data = {'username': 'testemployer', 'email': 'testemployer@example.com',
    #             'employer-code': self.company.company_code, 'password': 'testpassword', 'confirmation': 'testpassword'}
    #     response = self.client.post(self.register_employer_url, data)
    #     self.assertEqual(response.status_code, 302)
    #     self.assertRedirects(response, self.index_url)

    # def test_register_company_view(self):
    #     response = self.client.get(self.register_company_url)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'main/company.html')
    #     data = {'company-name': 'testcompany'}
    #     response = self.client.post(self.register_company_url, data)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertContains(response, "Registered successfully!")
    #     data = {'company-name': 'testcompany'}
    #     response = self.client.post(self.register_company_url, data)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertContains(response, "Company already exists.")

    def test_get_team_view(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.get(self.get_team_url)
        self.assertEqual(response.status_code, 403)
        self.client.logout()
        self.user.user_type = 'Employee'
        self.user.employer_code = self.company.company
