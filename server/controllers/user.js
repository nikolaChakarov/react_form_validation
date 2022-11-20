// user controllers
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { readFile, writeFile } = require("../utils/toggleFile");
const { createError } = require("../utils/error");
const dbLocation = "/data/users.json";

exports.register = async function (req, res, next) {
	const { username, password, password2, ...rest } = req.body;
	console.log(req.body);

	try {
		const dbResponse = await readFile(dbLocation);
		let user = dbResponse.find((el) => el.username === username);
		if (user) {
			return next(createError(401, "Username is already taken"));
		}

		if (password !== password2) {
			return next(createError(400, "Pasword don't match"));
		}

		const hashed = await bcrypt.hash(password, Number(process.env.SALT));

		await writeFile(dbLocation, {
			username,
			password: hashed,
			id: Date.now(),
			...rest,
		});

		const token = jwt.sign({ username }, process.env.SECRET, {
			expiresIn: 36000,
		});

		res.cookie("x-auth-cookie", token, { httpOnly: true })
			.status(200)
			.json({
				success: true,
				message: "You are register",
				username,
			});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

exports.login = function (req, res, next) {
	res.status(200).json({ status: "success", message: "some message login" });
};
