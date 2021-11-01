from django.core.mail import send_mail
from django.dispatch import receiver

from django_rest_passwordreset.signals import reset_password_token_created, post_password_reset

@receiver(reset_password_token_created)
def reset_email_sent(sender, instance, reset_password_token, *args, **kwargs):

    subject = "Password Reset for {title}".format(title="ReFuel ePantry")
    message = "Please click on the following link to reset your password: {}?token={}".format(
        "https://localhost:8000/resetpassword",
        reset_password_token.key
    )

    send_mail(
        subject=subject,
        message=message,
        from_email="noreply@foobar.com",
        recipient_list=[reset_password_token.user.email]
    )

@receiver(post_password_reset)
def password_reset_successfully(sender, user, *args, **kwargs):

    subject = "Successfully Reset Password for {title}".format(title="ReFuel ePantry")
    message = "You're password has been successfully reset. If you did not initiate this, please contact a system administrator for assistance: {contact}".format(contact="https://localhost:8000/contact")

    send_mail(
        subject=subject,
        message=message,
        from_email="noreply@foobar.com",
        recipient_list=[user.email]
    )