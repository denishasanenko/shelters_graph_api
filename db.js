const mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});

module.exports = mongoose;
