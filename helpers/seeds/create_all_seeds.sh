# TODO: Needs to come from the .env
username=admin
database=localhost:55000/soccer_game

rootFolder=~/WebstormProjects/soccer-game-be
helperSeedsFolder=${rootFolder}/helpers/seeds
scriptsFolder=${rootFolder}/scripts
echo "Creating all seeds..."

echo "Generating names seed..."
node ${helperSeedsFolder}/names/import_names_json_file.js

echo "Executing name seeds..."
node ${helperSeedsFolder}/execute_seed_files.js ${scriptsFolder}/04-seed-data-names.sql

echo "Generating players seed..."
node ${helperSeedsFolder}/player/seed_player_data.js

echo "Generating staff seed..."
node ${helperSeedsFolder}/staff/seed_staff_data.js

echo "Executing all other sql seeds..."
node ${helperSeedsFolder}/execute_seed_files.js ${scriptsFolder}/05-seed-data-players.sql ${scriptsFolder}/06-seed-data-staff.sql
