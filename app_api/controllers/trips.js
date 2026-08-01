const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /trips
// Returns a list of all trips stored in MongoDB.
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        // The database returned no trip records.
        if (!trips || trips.length === 0) {
            return res
                .status(404)
                .json({ message: 'No trips found' });
        }

        // Return the complete trip collection.
        return res
            .status(200)
            .json(trips);
    } catch (err) {
        // Return a server error if the database request fails.
        return res
            .status(500)
            .json({ message: err.message });
    }
};

// GET: /trips/:tripCode
// Returns the trip whose code matches the URL parameter.
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Trip
            .find({ code: req.params.tripCode })
            .exec();

        // No trip matched the supplied trip code.
        if (!trips || trips.length === 0) {
            return res
                .status(404)
                .json({
                    message: `No trip found with code ${req.params.tripCode}`
                });
        }

        // Return the matching trip.
        return res
            .status(200)
            .json(trips);
    } catch (err) {
        // Return a server error if the database request fails.
        return res
            .status(500)
            .json({ message: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};