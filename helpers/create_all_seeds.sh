# TODO: Needs to come from the .env
username=admin
database=localhost:55000/soccer_game

rootFolder=~/WebstormProjects/soccer-game-be
helpersFolder=${rootFolder}/helpers
scriptsFolder=${rootFolder}/scripts
echo "Creating all seeds..."

echo "Generating names seed..."
node ${helpersFolder}/seed_names/import_names_json_file.js

echo "Executing name seeds..."
node ${helpersFolder}/execute_seed_files.js ${scriptsFolder}/04-seed-data-names.sql

echo "Generating players seed..."
node ${helpersFolder}/seed_players/seed_player_data.js

# TODO: Generate staff seed

echo "Executing all other sql seeds..."
node ${helpersFolder}/execute_seed_files.js ${scriptsFolder}/05-seed-data-players.sql
