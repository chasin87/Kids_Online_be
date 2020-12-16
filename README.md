# Kids Online - SERVER

Kids Online is an application where children can play an easy game and participate in a Quiz set up by the admin panel.

Built with Node with Express for RestAPIs in the backend, and PostgreSQL with Sequelize.

## Table of contents:

- **[App demo](#app-demo)**
- **[Endpoints](#endpoints)**
- **[Technologies used](#Technologies-used)**
- **[Client side repo](#client-side-repo)**
- **[Setup](#setup-how-to-use-this-template)**

### App Demo:

#### Link to the app [Kids Online](https://kids-online.netlify.app/).

#### Video promotion Kids Online

[![Kids Online](/YoutubeAfbeelding.png)](https://www.youtube.com/watch?v=TVZDm3VbKPM&feature=youtu.be "YouTube promotion Kids Online")

## Endpoints

| Method | Path                       | Purpose                             | required parameters   | auth |
| ------ | -------------------------- | ----------------------------------- | --------------------- | ---- |
| GET    | '/'                        | Test if your server is running      | none                  | no   |
| POST   | '/echo'                    | Test POST requests                  | none                  | no   |
| POST   | '/signup'                  | Create a new user and get a token   | email, name, password | no   |
| POST   | '/gebruikerLogin'          | Get a token with email & password   | email, password       | no   |
| POST   | '/login' (admin)           | Get a token with email & password   | email, password       | no   |
| GET    | '/me'                      | Get information of this admin       | none                  | yes  |
| GET    | '/meGebruiker'             | Get information of this user        | none                  | yes  |
| POST   | '/authorized_post_request' | Test POST requests (token required) | none                  | yes  |
| GET    | '/upload'                  | Get all quizzes                     | none                  | yes  |
| GET    | '/answer'                  | Get all answers                     | none                  | yes  |
| GET    | '/upload:id'               | Get quizzes with entered id         | id                    | yes  |
| GET    | '/answer:id'               | Get answer with entered id          | id                    | yes  |
| POST   | '/upload'                  | Post New Question                   | Image, Sound, Text    | yes  |
| POST   | '/answer'                  | Post New answer                     | Image, Sound, Text    | yes  |
| DELETE | '/upload:id'               | Delete Question                     | id                    | yes  |
| DELETE | '/answer:id'               | Delete Answer                       | id                    | yes  |
| PATCH  | '/upload:id'               | Update answer if complete           | id                    | yes  |

## Technologies used:

#### BACK END:

![NODE.JS](https://img.shields.io/badge/-NODE.JS-%23fff?logo=node.js)
![ExpressJS](https://img.shields.io/badge/-EXPRESSJS-%23000?)
![Sequelize](https://img.shields.io/badge/-Sequelize-%231572B6?)
![REST API](https://img.shields.io/badge/-REST_API-%23000)
![PostgreSQL](https://img.shields.io/badge/-POSTGRESQL-%23336791?logo=POSTGRESQL)

## Client side repo

#### FRONT END:

![REACTJS](https://img.shields.io/badge/-ReactJS-%23000?logo=react)
![REACTROUTER](https://img.shields.io/badge/-REACTROUTER-%23fff?logo=REACT%20ROUTER)
![REDUX](https://img.shields.io/badge/-Redux-%23764ABC?logo=redux)
![HTML](https://img.shields.io/badge/-HTML5-%23fff?logo=html5)
![CSS](https://img.shields.io/badge/-CSS3-%231572B6?logo=css3)
![FIREBASE](https://img.shields.io/badge/-FIREBASE-%23000?logo=firebase)
![BOOTSTRAP](https://img.shields.io/badge/-BOOTSTRAP-%23563D7C?logo=bootstrap)
![MATERIAL-UI](https://img.shields.io/badge/-MATERIALUI-%230081CB?logo=MATERIAL-UI)

[Click here](https://github.com/chasin87/Kids_Online) to view client side repo

## SETUP How to use this template

1. Create a new project based on this template using the `Use this template` button
2. Clone the app

```
git clone git@github.com:YOUR_GITHUB_NAME/YOUR_PROJECT_NAME.git
```

3. cd into your project

```
cd YOUR_PROJECT_NAME
```

4. install dependencies

```
npm install
```

5. Configure your database in `config/config.json`

The default assumes a postgres database with

- username: postgres
- password: secret

```json
// config/config.json
{
  "development": {
    "username": "postgres",
    "password": "secret",
    "database": "YOUR_PROJECT_NAME_HERE_development",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": "0"
  }
}
```

6. Create database, run migrations & seed data

`package.json` contains a script for this

```bash
npm run initdev
```

Or run the commands seperately

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

7. start server with `nodemon` (recommended for development)

```
npm run dev
```

8. or start normally

```
npm start
```
