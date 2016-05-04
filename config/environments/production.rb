Rails.application.configure do
  config.cache_classes = true
  #config.eager_load = true
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true
  config.serve_static_files = ENV['RAILS_SERVE_STATIC_FILES'].present?
  config.assets.js_compressor = Uglifier.new(mangle: false)
  config.assets.compile = false
  config.assets.digest = true
  config.log_level = :debug
  config.i18n.fallbacks = true
  config.active_support.deprecation = :notify
  config.log_formatter = ::Logger::Formatter.new
  config.active_record.dump_schema_after_migration = false
  config.paperclip_defaults = {
    :storage => :s3,
    :s3_credentials => {
      :bucket => ENV['S3_BUCKET'],
      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
    }
  }

  # Required
  config.eager_load = false
  config.assets.compile = false #Should be false but okay

  # Development
  #config.cache_classes = false
  #config.consider_all_requests_local       = true
  #config.action_controller.perform_caching = false
  #config.action_mailer.raise_delivery_errors = false
  #config.active_support.deprecation = :log
  #config.active_record.migration_error = :page_load
  #config.assets.debug = true
  #config.assets.digest = true
  #config.assets.raise_runtime_errors = true

end
