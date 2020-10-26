const authServices = require('../../../modules/auth/auth');


class AuthCtrl {
    static async googleLogin(req, res, next) {
        try {

            const { token } = req.body;

            let response = await authServices.googleLogin(token);

            return res.bhejdo(HttpStatus.OK, { success: true, data: response, msg: 'Successfully logged in' });

        } catch (err) {

            console.log(err);
            return res.bhejdo(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, { success: false, msg: err.msg || 'Error in Logging in. Please try again later', err: err })

        }
    }
}

module.exports = AuthCtrl;