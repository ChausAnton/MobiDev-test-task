const Follower = require('../models/Follower')
const User = require('../models/User')

exports.getPopular = async(req, res) => {
  let subscribed = await Follower.aggregate([
    {$group: {_id: "$subscribedId", followers:{$sum: 1}}},
    {$sort: {followers: -1}},
    {$limit : 3}
  ])
  let Users = await User.find({_id: subscribed})
  let UsersRes = Users.map((value, index) => {
    let temp = {
      _id: value._id,
      name: value.name,
      lastName: value.lastName,
      age: value.age,
      subscribed: subscribed[index].followers
    };
    return temp
  })
  res.status(200).send(UsersRes);  
}