create table if not exists  users(
user_id serial,
user_name varchar(20),
email_id varchar(50) primary key not null,
password varchar(40),
user_role varchar(20),
is_first_login bit,
state_id bigint,
created_date timestamp with time zone default now(),
updated_date timestamp with time zone default now()
);
