const Router = require("express");
const follower = require('../controllers/follower.controller');
const router = Router();

router.get('/getPopular', follower.getPopular)

module.exports = router;