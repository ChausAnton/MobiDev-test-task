const Router = require("express");
const friends = require('../controllers/friends.controller');
const router = Router();

router.get('/friendscount/:id', friends.getFriensCount)

module.exports = router;