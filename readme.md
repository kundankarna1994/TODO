### Environments & Frameworks
- PHP 7.2.24
- [Laravel 5.8](https://laravel.com/docs/5.8)
- [Mysql 5.7.22](https://www.mysql.com/)
- [Pusher](https://pusher.com/ "Pusher")
- [Laravel Passport](https://laravel.com/docs/5.8/passport)
- [React](https://reactjs.org/)
- [React Mention](https://github.com/signavio/react-mentions)
- [Pusher](https://pusher.com/)
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
4. Run the composer install
```bash
composer install
```
5. Copy the .env.example to .env
```bash
cp .env.example .env
```
6. Configure the database connection in .env

7. Run the docker compose
```bash
 docker-compose up -d (i.e -d run the process in background)
```
8. Create Encryption Key
```bash
docker-compose exec app php artisan key:generate
```
9. Run the migration 
```bash
docker-compose exec app php artisan migrate
```
10. Install Passport
```bash
docker-compose exec app php artisan passport:install
```
11. Setup Passport Client
```bash
docker-compose exec app php artisan passport:client --personal
```
12. Setup Mail Trap in .env
13. Setup Pusher 
14. Add pusher app key and cluster in MIX variable.
15. Add Slack Hook in SLACK_HOOK env.
16. Go to [url](http://localhost:8000), on mac go to [url](http://0.0.0.0:8000)
17. Register a user
18. Verify your email address.
19. Start creating todo

### Features
1. Registration
2. Email Verification
3. Login
4. Create Todo and assignee the todo to other user.
5. Update Todo.
6. Add comment on todo.
7. Mention other users on comment.
8. Push notification to the assigned user.
9. Push notification to the owner on todo completed.
10. Push notification to the owner on comment created on his/her todo.
11. Push notification to the mentioned users.
12. Push all the above notification to slack using slack webhook.
13. Live dashboard update on todo created, todo updated and on notification received.
14. Live comment update


###Important Links and documents
Here is the documentation on how to implement Pusher in laravel [Documentation](https://laravel.com/docs/5.8/broadcasting#only-to-others).

Here is the documentation on how to implement Pusher in React [Documentation](https://github.com/pusher/pusher-js)


