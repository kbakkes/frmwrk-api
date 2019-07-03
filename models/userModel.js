let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let sollicitatieModel = new Schema({
    user:   {type: String, required: true},
    password: {type: String, required: true},


});

module.exports = mongoose.model('sollicitatie', sollicitatieModel);
