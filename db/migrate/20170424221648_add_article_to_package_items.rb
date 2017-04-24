class AddArticleToPackageItems < ActiveRecord::Migration[5.0]
  def change
    add_column :package_items, :article, :string
  end
end