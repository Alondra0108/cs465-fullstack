const path = require('path');
const fs = require('fs');
const mongoose = require('./db');
const Trip = require('./travlr');

const tripsPath = path.join(__dirname, '../../data/trips.json');
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

// Remove existing records and insert the current seed data.
const seedDB = async () => {
  await Trip.init();
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
};

seedDB()
  .then(async () => {
    console.log(`Seeded ${trips.length} trip records.`);
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('Unable to seed the database:', err);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
