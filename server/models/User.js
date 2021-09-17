const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    registerDate : { type : Date, default: Date.now },
    age: {type: Number, require: true}
})

module.exports = model('User', schema)