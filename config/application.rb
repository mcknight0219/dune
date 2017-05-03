require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Dune
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
   
    # use CAD as default currency
    Money.default_currency = Money::Currency.new("CAD")

    config.to_prepare do
      Devise::SessionsController.layout 'application'
      Devise::RegistrationsController.layout 'application'
      Devise::ConfirmationsController.layout 'application'
      Devise::PasswordsController.layout 'application'
      Devise::UnlocksController.layout 'application'
    end
    config.i18n.default_locale = :'zh-CN'
  end
end
