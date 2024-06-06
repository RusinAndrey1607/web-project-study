const ApiError = require('../exceptions/api.error');

const authMiddleware = function (req, res, next) {
    if (!req.session.user) {
        return next(ApiError.UnauthorizedError("User not authenticated"));
    }

    req.user = req.session.user;
    next();
};
module.exports = authMiddleware