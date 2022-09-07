const express = require('express');
const mongoose = require ('mongoose')


const app = express();

const PORT = process.env.PORT || 3007;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.use(require ('./routes'));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network-api",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('debug', true);

  app.listen(PORT, () => {
    console.log(`Well DONE!! Your app is now listening on ${PORT}!`);
  });
