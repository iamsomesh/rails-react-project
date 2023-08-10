### Task Description
```
    • Create a Rails + React project
    • Integrate the React part within Rails project only
    • Versions to use
        ◦ Rails: 7.0.1
        ◦ Ruby: 3.0.1
    • Setup the following scripts inside the ‘bin’ folder of the Rails project
        ◦ bin/setup script to setup the project on local (including  ‘bundle install’, database setup, ‘yarn/npm install’, etc.)
        ◦ bin/dev script to run the server (should run both rails & react server)
    • Specifications
        ◦ Use MySQL for database
        ◦ Integrate Material UI for React UI
    • Authentication
        ◦ Use Devise to authenticate. The signup/login should happen using Material UI.
        ◦ Make Devise work with APIs such that we can signup/login using APIs as well.
    • Referral
        ◦ A user should be able to send a referral email to any email address
        ◦ The referral email should contain a link that redirects to sign up page
        ◦ User’s home page should show all the email addresses that were referred
```

### Install Dependencies for Backend
#### 1. Install Ruby 3.0.0 

[Install RVM](https://rvm.io/rvm/install)

After installing go to project directory and install 3.0.0 ruby version
```
cd [your-path]/[project-name]
rvm install 3.0.1
```

#### 2. Install Mysql
Just example:
```
sudo apt update
sudo apt install mysql-server


Make sure you need to add your mysql username and password into database.yml file

example:
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: "your username"
  password: "your password"
  socket: /var/run/mysqld/mysqld.sock
```

### Install Dependencies for Frontend

#### 1. Install node js -v14.16.1 and npm -v6.14.12
Just example:
```
sudo apt update
sudo apt install nodejs
sudo apt install npm 
```
#### 2. If you used another version of node follow this steps
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 14.16.1
nvm use 14.16.1
```


#### Run Application
Database setup and install Dependencies(including  ‘bundle install’, database setup, ‘yarn/npm install’, etc.)

```
bin/setup
```

run the server both (rails & react server)

```
bin/dev
```