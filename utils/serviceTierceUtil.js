const {connect} = require('mongoose');
const config = require('../config');

const mongodbService = connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));

// Redis connection
const redis = require("redis");
const redisService = redis.createClient({
    url: config.REDIS_SERVER_URL,
})
    .on("connect", () => {
        console.log("Redis Connecté");
    })
    .on("error", err => console.log("Redis Client Error", err));

(async () => {
    await redisService.connect();
})()

module.exports = {
    mongodbService,
    redisService
}
