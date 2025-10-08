helpersFolder=~/WebstormProjects/soccer-game-be/helpers
echo "Creating all seeds..."

echo "Generating names seed..."
node ${helpersFolder}/seed_names/import_names_json_file.js

echo "Generating players seed..."
node ${helpersFolder}/seed_players/seed_player_data.js