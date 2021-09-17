const User = require('../models/User')
const Follower = require('../models/Follower')
const Friends = require('../models/Friends')
const faker = require('faker');

exports.createFakeDb = async(req, res) => {
    const CreateUsers = []
    for(let i = 0; i < 100; i++) {
        const user = {
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: Math.floor(Math.random() * (64 - 18) + 18)
        }
        CreateUsers.push(user)
    }
    const users = await User.insertMany(CreateUsers)

    const CreateFollowers = []
    for(let i = 0; i < 300; i++) {
        let followerId = 0
        let subscribedId = 0
        if (Math.floor(Math.random() * (3 - 1) + 1) == 1) {
            followerId = users[Math.round(Math.random() * (users.length / 2))].id
            subscribedId = users[Math.round(Math.random() * ((users.length - 1) - ((users.length / 2) + 1)) + ((users.length / 2) + 1))].id
        }
        else {
            followerId = users[Math.round(Math.random() * ((users.length - 1) - ((users.length / 2) + 1)) + ((users.length / 2) + 1))].id
            subscribedId = users[Math.round(Math.random() * (users.length / 2))].id
        }
        const temp = {
            followerId: followerId,
            subscribedId: subscribedId
        }
        if(!JSON.stringify(CreateFollowers).includes(JSON.stringify(temp))) {
            CreateFollowers.push(temp)
        }
    }
    const followers = await Follower.insertMany(CreateFollowers)

    const CreateReplySubscription = []
    for(let v of CreateFollowers) {
        const temp = {
            followerId: v.subscribedId,
            subscribedId: v.followerId
        }
        if(JSON.stringify(CreateFollowers).includes(JSON.stringify(temp))) {
            CreateReplySubscription.push(temp);
        }
    }   

    for(let i = 0; i < 75; i++) {
        const rand = Math.round(Math.random() * (users.length - 1))
        const temp = {
            followerId: followers[rand].subscribedId,
            subscribedId: followers[rand].followerId
        }
        if(!JSON.stringify(CreateReplySubscription).includes(JSON.stringify(temp)) &&
        !JSON.stringify(CreateFollowers).includes(JSON.stringify(temp))
        ) {
            CreateReplySubscription.push(temp)
        }
    }

    const ReplySubscriptions = await Follower.insertMany(CreateReplySubscription)

    const CreateFriends = []
    for(let v of ReplySubscriptions) {
        CreateFriends.push({ UserId: v.followerId, FriendId: v.subscribedId})
        CreateFriends.push({ UserId: v.subscribedId, FriendId: v.followerId})
    }
    Friends.insertMany(CreateFriends)
    
    res.status(201).send({message: "ok"})
}
