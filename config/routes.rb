Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
    }
    post '/send_referral', to: 'referrals#send_referral'
    get '/list_referred_emails', to: 'referrals#list_referred_emails'
end
