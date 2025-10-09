How to populate the database with data
=======================
Run every sql by order, up to the 03-seed-data-countries.sql (including that one).

⚠️ 04 and 05 need to be generated everytime, because they depend on the data in the previous scripts.

## 1. Script to generate and populate all data:
Run the following script:
```bash
../helpers/seeds/create_all_seeds.sh
```

## 2. Generate 04-seed-data-names.sql:
Run the following command:
```bash 
node ../helpers/seeds/names/import_names_json_file.js
```
**Requirements:** a `names_grouped_by_country.json` file in the `/helpers/seed_names/` folder

## Generate 05-seed-data-players.sql:
Run the following command: 
```bash 
node ../helpers/seeds/player/seed_player_data.js
```
if you want to debug stuff or adapt the calculations for the wage and value, use the files inside the debug folder.


## Final step:
Run all the remaining generated sql files in the `scripts` folder, in order.




