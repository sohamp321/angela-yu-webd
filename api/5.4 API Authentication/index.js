import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "sohamp321";
const yourPassword = "sohamp321";
const yourAPIKey = "76d937d6-dc04-4f63-8391-cad6ac32e855";
const yourBearerToken = "6fea8539-7632-48cc-a3f3-959179246ee5";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
    try {
      const result = await axios.get(API_URL + "all?page=2", {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      });
      res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.status(404).send(error.message);
    }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
