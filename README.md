# Polls CRUD

This project provides a simple CRUD (Create, Read, Update, Delete) API for managing polls. Users can create new polls, retrieve existing polls, update polls, and delete polls. The API also supports searching polls by their question field and includes plans for pagination and other features.

## Tech
- Node.js
- Express.js
- MongoDB
- TypeScript


## Polls API
Method | Endpoint   | Description
------ | ---------- | ------------------------------------------
POST   | /polls     | Create a new poll
GET    | /polls     | Get all polls (with search and pagination)
GET    | /polls/:id | Get a specific poll by ID
PUT    | /polls/:id | Update a specific poll
DELETE | /polls/:id | Delete a specific poll


## Development
 - clone this repository in the current folder `https://github.com/Max-im/polls-crud.git .`;
 - make sure you current node.js version is 18 or heigher:
 ```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm use 18
 ```

 - run command `npm run dev`;

 ## Production

 - run command `docker-compose up`