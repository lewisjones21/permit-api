import express from "express";
import logger from "morgan";
const PORT = process.env.PORT || 8080,
      app = express();

require("dotenv").config();

app.use(logger("tiny"));

app.get("/test", (req, res) => {
    res.send("Test result");
});

app.listen(PORT, () => {
    console.info("Server listening on port " + PORT);
});
