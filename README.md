# README


##messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


##usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|pass|string|null: false|

### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups


##groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: :users_groups


##users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|refernces,foreign_key: true|
|user_id|integer|refernces,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

