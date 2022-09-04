const connection = require('../config/connection');
const { User, Thoughts } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Thoughts.deleteMany({});
  const User = [];

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the students

  // Add students to the collection and await the results
  await User.collection.insertMany(User);

  // Add courses to the collection and await the results
  await Thoughts.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(User);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});