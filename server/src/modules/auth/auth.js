const { OAuth2Client } = require('google-auth-library');
const mongodao = require('../../common/mongo/mongodao');
const authMongoQueries = require('./auth.mongo.query');

const client = new OAuth2Client(process.env.GOOGLE_CONSUMER_KEY);

class Auth {

    static async googleLogin(token) {
        try {

            let isUserValid = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CONSUMER_KEY });
            console.log(isUserValid);

            let googlePayload = isUserValid.getPayload();

            let userDetails;

            if (isUserValid) {

                let userExists = await mongodao.readCollection(mongoConstants.MONGO_COLLECTIONS.USERS, authMongoQueries.getUserDetails([googlePayload.email]));

                if (userExists && Array.isArray(userExists) && userExists.length > 0) {
                    let conditions = { _id: userExists[0]._id };
                    userDetails = await mongodao.findOneAndUpdate(mongoConstants.MONGO_COLLECTIONS.USERS, conditions, {
                        $set: { updated_at: new Date(), is_logged_in: 1, logged_in_at: new Date() }
                    }, false);

                    userDetails = userDetails.value;

                } else {

                    const googleDetails = (({ name, picture, email, email_verified, iss: source, sub: userid }) => ({ name, picture, email, email_verified, iss: source, sub: userid }))(googlePayload);

                    let userDetailsToInsert = {...googleDetails, ... { created_at: new Date(), status: 'active', updated_at: null, is_logged_in: 1, logged_in_at: new Date(), role: 'AppUser', name: `${googlePayload.given_name} ${googlePayload.family_name}` } };

                    userDetails = await mongodao.insertOne(mongoConstants.MONGO_COLLECTIONS.USERS, userDetailsToInsert);

                    userDetails = userDetails.ops[0];

                }
            }

            return userDetails;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = Auth;