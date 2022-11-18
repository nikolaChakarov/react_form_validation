// user controllers
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { readFile, writeFile } = require("../utils/toggleFile");
const { createError } = require("../utils/error");
const dbLocation = "/data/users.json";

exports.register = async function (req, res, next) {
    const { username, password } = req.body;

    try {
        const dbResponse = await readFile(dbLocation);
        let user = dbResponse.find((el) => el.username === username);
        if (user) {
            return next(createError(401, "Username is already taken"));
        }

        const hashed = await bcrypt.hash(password, Number(process.env.SALT));

        await writeFile(dbLocation, { username, password: hashed });

        const token = jwt.sign({ username }, process.env.SECRET, {
            expiresIn: 36000,
        });

        res.cookie("x-auth-cookie", token, { httpOnly: true })
            .status(200)
            .json({
                success: true,
                message: "You are register",
            });
    } catch (err) {
        next(err);
    }
};

exports.login = function (req, res, next) {
    res.status(200).json({ status: "success", message: "some message login" });
};
