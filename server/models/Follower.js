const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    followerId: {type: Types.ObjectId, require: true, ref: 'User'},
    subscribedId: {type: Types.ObjectId, require: true, ref: 'User'}
})

module.exports = model('Follower', schema)