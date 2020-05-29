const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const passportSignIn = passport.authenticate('local', { session: false });
const passportConf = require('../../config/passport')
const smtpTransport = require('nodemailer-smtp-transport')
const nodemailer = require('nodemailer')
// Used to generate random tokens for password reset
const crypto = require('crypto');
// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
// Load user model
const User = require('../../models/User')
//  Sign Token
const signToken = user => {
  // Sign Token
  return jwt.sign({
    iss: 'AnimatR',
    id: user.id,
    name: user[user.method].name,
    lastName: user[user.method].lastName,
    email: user[user.method].email,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, keys.secretOrKey)
}
// @route  GET api/users/test
// @desc   Tests profile routes
// access  Public
router.get('/test', (req, res) => {
  res.json({msg: 'Users Works'})
})
// @route  POST api/users/register
// @desc   Register a user
// access  Public
router.post('/register', async (req, res, next) => {
  const { email, name, lastName, password } = req.body

  // Check if there is a user with the same email
  const foundUser = await User.findOne({ "local.email": email });
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use'});
  }

  // Create a new user
  const newUser = new User({
    method: 'local',
    local: {
      email,
      name,
      lastName,
      password
    }
  });

  await newUser.save();

  // Generate the token
  const token = signToken(newUser);
  // Respond with token
  res.status(200).json({ token });
})
// @route  POST api/users/register
// @desc   Register a user
// access  Public
router.post('/login', passportSignIn, async (req, res, next) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
})
// @route  POST api/users/current
// @desc   Returns current user
// access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})
// @route  get api/users/get-count
// @desc   Returns the amount of users are registered in the account
// access  Private
router.get('/get-count', (req, res) => {
  User.find().count({}, function(error, numOfDocs){
        if(error) return res.status(400).json('Could not get user records')
        const payload = {
          num: numOfDocs
        }
        res.status(200).json(payload)
  });
})
// @route  POST api/users/:username
// @desc   Returns by username
// access  Public
router.get('/:username', (req, res) => {
  let username = req.params.username.toString()
  User.findOne({ username }).then(user => {
    // Check for user
    if (!user) {
      return res.status(400).json('Nombre de usuario inexistente')
    } else {
      const payload = {
        id: user.id,
        name: user.name,
      }
      return res.status(200).json(payload)
    }
  })
})
// @route  POST api/users/auth/google
// @desc
// access  Public
router.post('/oauth/google',  passport.authenticate('googletoken', { session: false }), async (req, res, next) => {
  // Generate token
  const token = signToken(req.user)
  // Return access token to client
  res.status(200).json({ token })
})
// @route  GET api/users/auth/facebook
// @desc
// access  Public
router.post('/oauth/facebook',  passport.authenticate('facebooktoken', { session: false }), async (req, res, next) => {
  // Generate token
  const token = signToken(req.user)
  // Return access token to client
  res.status(200).json({ token })
})
// @route  POST '/forgot'
// @desc   rests users password if user has forgotten
// access  Public
router.post('/forgot', async (req, res) => {
  const { email } = req.body

  const foundUser = await User.findOne({ "local.email": email });  
 
  if (!foundUser) {
    return res.status(403).json({ error: 'Email not assigned to an account'});
  }

  const token = crypto.randomBytes(20).toString('hex');
  foundUser.local.resetPasswordToken = token
  foundUser.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  console.log('User: ', foundUser)
  foundUser.save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(500).send({ succes: false, message: 'Failed to reset this user' });
      }
      // Some other error
      return res.status(500).send(err);
    }
  })


let transporter = nodemailer.createTransport(smtpTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey', // Your email id
    pass: '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' // Your password
  }
}))

var mailOptions = {
  from: 'help@AnimatR.com', // sender address
  to: `saulpolo95@gmail.com, ${email}`, // list of receivers
  subject: `Reset account for your AnimatR Account`, // Subject line
  html: `<div>
      <h1>AnimaTR </h1> </br>
    
      <p>Está recibiendo esto porque usted (o alguien más) ha solicitado el </p>
      <p>restablecimiento de la contraseña de su cuenta: <b>${email}</b></p>
      
      <p>Haga clic en el siguiente enlace o pegue esto en su navegador para completar el proceso:<p>
      
      <p>https://animatr.com/reset?token=${foundUser.local.resetPasswordToken}</p>
      

      <span><i>Si no lo solicitó, ignore este correo electrónico y su contraseña se mantendrá sin cambios.</i></span>

      <p>No responda este correo electrónico ya que es un mensaje automatizado, ¡gracias!</p>
    </div>`
  }

  transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error)
    res.json({yo: 'error'})
  } else {
    console.log('Message sent: ' + info.response)
    res.json({yo: info.response})
  }
  })
})

// @route  POST '/reset/:token'
// @desc   Checks if a users token is valid and redirects to change pange
// access  Public
router.post('/reset/', function(req, res) {
  const { token, newPassword, confirmPassword } = req.body.payload
  console.log(req.body.payload)
  console.log('Token: ', token)
  console.log('newPassword: ', newPassword)
  console.log('confirmPassword: ', confirmPassword)

  User.findOne({ 'local.resetPasswordToken': token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
    console.log('User: ', user)
    if (!user) {
      return res.status(403).json({ error: 'Password reset token is invalid or has expired.'});
    }
    user.local.password = newPassword;
    user.local.resetPasswordToken = undefined;
    user.local.resetPasswordExpires = undefined;
    user.save()
    console.log(user)
  });
});


module.exports = router