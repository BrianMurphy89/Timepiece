const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    username: String,
    password: String,
    brand: {type: String, required:true},
    model: {type: String, required:true},
    image: String,
    description: String,
});

const Watches = mongoose.model('Watch', watchSchema);

module.exports = Watches;
