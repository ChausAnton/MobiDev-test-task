const Router = require("express");
const faker = require('../controllers/faker.controller');
const router = Router();

router.get('/createFakeDb', faker.createFakeDb)
module.exports = router;