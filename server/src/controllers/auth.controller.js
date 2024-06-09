const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const authService  = require('../services/auth.service');

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Failed", errors.array()));
            }

            const { email, password } = req.body;

            const userData = await authService.registration(email, password);

            // req.session.user = userData;
            res.cookie("userData", JSON.stringify(userData), { httpOnly: true });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Failed", errors.array()));
            }

            const { email, password } = req.body;
            const userData = await authService.login(email, password);
            // req.session.user = userData;
            res.cookie("userData", JSON.stringify(userData), { httpOnly: true });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async checkAuth(req, res, next) {
        try {
            console.log(req.cookies);
            if (req.cookies && req.cookies.userData) {
                const userData = JSON.parse(req.cookies.userData);
                return res.json(userData);
            } else {
                return next(ApiError.UnauthorizedError());
            }
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        req.session.destroy(err => {
            if (err) {
                return next(ApiError.InternalServerError("Logout failed"));
            }
            res.status(200).send({ message: 'Logged out successfully' });
        });
    }
}

module.exports = new AuthController()