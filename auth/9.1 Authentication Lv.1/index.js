import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "1093",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  const ifExists = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (ifExists.rows.length > 0) {
    res.status(409).redirect("/login");
    return;
  } else {
    try {
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, password]
      );
      console.log("User registered: ", result.rows[0]);
      res.status(201);
      res.render("secrets.ejs");
      return;
    } catch (err) {
      console.log("Error registering user: ", err);
      res.status(500).send("Error registering user");
      return;
    }
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userExists.rows.length > 0) {
      const userPassword = userExists.rows[0].password;
      if (userPassword === password) {
        res.render("secrets.ejs");
      } else {
        res.status(401).send("Password Incorrect.");
      }
    } else {
      res.redirect("/register");
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
