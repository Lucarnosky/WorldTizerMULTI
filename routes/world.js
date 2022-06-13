const express = require('express'); //import express

const router = express.Router();
const controller = require('../controllers/world.js');
router.get('/map', controller.getMap);
router.get('/next', controller.nextTurn);
router.get('/test', controller.sampleMap);
router.post('/map', controller.addToMap);
router.post('/reset',controller.resetMap);
module.exports = router; // export to use in server.js