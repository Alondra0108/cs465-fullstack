const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');
const { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

// GET all trips and POST a new trip.
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip);

// GET one trip by code and update one trip by code.
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip)
  .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;
