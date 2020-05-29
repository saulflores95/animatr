mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Filds to be added soon
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    avatar: {
      type: String
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        text: {
          type: String,
          required: true
        }
      }
    ],
*/

const FigureSchema = new Schema({
  drawingID: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  figure_type: {
    type: String
  },
  cordinates: {
    x: {
      type: String
    },
    y: {
      type: String
    }
  },
  div: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Figure = mongoose.model('figure', FigureSchema);
