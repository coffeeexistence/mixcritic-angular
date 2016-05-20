# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160320015706) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "critique_comments", force: :cascade do |t|
    t.integer  "critique_id"
    t.integer  "user_id"
    t.text     "body"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "critiques", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.integer  "revision_id"
    t.integer  "critic_id"
    t.integer  "thread_id"
    t.integer  "upvotes"
    t.integer  "quality"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "genres", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "help_topics", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invites", force: :cascade do |t|
    t.integer  "mix_id"
    t.integer  "critic_id"
    t.integer  "mixer_id"
    t.boolean  "accepted"
    t.string   "note"
    t.integer  "offer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mix_help_topics", force: :cascade do |t|
    t.integer  "mix_id"
    t.integer  "help_topic_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "mixes", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "user_id"
    t.integer  "genre_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "views",       default: 0
  end

  create_table "notifications", force: :cascade do |t|
    t.string   "title"
    t.string   "subtitle"
    t.string   "url"
    t.string   "class"
    t.string   "qty"
    t.boolean  "active"
    t.datetime "time"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "critique_id"
    t.text     "body"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "revisions", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "mix_id"
    t.integer  "upload_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "uploads", force: :cascade do |t|
    t.string   "url"
    t.string   "name"
    t.string   "revision_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "title"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.text     "bio"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.integer  "points"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "provider"
    t.string   "uid"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
