class FileUploadsController < ApplicationController
  protect_from_forgery except: [:upload]
  before_action :authenticate_user!
  def upload
    uploader = EditorImageUploader.new
    uploader.store!(params["upload"])
    url = "#{request.protocol}#{request.host_with_port}/uploads/#{uploader.filename}"
    # uploader.retrieve_from_store!(uploader.filename)
    render json: { 
    uploaded: 1,
    fileName: uploader.filename,
    url: url  }
  end
end
