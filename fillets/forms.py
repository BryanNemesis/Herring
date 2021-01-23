from django import forms

from .models import Fillet


MAX_FILLET_LENGTH = 255


class FilletForm(forms.ModelForm):
    class Meta:
        model = Fillet
        fields = ['text']

    def clean_text(self):
        text = self.cleaned_data.get('text')
        if len(text) > MAX_FILLET_LENGTH:
            raise forms.ValidationError(f"Fillets can't be longer than {MAX_FILLET_LENGTH} characters.")
        return text
