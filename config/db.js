const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        family: 4  // Force IPv4
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports = connectDB;