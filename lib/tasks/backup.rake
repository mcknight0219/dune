namespace :backup do
  desc 'Backup data to Dropbox'
  task images: :environment do
    client = DropboxApi::Client.new(Rails.application.secrets.dropbox_token)
    root_path = "#{Rails.root}/public/system/addresses"
    Dir["#{root_path}/**/*"].each do |f|
      if File.file? f
        rel_path = Pathname.new(f).relative_path_from(Pathname.new(root_path)).to_s
        client.upload "/#{rel_path}", IO.read(f)
      end
    end

    puts 'Backing up task completed !'
  end
end
