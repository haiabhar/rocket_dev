# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_02_045140) do
  create_table "ad_ldap", id: false, charset: "utf8", force: :cascade do |t|
    t.integer "ID"
    t.string "CN", limit: 80
    t.string "CO", limit: 50
    t.string "DESCRIPTION", limit: 72
    t.string "DISPLAYNAME", limit: 50
    t.string "EMPLOYEENUMBER", limit: 8
    t.string "MANAGEREMPLOYEENUMBER", limit: 8
    t.string "UID", limit: 250
    t.string "MGR_ID_1", limit: 8
    t.string "MGR_NAME_1", limit: 51
    t.string "MGR_ID_2", limit: 8
    t.string "MGR_NAME_2", limit: 51
    t.string "MGR_ID_3", limit: 8
    t.string "MGR_NAME_3", limit: 51
    t.string "MGR_ID_4", limit: 8
    t.string "MGR_NAME_4", limit: 51
    t.string "MGR_ID_5", limit: 8
    t.string "MGR_NAME_5", limit: 51
    t.string "MGR_ID_6", limit: 8
    t.string "MGR_NAME_6", limit: 51
    t.string "MGR_ID_7", limit: 8
    t.string "MGR_NAME_7", limit: 51
    t.string "MGR_ID_8", limit: 8
    t.string "MGR_NAME_8", limit: 51
    t.string "MGR_ID_9", limit: 8
    t.string "MGR_NAME_9", limit: 51
    t.string "MGR_ID_10", limit: 8
    t.string "MGR_NAME_10", limit: 51
    t.string "EMPLOYEETYPE", limit: 36
    t.string "FACSIMILETELEPHONENUMBER", limit: 31
    t.string "FAMILYNAMEPREFIX", limit: 7
    t.string "GIDNUMBER", limit: 4
    t.string "GIVENNAME", limit: 80
    t.string "HPBUSINESSGROUP", limit: 60
    t.string "HPAPPLICATIONACCOUNT", limit: 50
    t.string "HPBUSINESSREGION", limit: 50
    t.string "HPBUSINESSUNIT", limit: 75
    t.string "HPEMAILSERVICE", limit: 50
    t.string "HPEMPLOYEE", limit: 50
    t.string "HPGROUP", limit: 50
    t.string "HPJOBFAMILY", limit: 80
    t.string "HPJOBFUNCTION", limit: 50
    t.string "HPJOBLEVEL", limit: 50
    t.string "HPJOBTITLE", limit: 24
    t.string "HPLHCOSTCENTER", limit: 14
    t.string "HPLASTRENEWDATE", limit: 50
    t.string "HPLEGALNAME", limit: 81
    t.string "HPLOCATIONCODE", limit: 16
    t.string "HPMRUCODE", limit: 25
    t.string "HPPAYROLLCOUNTRYCODE", limit: 10
    t.string "HPROLE", limit: 34
    t.string "HPSTARTDATE", limit: 25
    t.string "HPSTATUS", limit: 16
    t.string "L", limit: 29
    t.string "MAIL", limit: 300
    t.string "MAILGROUP", limit: 50
    t.string "MANAGER", limit: 66
    t.string "MOBILE", limit: 50
    t.string "NTUSER", limit: 50
    t.string "NTUSERDOMAINID", limit: 40
    t.string "OU", limit: 75
    t.string "ORGANIZATIONALUNIT", limit: 50
    t.string "TELEPHONENUMBER", limit: 36
    t.datetime "LOAD_DT", precision: nil
    t.string "buildingName", limit: 300
    t.datetime "MODIFIED_DT", precision: nil
    t.string "CSCB_TOWER_MANAGERS", limit: 8
    t.string "IS_CSC", limit: 1
    t.index ["EMPLOYEENUMBER", "ID", "MODIFIED_DT", "UID"], name: "Index_emp_id"
  end

  create_table "roles", charset: "utf8", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.string "description"
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rules", charset: "utf8", force: :cascade do |t|
    t.string "name"
    t.string "query_string"
    t.text "mongo_query"
    t.text "build_query"
    t.boolean "is_active", default: false
    t.integer "created_by"
    t.integer "updated_by"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_roles", charset: "utf8", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.boolean "is_primary", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", charset: "utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "full_name"
    t.string "emp_id"
    t.string "address"
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["emp_id"], name: "index_users_on_emp_id", unique: true
  end

end
