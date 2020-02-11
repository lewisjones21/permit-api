import express from "express";
import logger from "morgan";
import APIManager from "./api-manager";

const PORT = process.env.PORT || 8080,
      app = express(),
      apiManager = new APIManager();

require("dotenv").config();

app.use(logger("tiny"));

app.get("/data", (req, res) => {
    res.send(apiManager.getData());
});

app.listen(PORT, () => {
    console.info("Server listening on port " + PORT);
});
