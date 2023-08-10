
class ReferralMailer < ApplicationMailer
  def send_referral_email(sender, recipient_email)
    @sender = sender
    @signup_link = 'http://localhost:3001/signup'

    mail to: recipient_email, subject: 'Invitation to Sign Up' do |format|
      format.html { render html: referral_email_html_content.html_safe }
    end
  end

  private

  def referral_email_html_content
    "<p>Hello, <strong>#{@sender.email}</strong> has referred you to sign up on our platform. "\
    "Click on the following link to create your account: <a href='#{@signup_link}'>Sign Up</a></p>"
  end
end
