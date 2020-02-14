import express from "express";
import logger from "morgan";
import asyncHandler from "express-async-handler";
import APIManager from "./api-manager";

const PORT = process.env.PORT || 8080,
      app = express(),
      apiManager = new APIManager();

require("dotenv").config();

app.use(logger("tiny"));

app.get("/data", asyncHandler(async(req, res) => {
    res.send(await apiManager.getData());
    console.log("Finished getting applications");
}));

app.listen(PORT, () => {
    console.info("Server listening on port " + PORT);
});
