const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// GET /api/trips
// Send requests for all trips to the tripsList controller.
router
    .route('/trips')
    .get(tripsController.tripsList);

// GET /api/trips/:tripCode
// Send requests containing a trip code to tripsFindByCode.
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;