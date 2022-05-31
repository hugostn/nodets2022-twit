drop table if exists post;
drop table if exists follower;
drop table if exists users;

create table users (
	id uuid primary key,
	username varchar(14) not null unique,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(150) not null unique,
  joined_at timestamp with time zone default now(),
	check (username ~ '[a-zA-Z0-9]+')
);
create unique index users_lower_username_idx on users(lower(username));

create table follower (
	user_id uuid not null,
	follower_id uuid not null,
	primary key (user_id, follower_id),
	check (user_id::varchar <> follower_id::varchar),
	constraint follower_user_fk foreign key (user_id) references users(id),
	constraint follower_follwer_fk foreign key (follower_id) references users(id)
);
create index follower_user_idx on follower(user_id);

drop type if exists post_type;
create type post_type as enum ('post', 'repost', 'quote');

create table post (
	id uuid not null primary key,
	user_id uuid not null,
	type post_type not null,
	posted_at timestamp with time zone default now(),
	content varchar(777) null,
	refer uuid null,
	check ((type <> 'repost' and content is not null) or (type = 'repost' and content is null)),
	constraint post_user_fk foreign key (user_id) references users(id),
	constraint post_refer_fk foreign key (refer) references post(id)
);
create index post_user_idx on post(user_id);
create index post_refer_idx on post(refer);
create index post_postedAt_idx on post(posted_at DESC);
