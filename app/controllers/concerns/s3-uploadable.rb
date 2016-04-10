module S3Uploadable
  extend ActiveSupport::Concern

  def self.upload_file(file:,for_object:)
    obj = S3_BUCKET.objects[file.original_filename]

    # Upload the file
    obj.write(
      file: file,
      acl: :public_read
    )

    # Create an object for the upload
    @upload = Upload.new(
            url: obj.public_url,
            name: obj.key,
            revision: for_object
    )

    success=@upload.save
    for_object.upload=@upload
    for_object.save
    return success
    
  end
  
end