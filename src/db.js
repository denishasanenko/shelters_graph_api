const mongoose = require('mongoose');

console.log(`Connecting to MongoDB cluster using credentials: ${process.env.DB_HOST}`)
mongoose.connect(
    process.env.DB_HOST,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = mongoose;
