class RenameDimensionToSpecificationProductsTable < ActiveRecord::Migration[5.0]
  def change
    rename_column :products, :dimension, :specification
  end
end
