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
    config.browserify_rails.commandline_options = "-t [ babelify --presets [ es2015 ] ]"

    config.browserify_rails.force = true
    unless Rails.env.production?
      config.browserify_rails.paths << lambda { |p|
        p.start_with?(Rails.root.join('spec', 'javascripts').to_s)
      }
    end
    # use CAD as default currency
    Money.default_currency = Money::Currency.new("CAD")

    config.to_prepare do
      Devise::SessionsController.layout 'simple_application'
      Devise::RegistrationsController.layout 'simple_application'
      Devise::ConfirmationsController.layout 'simple_application'
      Devise::PasswordsController.layout 'simple_application'
      Devise::UnlocksController.layout 'simple_application'
    end
  end
end
