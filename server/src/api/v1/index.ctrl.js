class IndexController {
    static isAppAlive(req, res, next) {
        try {

            return res.bhejdo(HttpStatus.OK, { success: true, msg: 'Chat is alive' });

        } catch (err) {
            console.log(err);
            return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, msg: 'App Status Checker Failed' })
        }
    }
}


module.exports = IndexController;