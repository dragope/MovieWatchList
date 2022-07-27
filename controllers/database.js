const mongoose = require('mongoose');
require('dotenv');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.suftt.mongodb.net/?retryWrites=true&w=majority`)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));