require File.expand_path('../boot', __FILE__)

require 'rails/all'

require 'sprockets'
require 'angular-rails-templates'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module MixCritic
  class Application < Rails::Application

    config.assets.precompile += ['*.tpl.html','*/*.html']


    config.secret_key_base = ENV["SECRET_KEY_BASE"]

    config.active_record.raise_in_transactional_callbacks = true

    AWS.config(
        :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
        :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
    )

    S3_BUCKET =  AWS::S3.new.buckets[ENV['S3_BUCKET']]

    config.assets.paths << Rails.root.join("vendor","assets","bower_components")

    config.to_prepare do
      DeviseController.respond_to :html, :json
    end

  end
end
