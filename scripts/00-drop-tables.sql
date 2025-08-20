-- backup data (not working still)

-- \set filename /tmp/profiles`timestamp`.csv
--
-- COPY profiles TO 'filename' WITH (FORMAT CSV, HEADER);
-- COPY cards TO '/tmp/cards.csv' WITH (FORMAT CSV, HEADER);
-- COPY auth.users TO '/tmp/auth_users.csv' WITH (FORMAT CSV, HEADER);

-- drop our own tables
DROP TABLE IF EXISTS continents CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS names CASCADE;
DROP TABLE IF EXISTS player CASCADE;
DROP TABLE IF EXISTS staff CASCADE;

-- drop types
DROP TYPE IF EXISTS name_type CASCADE;
DROP TYPE IF EXISTS player_position CASCADE;
DROP TYPE IF EXISTS mood CASCADE;
DROP TYPE IF EXISTS staff_position CASCADE;





