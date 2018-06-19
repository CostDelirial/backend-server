var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var hostpitalSchema = new Schema({
    nombre: { type: String, required: [true, 'EL nombre del hosital es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }

}, { collection: 'hospitales' });

module.exports = mongoose.model('Hospital', hostpitalSchema);