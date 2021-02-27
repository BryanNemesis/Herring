from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient

from .models import Profile


User = get_user_model()

class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='someuser', password='somepassword')
        self.user_b = User.objects.create_user(username='someuser_b', password='somepassword')

    def get_client(self):
        self.client = APIClient()
        self.client.login(username=self.user.username, password='somepassword')

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)  # check if profile objects were created alongside users

    def test_following(self):
        user_a = self.user
        user_b = self.user_b
        user_a.profile.followers.add(user_b)  # add a follower
        user_a_follows_whom = user_a.following.all()
        user_b_follows_whom = user_b.following.all()
        qs = user_b_follows_whom.filter(user=user_a)
        self.assertTrue(qs.exists())  #  check if user b follows user a
        self.assertFalse(user_a_follows_whom.exists())  # check if user a follows no one

    def test_follow_api_endpoint(self):
        self.get_client()
        response = self.client.post(f'/api/profiles/{self.user_b.username}/follow/',
            {'action': 'follow'},
        )
        data = response.json()
        count = data.get('count')
        self.assertEqual(count, 1)

    def test_unfollow_api_endpoint(self):
        user_a = self.user
        user_b = self.user_b
        user_a.profile.followers.add(user_b)  # add a follower
        self.get_client()
        response = self.client.post(f'/api/profiles/{user_b.username}/follow/',
            {'action': 'unfollow'},
        )
        data = response.json()
        count = data.get('count')
        self.assertEqual(count, 0)

    def test_cannot_follow_self_api_endpoint(self):
        self.get_client()
        response = self.client.post(f'/api/profiles/{self.user.username}/follow/',
            {'action': 'follow'},
        )
        data = response.json()
        count = data.get('count')
        self.assertEqual(count, 0)