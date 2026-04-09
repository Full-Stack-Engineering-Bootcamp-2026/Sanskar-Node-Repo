const path = require('path');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('69d7d0d1d34669da504e3de3')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bqfim3v.mongodb.net/?appName=Cluster0`).then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: "Sanskar",
        email: "test@test.com",
        cart: {
          items: []
        }
      })
      user.save();
    }
  })

  app.listen(3000)
})
  .catch(err => {
    console.log(err);
  });
