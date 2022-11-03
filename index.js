const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  morgan = require("morgan");
const { add, trimEnd } = require("lodash");
const app = express();

app.use(bodyParser.json());

// let topMovies = [
//   {
//     title: "Harry Potter and the Chamber of Secrets",
//     director: "Chris Columbus",
//   },
//   {
//     title: "Lord of the Rings: The Fellowship of the Ring",
//     director: "Peter Jackson",
//   },
//   {
//     title: "Pride and Prejudice",
//     director: "Joe Wright",
//   },
//   {
//     title: "Harry Potter and the Goblet of Fire",
//     director: "Mike Newell",
//   },
//   {
//     title: "Coco",
//     director: "Lee Unkrich and Adrian Molina ",
//   },
//   {
//     title: "The Lord of the Rings: The Two Towers",
//     director: "Peter Jackson",
//   },
//   {
//     title: "The Dark Knight",
//     director: "Christopher Nolan",
//   },
//   {
//     title: "Schindler's List",
//     director: "Steven Spielberg",
//   },
//   {
//     title: "Forrest Gump",
//     director: "Robert Zemeckis",
//   },
//   {
//     title: "Back to the Future",
//     director: "Robert Zemeckis",
//   },
// ];

let users = [
  {
    id: 1,
    name: "John",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Sophie",
    favoriteMovies: ["Coco"],
  },
];

let movies = [
  {
    Title: "Back to the Future",
    Description: "xxx",
    Genre: {
      Name: "SciFi",
      Description:
        "Science fiction is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes.",
    },
    Director: {
      Name: "Robert Zemeckis",
      Bio: "Robert Lee Zemeckis is an American filmmaker.",
      Birth: 1952,
    },
    ImageURL:
      "https://www.imdb.com/title/tt0088763/mediaviewer/rm554638848/?ref_=tt_ov_i",
    Feaured: false,
  },
  {
    Title: "Coco",
    Description: "xxx",
    Genre: {
      Name: "Fantasy",
      Description:
        "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore.",
    },
    Director: {
      Name: "Lee Unkrich",
      Bio: "Lee Edward Unkrich is an American retired film director, film editor, screenwriter, and animator.",
      Birth: 1967,
    },
    ImageURL:
      "https://www.imdb.com/title/tt2380307/mediaviewer/rm585455872/?ref_=tt_ov_i",
    Feaured: false,
  },
];

app.use(express.static("public"));
app.use(morgan("common"));

// CREATE New User
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Please write a name");
  }
});

// CREATE fav movie
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("User not found");
  }
});

// UPDATE User
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("User not found");
  }
});

//READ all movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//READ movie title
app.get("/movies/:title", (req, res) => {
  //const title = req.params.title; -> is the same as below.
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not found");
  }
});

// READ Genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre not found");
  }
});

//READ Director
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find((movie) => movie.Director.Name === directorName);

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Director not found");
  }
});

// DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

// DELETE user email
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`User ${id} has been removed`);
  } else {
    res.status(400).send("no such user");
  }
});

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to FavFlix!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Oh oh, something went wrong. Please try again later.");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
