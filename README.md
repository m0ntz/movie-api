#  FavFlix Server-side project

[Final API](https://myfavflixapi.herokuapp.com/)

## Description
This is the Server-side component of FavFlix, a “movies” web application. The web application provides users with access to information about different movies, directors, and genres. Users are be able to sign up, update their personal information, and create a list of their favorite movies.

Includes the server, business logic, and business layers of the application. It consists of a well-designed REST API and architected database built using JavaScript, Node.js, Express, and MongoDB. The REST API
is be accessed via commonly used HTTP methods like GET and POST. Similar methods(CRUD) are be used to retrieve data from the database and store that data in a non-relational way.

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- Postman
- Heroku

## Features
- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister


## User Stories
- As a user, I want to be able to receive information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.
