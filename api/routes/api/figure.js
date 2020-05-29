const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
// Figure model
const Figure = require('../../models/Figure')
// Profile model
const Profile = require('../../models/Profile')
// Validation
const validateFigureInput = require('../../validation/figure')
// @route  GET api/figures/test
// @desc   Tests figures routes
// access  Public
router.get('/test', (req, res) => {
    console.log("testesttest")
  res.json({msg: 'Figures Works'})
})
// @route  GET api/figures/
// @desc   GET figures
// access  Public
router.get('/', (req, res) => {
  Figure.find()
    .sort({ date: -1 })
    .then(figures => res.json(figures))
    .catch(err => res.status(404).json({nofiguresfound: 'No figures found'}))
})
// @route  GET api/figures/:id
// @desc   GET figures by id
// access  Public
router.get('/:id', (req, res) => {
  Figure.find({drawingID: req.params.id})
    .then(figure => res.json(figure))
    .catch(err => res.status(404).json({nofigurefound: 'No figure found with that ID'}))
});
// @route  POST api/figures
// @desc   Creative figure
// access  Private
router.post('/', (req, res) => {
  console.log("POSTPOSTPOST: ");
  const { errors, isValid } = validateFigureInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newFigure = new Figure({
    text: req.body.text,
    name: req.body.name,
    drawingID: req.body.drawingID,
    figure_type: req.body.figure_type,
    cordinates: {
        x: req.body.cordinates.x,
        y: req.body.cordinates.y
    },
    div: req.body.div,
  });

  newFigure.save().then(figure => res.json(figure))
});
// @route  POST api/figures/like/:id
// @desc   like figure
// access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Figure.findById(req.params.id)
        .then(figure => {
          if (figure.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({alreadyliked: 'User already liked this figure' })
          }
          figure.likes.unshift({user: req.user.id})
          figure.save().then(figure => res.json(figure))
        })
        .catch(err => res.status(404).json({ figurenotfound: 'No figure found' }))
    })
});
// @route  POST api/figures/like/:id
// @desc   unlike figure
// access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Figure.findById(req.params.id)
        .then(figure => {
          if (figure.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({notliked: 'You have not yet liked this figure' })
          }
          // get remove index
          const removeIndex = figure.likes.map(item => item.user.toString())
            .indexOf(req.user.id)
          figure.likes.splice(removeIndex, 1)
          figure.save().then(figure => res.json(figure))
        })
        .catch(err => res.status(404).json({ figurenotfound: 'No figure found' }))
    })
});
// @route  Delete api/figures/:id
// @desc   Delete figure
// access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Figure.findById(req.params.id)
        .then(figure => {
          if (figure.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User not authorized'})
          }
          // Delete
          figure.remove().then(() => res.json({ success: true })).catch(err => res.status(404).json({ figurenotfound: 'No figure found' }))
        })
    })
});
// @route  Post api/figures/comment:id
// @desc   Add comment
// access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateFigureInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Figure.findById(req.params.id)
    .then(figure => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      figure.comments.unshift(newComment)
      figure.save()
        .then(figure => res.json(figure))
    })
    .catch(err => res.status(404).json({figurenotfound: 'No figure found'}))
});

// @route  Delete api/figures/comment/:id/:comment_id
// @desc   Delete a comment from figure
// access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Figure.findById(req.params.id)
    .then(figure => {
    // Check to see if comment exists
      if (figure.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' })
      }
      // Get remove index
      const removeIndex = figure.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
      // splice comment out of array
      figure.comments.splice(removeIndex, 1)
      // save
      figure.save().then(figure => res.json(figure))
    })
    .catch(err => res.status(404).json({figurenotfound: 'No figure found'}))
});

module.exports = router;
