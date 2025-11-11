const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");
const redis = require("redis");

let dataAPI;
let mongoConnection;
const mode = process.env.NODE_ENV || "development";

const startDB = async (app, db_type) => {
    const connectRedis = async () => {
        try {
            const redis_client = redis.createClient({ url: process.env.REDIS_URL });
            redis_client.on("error", (err) => console.error("Redis Error:", err));
            await redis_client.connect();
            console.log("✅ Redis Connected");
            return redis_client;
        } catch (err) {
            console.warn("⚠ Redis connection failed, continuing without Redis");
            return null;
        }
    };

    const connectMySQL = async () => {
        dataAPI = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: "mysql",
                logging: false,
            }
        );

        await dataAPI.authenticate();
        console.log(`✅ MySQL Connected: ${process.env.DB_HOST}`);
        module.exports.dataAPI = dataAPI;
    };

    const connectMongo = async () => {
        const { MDB_URI, MDB_HOST, MDB_PORT, MDB_NAME, MDB_USER, MDB_PASS } = process.env;

        let mongoUri;
        if (MDB_URI) {
            mongoUri = MDB_URI;
        } else {
            if (!MDB_HOST || !MDB_NAME) {
                throw new Error("Please set MDB_URI or MDB_HOST and MDB_NAME in environment variables");
            }
            const host = MDB_HOST;
            const port = MDB_PORT || 27017;
            const username = encodeURIComponent(MDB_USER || '');
            const password = encodeURIComponent(MDB_PASS || '');
            mongoUri = `mongodb://${username}:${password}@${host}:${port}/${MDB_NAME}?authSource=admin`;
        }

        console.log(`MongoDB URI: ${mongoUri}`);
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoUri);
        console.log("✅ MongoDB Connected");
        mongoConnection = mongoose.connection;
    };

    const startServer = () => {
        const PORT = process.env.REST_PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on port: ${PORT}`);
            console.log(`📍 Environment: ${mode}`);
        });
    };

    try {
        switch (db_type) {
            case "mysql":
                console.log(`Environment: ${mode} | Database: MySQL`);
                await connectMySQL();
                // module.exports.redis_client = await connectRedis();
                startServer();
                break;

            case "mongo":
                console.log(`Environment: ${mode} | Database: MongoDB`);
                await connectMongo();
                // module.exports.redis_client = await connectRedis();
                startServer();
                break;

            case "multi":
                console.log(`Environment: ${mode} | Database: MySQL + MongoDB`);
                await connectMySQL();
                await connectMongo();
                // module.exports.redis_client = await connectRedis();
                startServer();
                break;

            default:
                console.warn("⚠ No Database Connected — Webserver will not start!");
        }
    } catch (err) {
        console.error(`❌ Database Connection Error: ${err.message}`);
        process.exit(1);
    }
};

mongoose.set("debug", true);

module.exports = { startDB };
