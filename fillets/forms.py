from django import forms

from .models import Fillet


MAX_FILLET_LENGTH = 255
BAD_WORDS = ['kurwa', 'huj', 'dupa', 'fuck', 'shit']


class FilletForm(forms.ModelForm):
    class Meta:
        model = Fillet
        fields = ['text']

    def clean_text(self):
        text = self.cleaned_data.get('text')
        if len(text) > MAX_FILLET_LENGTH:
            raise forms.ValidationError(f"Fillets can't be longer than {MAX_FILLET_LENGTH} characters.")
        censor_text(text)
        return text

    @staticmethod
    def censor_text(text):
        for bad_word in BAD_WORDS:
            if bad_word in text.lower():
                raise forms.ValidationError(
                    f"Fillets cannot contain forbidden word '{bad_word.title()}'. Please be polite!")