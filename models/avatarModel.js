let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let avatarModel = new Schema({
    head:   {type: Number, required: true},
    skin:   {type: Number, required: true},
    face:   {type: Number, required: true},
    hair:   {type: Number, required: true},
    hairColor:   {type: Number, required: true},
    facial:   {type: Number, required: true},
    facialColor:   {type: Number, required: true},
    eyebrows:   {type: Number, required: true},
    eyebrowsColor:   {type: Number, required: true},
    glasses:   {type: Number, required: true},


});

module.exports = mongoose.model('avatar', avatarModel);
