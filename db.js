const mongoose = require('mongoose');

const connectDB = async () => {

    const url = process.env.NEXT_PUBLIC_MONGO_URL;
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDb connected!!")
    }catch(error) {
        console.log("ERROR connecting to DB")
        process.exit(1);
    }
}

module.exports = connectDB;