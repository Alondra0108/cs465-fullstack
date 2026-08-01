const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
};

/* GET travel view */
const travel = async (req, res) => {
    try {
        // Request the trip collection from the REST API.
        const response = await fetch(tripsEndpoint, options);

        // Convert the API response into JavaScript data.
        let trips = await response.json();
        let message = null;

        // The API response was not an array of trip records.
        if (!Array.isArray(trips)) {
            message = 'API lookup error';
            trips = [];
        } else if (trips.length === 0) {
            // The API returned an array, but it contained no trips.
            message = 'No trips exist in our database!';
        }

        // Render the travel page with data retrieved from the API.
        return res.render('travel', {
            title: 'Travlr Getaways',
            trips,
            message
        });
    } catch (err) {
        // Return a server error if communication with the API fails.
        return res
            .status(500)
            .send(err.message);
    }
};

module.exports = {
    travel
};