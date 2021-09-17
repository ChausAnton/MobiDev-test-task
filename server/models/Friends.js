const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    UserId: {type: Types.ObjectId, require: true, ref: 'User'},
    FriendId: {type: Types.ObjectId, require: true, ref: 'User'}
})

module.exports = model('Friends', schema)