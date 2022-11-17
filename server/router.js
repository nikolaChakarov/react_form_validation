const router = require("express").Router();
const users = require("./routes/users");

router.use("/api/users", users);

module.exports = router;
