const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport'); // main auth module
// express image handeling
const cors = require('cors');
const mutilpart = require('connect-multiparty');
// Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const figures = require('./routes/api/figure');
// Initiate express app
const app = express();
// Cors
app.use(cors());
//  Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(mutilpart())

// DB Config
const db = require(('./config/keys')).mongoURI;
// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))
// Pasport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/figure', figures);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`)
});
