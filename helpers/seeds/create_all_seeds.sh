rootFolder=~/WebstormProjects/soccer-game-be
helperSeedsFolder=${rootFolder}/helpers/seeds
scriptsFolder=${rootFolder}/scripts
echo "Creating all seeds..."

echo "Generating names seed..."
node --env-file=.env ${helperSeedsFolder}/names/import_names_json_file.js

echo "Executing name seeds..."
node --env-file=.env ${helperSeedsFolder}/execute_seed_files.js ${scriptsFolder}/04-seed-data-names.sql

echo "Generating players seed..."
node --env-file=.env ${helperSeedsFolder}/player/seed_player_data.js

echo "Generating staff seed..."
node --env-file=.env ${helperSeedsFolder}/staff/seed_staff_data.js

echo "Executing all other sql seeds..."
node --env-file=.env ${helperSeedsFolder}/execute_seed_files.js ${scriptsFolder}/05-seed-data-players.sql ${scriptsFolder}/06-seed-data-staff.sql
