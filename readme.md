### Environments
- PHP 7.2.24
- Laravel 5.8
- Mariadb
- [Pusher](https://pusher.com/ "Pusher")
### Installation
1. Clone the repository
```bash
git clone git@github.com:kundankarna1994/TODO.git
```
2. Change the directory to the project
```bash
cd TODO i.e (directory name of the repo)
```
3. Copy the .env.example to .env file.
4. Run the docker compose
```bash
docker-compose up -d (i.e -d run the process in background)
```
5. Run the composer install
```bash
composer install
```
6. Create Encryption Key
```bash
docker-compose exec app php artisan key:generate
```
7. Run the migration 
```bash
docker-compose exec app php artisan migrate
```
8. Install Passport
```bash
docker-compose exec app php artisan passport:install
```
9. Setup Passport Client
```bash
docker-compose exec app php artisan passport:client --personal
```
10. Setup Mail Trap in .env
11. Setup Pusher 
12. Add pusher app key in MIX variable 
13. Add Slack Hook in SLACK_HOOK env.
