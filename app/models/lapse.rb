class Lapse
  include Mongoid::Document
  include Mongoid::Timestamps

  field :error_log
  field :docker, type: Hash
  field :tag
  field :kubernetes, type: Hash
  field :log_timestamp, type: DateTime
  field :service_name
  field :level
  field :logger
  field :thread
  field :message
  field :is_checked, type: Mongoid::Boolean, default: false

end