-- Create continents table
CREATE TABLE IF NOT EXISTS continents (
    id SERIAL NOT NULL PRIMARY KEY ,
    full_name TEXT
);

-- Create country table
CREATE TABLE IF NOT EXISTS countries (
    uuid UUID NOT NULL PRIMARY KEY,
    full_name TEXT,
    country_code TEXT,
    continent_id SERIAL REFERENCES continents(id) ON DELETE CASCADE
);

-- Create name_type enum
CREATE TYPE name_type AS ENUM ('first_name', 'last_name');

-- Create names table
CREATE TABLE IF NOT EXISTS names (
     uuid UUID NOT NULL PRIMARY KEY,
     name TEXT,
     type name_type,
     country_uuid UUID REFERENCES countries(uuid) ON DELETE CASCADE
);

-- Create player_position enum
CREATE TYPE player_position AS ENUM ('GK', 'DEF', 'MID', 'FWD');

-- Create mood enum
CREATE TYPE mood AS ENUM ('Angry', 'Sad', 'Content', 'Happy', 'Excited');

-- Create players table
CREATE TABLE IF NOT EXISTS player (
     uuid UUID NOT NULL PRIMARY KEY,
     first_name_uuid UUID REFERENCES names(uuid) ON DELETE CASCADE,
     last_name_uuid UUID REFERENCES names(uuid) ON DELETE CASCADE,
    position player_position,
    rating INT,
    age INT,
    wage INT,
    value INT,
    mood mood
);

-- Create staff_position enum
CREATE TYPE staff_position AS ENUM ('Coach', 'Scout', 'Public Relations');


-- Create players table
CREATE TABLE IF NOT EXISTS staff (
      uuid UUID NOT NULL PRIMARY KEY,
      first_name_uuid UUID REFERENCES names(uuid) ON DELETE CASCADE,
      last_name_uuid UUID REFERENCES names(uuid) ON DELETE CASCADE,
      position staff_position,
      rating INT,
      age INT,
      wage INT,
    mood mood
);

-- Create views for players and staff
/*
CREATE VIEW player_view
    AS
    SELECT p.uuid AS player_uuid,
           n1.name AS first_name,
           n2.name AS last_name,
           p.position,
           p.rating,
           p.age,
           p.wage,
           p.value,
           p.mood
    FROM player p,
         names n2
    JOIN names n1 ON p.first_name_uuid = n1.uuid


CREATE VIEW staff_view
AS
SELECT s.uuid AS player_uuid,
       n1.name AS first_name,
       n2.name AS last_name,
       s.position,
       s.rating,
       s.age,
       s.wage,
       s.mood
FROM staff s,
     names n2
    JOIN names n1 ON s.first_name_uuid = n1.uuid
*/