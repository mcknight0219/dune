# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170313001709) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "country"
    t.string   "state"
    t.string   "city"
    t.string   "post_code"
    t.string   "address_line1"
    t.string   "address_line2"
    t.string   "phone"
    t.string   "mobile",                null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "user_id"
    t.string   "name"
    t.string   "id_front_file_name"
    t.string   "id_front_content_type"
    t.integer  "id_front_file_size"
    t.datetime "id_front_updated_at"
    t.string   "id_back_file_name"
    t.string   "id_back_content_type"
    t.integer  "id_back_file_size"
    t.datetime "id_back_updated_at"
    t.index ["user_id"], name: "index_addresses_on_user_id", using: :btree
  end

  create_table "contacts", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_contacts_on_email", using: :btree
  end

  create_table "order_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "order_id"
    t.integer  "product_id"
    t.index ["order_id"], name: "index_order_items_on_order_id", using: :btree
    t.index ["product_id"], name: "index_order_items_on_product_id", using: :btree
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "items"
    t.boolean  "refunded",   default: false
    t.boolean  "shipped",    default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "user_id"
    t.integer  "address_id"
    t.index ["address_id"], name: "index_orders_on_address_id", using: :btree
    t.index ["user_id"], name: "index_orders_on_user_id", using: :btree
  end

  create_table "package_items", force: :cascade do |t|
    t.string   "name"
    t.integer  "quantity"
    t.float    "price"
    t.string   "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "package_id"
    t.index ["package_id"], name: "index_package_items_on_package_id", using: :btree
  end

  create_table "packages", force: :cascade do |t|
    t.integer  "address_id"
    t.integer  "user_id"
    t.boolean  "is_shipped"
    t.boolean  "is_received"
    t.boolean  "is_cancelled"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["address_id"], name: "index_packages_on_address_id", using: :btree
    t.index ["user_id"], name: "index_packages_on_user_id", using: :btree
  end

  create_table "products", force: :cascade do |t|
    t.string   "sku"
    t.string   "name"
    t.float    "price"
    t.float    "weight"
    t.string   "dimension"
    t.string   "category"
    t.string   "detail"
    t.boolean  "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "admin",                  default: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "addresses", "users"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "orders", "addresses"
  add_foreign_key "orders", "users"
  add_foreign_key "package_items", "packages"
  add_foreign_key "packages", "addresses"
  add_foreign_key "packages", "users"
end
