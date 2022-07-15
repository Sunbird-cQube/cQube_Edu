create table if not exists  users(
user_id serial primary key not null,
user_name varchar(20),
email_id varchar(50),
pasword varchar(40),
is_first_login bit,
state_id bigint,
created_date timestamp with time zone default now(),
updated_date timestamp with time zone default now()
);
