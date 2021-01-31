from django import forms
from django.conf import settings

from .models import Fillet


class FilletForm(forms.ModelForm):
    class Meta:
        model = Fillet
        fields = ['text']

    def clean_text(self):
        text = self.cleaned_data.get('text')
        if len(text) > settings.MAX_FILLET_LENGTH:
            raise forms.ValidationError(f"Fillets can't be longer than {settings.MAX_FILLET_LENGTH} characters.")
        self.censor_text(text)
        return text

    @staticmethod
    def censor_text(text):
        for bad_word in settings.BAD_WORDS:
            if bad_word in text.lower():
                raise forms.ValidationError(
                    f"Fillets cannot contain forbidden word '{bad_word.title()}'. Please be polite!")