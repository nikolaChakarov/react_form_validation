const handleError = function (err, req, res, next) {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "SOMETHING WENT WRONG";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
};

module.exports = handleError;
