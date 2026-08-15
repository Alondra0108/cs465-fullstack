const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /api/trips
// Returns all trips stored in MongoDB.
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips || trips.length === 0) {
      return res
        .status(404)
        .json({ message: 'No trips found' });
    }

    return res
      .status(200)
      .json(trips);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message });
  }
};

// GET: /api/trips/:tripCode
// Returns the trip matching the supplied code.
const tripsFindByCode = async (req, res) => {
  try {
    const trips = await Trip
      .find({ code: req.params.tripCode })
      .exec();

    if (!trips || trips.length === 0) {
      return res
        .status(404)
        .json({
          message: `No trip found with code ${req.params.tripCode}`
        });
    }

    return res
      .status(200)
      .json(trips);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message });
  }
};

// POST: /api/trips
// Creates and saves a new trip.
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    const trip = await newTrip.save();

    if (!trip) {
      return res
        .status(400)
        .json({ message: 'Unable to create trip' });
    }

    return res
      .status(201)
      .json(trip);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message });
  }
};

// PUT: /api/trips/:tripCode
// Updates an existing trip.
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip
      .findOneAndUpdate(
        { code: req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        },
        {
          new: true,
          runValidators: true
        }
      )
      .exec();

    if (!trip) {
      return res
        .status(400)
        .json({
          message: `No trip found with code ${req.params.tripCode}`
        });
    }

    return res
      .status(201)
      .json(trip);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message });
  }
};

// DELETE: /api/trips/:tripCode
// Deletes the trip matching the supplied code.
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip
      .findOneAndDelete({ code: req.params.tripCode })
      .exec();

    if (!trip) {
      return res
        .status(404)
        .json({
          message: `No trip found with code ${req.params.tripCode}`
        });
    }

    return res
      .status(200)
      .json(trip);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
