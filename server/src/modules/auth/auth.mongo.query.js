class OnlineContentMongoQueries {
    static getUserDetails(emailIds) {
        return [{
            $match: {
                "email": {
                    $in: emailIds
                }
            }
        }];
    }
}

module.exports = OnlineContentMongoQueries;