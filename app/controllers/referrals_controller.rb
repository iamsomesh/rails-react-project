class ReferralsController < ApplicationController
  before_action :authenticate_user!

  def send_referral
    sender = current_user
    recipient_email = params[:recipient_email]

    Referral.create(sender: sender, recipient_email: recipient_email)

    ReferralMailer.send_referral_email(sender, recipient_email).deliver_now

    render json: { message: 'Referral email sent successfully' }, status: :ok
  end

  def list_referred_emails
    referred_emails = Referral.where(sender: current_user).pluck(:recipient_email).uniq

    render json: { referred_emails: referred_emails }, status: :ok
  end
end
