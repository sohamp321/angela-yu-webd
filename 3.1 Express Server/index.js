import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(req);
  res.send("<h1>Hello, world!</h1>");
});

app.get("/contact", (req, res) => {
    console.log(req);
    res.send("<h1> Contact Me </h1>")
});

app.get("/about", (req, res) => {
    console.log(req);
    res.send("<h1> About Me </h1>")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
