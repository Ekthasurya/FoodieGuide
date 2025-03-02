// server/routes/placesRoutes.js
const express = require('express');
const router = express.Router();
const { getTopItems } = require('../controllers/placesController');

router.get('/top-items', getTopItems);

module.exports = router;
