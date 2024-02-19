const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.set("strictQuery", true, "useNewUrlParser", true);

//load env variable
dotenv.config();

const db = process.env.MONGO_DB_URI;

const connectDB = async (dbName) => {
    try {
        await mongoose.connect(
            db,
            {
                dbName: dbName,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
module.exports = connectDB