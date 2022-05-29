CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

do $$
<<populate_db>>
declare
	rec record;
  	cur_users cursor for
		SELECT 'insert into users (id, username, first_name, last_name, email) '||
		   'values (''' || uuid_generate_v4() || ''', ''user' || num || ''', ''fname' || num || ''', ''lname' || num || ''', ''mail' || num || '@posterr.com'');'::text as cmd
		FROM generate_series(1, 100) num
		;
	cur_post cursor for
		SELECT 'insert into post(id, user_id, type, posted_at, content) '||
		   'values (''' || uuid_generate_v4() || ''', ''' || u.id || ''', ''post'', (NOW() - INTERVAL ''' || num || ' DAY''), ''This is a post content from user ' || u.username || ''');'::text as cmd
		FROM users u, generate_series(1, 100) num
		;
begin
	truncate table users cascade;
	truncate table post cascade;
	
	open cur_users;
   	loop
		fetch cur_users into rec;
      	exit when not found;
		execute rec.cmd;
   	end loop;
   	close cur_users;
	
	open cur_post;
   	loop
		fetch cur_post into rec;
      	exit when not found;
		execute rec.cmd;
   	end loop;
   	close cur_post;
end populate_db $$;

-- select * from users;
-- select * from post;
/*
select
	(select count(*) from users) as users,
	(select count(*) from post) as post
*/