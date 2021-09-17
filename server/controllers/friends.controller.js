const User = require('../models/User')
const Friends = require('../models/Friends')

exports.getFriensCount = async(req, res) => {
    try {
        const friendsNumber = await Friends.find({UserId: req.params.id}).count()
        const user = await User.findById(req.params.id)
        res.status(200).send({
            name: user.name,
            lastName: user.lastName,
            age: user.age,
            FriendsNumber: friendsNumber,
            registerDate: user.registerDate
        });  
    }
    catch (e) {
        res.status(400).send({message: 'Bad Request'});  
    }

}