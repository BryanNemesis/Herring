from django.conf import settings
from rest_framework import serializers

from profiles.serializers import PublicProfileSerializer
from .models import Fillet


class FilletActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    text = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if value not in settings.FILLET_ACTION_OPTIONS:
            raise serializers.ValidationError(f"'{value}' is not a valid action for fillets")
        return value


class FilletCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    like_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Fillet
        fields = [
            'id',
            'text',
            'user',
            'like_count',
            'timestamp',
            ]

    def get_like_count(self, obj):
        return obj.likes.count()

    def validate_text(self, value):
        if len(value) > settings.MAX_FILLET_LENGTH:
            raise serializers.ValidationError(
                f"Fillets can't be longer than {settings.MAX_FILLET_LENGTH} characters.")
        if not value.strip():
            raise serializers.ValidationError("Fillets cannot be empty.")
        self.censor_text(value)
        return value

    @staticmethod
    def censor_text(text):
        for bad_word in settings.BAD_WORDS:
            if bad_word in text.lower():
                raise serializers.ValidationError(
                    f"Fillets cannot contain forbidden word '{bad_word.title()}'. Please be polite!")


class FilletSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    like_count = serializers.SerializerMethodField(read_only=True)
    parent = FilletCreateSerializer(read_only=True)

    class Meta:
        model = Fillet
        fields = [
            'id',
            'text',
            'user',
            'like_count',
            'timestamp',
            'is_repost',
            'parent',
            ]

    def get_like_count(self, obj):
        return obj.likes.count()
