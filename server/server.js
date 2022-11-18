require("dotenv").config();
process.dirname = __dirname;

const express = require("express");
const app = express();

const expressConfig = require("./config/express.config");
expressConfig(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
    console.log(`server is listening at PORT: ${PORT}`);
});
