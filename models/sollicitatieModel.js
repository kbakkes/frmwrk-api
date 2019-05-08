let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let sollicitatieModel = new Schema({
    voornaam:   {type: String, required: true},
    achternaam: {type: String, required: true},
    emailadres: {type: String, required: true},
    werkervaring: {type: Number, required: true},
    functie: {type: String, required: true},

});

module.exports = mongoose.model('sollicitatie', sollicitatieModel);
