from django.contrib.auth import get_user_model
from django.test import TestCase

from rest_framework.test import APIClient

from .models import Fillet


User = get_user_model()


class FilletTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='someuser', password='somepassword')
        self.user_b = User.objects.create_user(username='someuser_b', password='somepassword')
        self.client = APIClient()
        self.client.login(username=self.user.username, password='somepassword')
        Fillet.objects.create(text='one', user=self.user)
        Fillet.objects.create(text='two', user=self.user)
        Fillet.objects.create(text='three', user=self.user_b)
        self.fillet_count = Fillet.objects.all().count()

    def test_fillet_created(self):
        fillet = Fillet.objects.create(text='four', user=self.user)
        self.assertEqual(fillet.id, 4)
        self.assertEqual(fillet.user, self.user)

    def test_fillet_list(self):
        response = self.client.get('/api/fillets/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_action_like(self):
        response = self.client.post('/api/fillets/action/', {'id': 1, 'action': 'like'})
        like_count = response.json().get('like_count')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(like_count, 1)

    def test_action_unlike(self):
        response = self.client.post('/api/fillets/action/', {'id': 1, 'action': 'like'})
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/api/fillets/action/', {'id': 1, 'action': 'unlike'})
        like_count = response.json().get('like_count')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(like_count, 0)

    def test_action_repost(self):
        response = self.client.post('/api/fillets/action/', {'id': 1, 'action': 'repost'})
        new_fillet_id = response.json().get('id')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(new_fillet_id, self.fillet_count + 1)

    def test_create(self):
        response = self.client.post('/api/fillets/create/', {'text': 'x'})
        new_fillet_text = response.json().get('text')
        new_fillet_id = response.json().get('id')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(new_fillet_id, self.fillet_count + 1)
        self.assertEqual(new_fillet_text, 'x')

    def test_detail(self):
        response = self.client.get('/api/fillets/1/')
        fillet_id = response.json().get('id')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(fillet_id, 1)
        response = self.client.get('/api/fillets/5/')
        self.assertEqual(response.status_code, 404)

    def test_delete(self):
        response = self.client.delete('/api/fillets/1/delete/')
        self.assertEqual(response.status_code, 200)
        response = self.client.delete('/api/fillets/1/delete/')
        self.assertEqual(response.status_code, 404)
        response_incorrect_owner = self.client.delete('/api/fillets/3/delete/')
        self.assertEqual(response_incorrect_owner.status_code, 403)
