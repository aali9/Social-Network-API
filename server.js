const express = require('express');
const mongoose = require ('mongoose')
const db = require('./config/connection');
// const cwd = process.cwd();

const PORT = process.env.PORT || 3007;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require ('./routes'));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network-api",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Wahoo! Your app is now listening on ${PORT}!`);
  });
});