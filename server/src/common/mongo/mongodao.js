const MongoClient = require('mongodb').MongoClient;
var dbConnection;
var mongoClient;
module.exports = {
    connectDB: async function(connectionURL) {
        var options = {
            useNewUrlParser: true,
            poolSize: process.env.MONGO_DB_POOL_SIZE,
            auto_reconnect: true
        };
        mongoClient = new MongoClient(connectionURL, options);
        return new Promise(function(resolve, reject) {
            mongoClient.connect(function(err, client) {
                if (err) {
                    console.log("mongo client connection error \n " + connectionURL);
                    throw err;
                }
                dbConnection = mongoClient.db(process.env.MONGO_DB);
                console.log("mongo client successfully connected \n " + connectionURL);
                resolve();
            });
        });
    },
    readCollection: function(collectionName, query) {
        return dbConnection.collection(collectionName).aggregate(query).toArray();
    },
    readCollectionPrimary: function(collectionName, query) {
        return dbConnection.collection(collectionName).find(query).toArray();
    },
    distinct: function(collectionName, fields, query) {
        return dbConnection.collection(collectionName).distinct(fields, query);
    },
    insertMany: async function(collectionName, doc) {
        return dbConnection.collection(collectionName).insertMany(doc);
    },
    insertOne: function(collectionName, data, sessionData = {}) {
        return dbConnection.collection(collectionName).insertOne(data, sessionData);
    },
    updateOne: function(collectionName, condition, data, isUpsert, sessionData = {}) {
        return dbConnection.collection(collectionName).updateOne(condition, data, { upsert: isUpsert }, sessionData);
    },
    update: function(collectionName, condition, data, options) {
        return dbConnection.collection(collectionName).update(condition, data, options);
    },
    findOneAndUpdate: function(collectionName, condition, data, returnOriginalDocument, sessionData = {}) {
        return dbConnection.collection(collectionName).findOneAndUpdate(condition, data, { returnOriginal: returnOriginalDocument, sessionData });
    },
    updateMany: function(collectionName, condition, data, options, sessionData = {}) {
        return dbConnection.collection(collectionName).updateMany(condition, data, options, sessionData);
    },
    disconnect: function() {
        mongoClient.close();
    },
    drop: function(collectionName) {
        dbConnection.collection(collectionName).drop();
    },
    startSession: function() {
        return mongoClient.startSession();
    },
    stopSession: function(session) {
        session.endSession();
    },
    bulkWrite: function(collectionName, bulkUpdateOps) {
        return dbConnection.collection(collectionName).bulkWrite(bulkUpdateOps);
    },
    initBulkOperation: function(collectionName) {
        return dbConnection.collection(collectionName).initializeUnorderedBulkOp();
    },
    ensureIndex: function(collectionName, index) {
        return dbConnection.collection(collectionName).createIndex(index);
    },
    remove: function(collectionName, query) {
        return dbConnection.collection(collectionName).remove(query);
    }
};