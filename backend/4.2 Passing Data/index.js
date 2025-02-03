import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const l = req.body["fName"].length + req.body["lName"].length;

  res.render("index.ejs", {len : l});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
