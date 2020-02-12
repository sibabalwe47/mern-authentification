const mongoose = require('mongoose')
const dotenv = require('dotenv')

const dbConnection = async () => {
    const conn = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log('DB Connected')
}


module.exports = dbConnection;