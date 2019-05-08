let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let jobModel = new Schema({
    functie:   {type: String, required: true},
    ervaring: {type: String, required: true},
});

module.exports = mongoose.model('Job', jobModel);
