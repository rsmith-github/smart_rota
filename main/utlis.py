
from .models import Messages, TimeTable


def check_message_duplicates(user, new_morning_shift, new_evening_shift):
    if (
        Messages.objects.filter(
            from_user=user['username'],
            employer_code=user['employer_code'],
            morning_shift=new_morning_shift,
            evening_shift=new_evening_shift
        ).exists()
        or TimeTable.objects.filter(
            username=user['username'],
            morning_shift=new_morning_shift,
            evening_shift=new_evening_shift
        )
    ):
        return True
