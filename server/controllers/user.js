module.exports.register = function (req, res, next) {
    res.status(200).json({
        status: "success",
        message: "some message register",
    });
};

module.exports.login = function (req, res, next) {
    res.status(200).json({ status: "success", message: "some message login" });
};
