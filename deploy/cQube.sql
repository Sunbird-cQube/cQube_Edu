create table users(
user_id serial primary key not null,
pasword varchar(50),
email_id varchar(50),
is_first_login bit,
state_id bigint,
created_date timestamp with time zone default now(),
creted_date timestamp with time zone default now()
);
