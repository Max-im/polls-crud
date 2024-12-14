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

## TODO
- [ ] pagination
- [ ] search query verification
- [ ] deployment ngrok / remote
- [ ] custom id / default id
- [ ] Docker
- [ ] ngnix
- [ ] ngnix
