let mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    login:{
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    tipo: {
        type: String,
        require: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Usuario = module.exports = mongoose.model('usuario', usuarioSchema);

module.exports.get = function(callback, limit){
    Usuario.find(callback).limit(limit);
}