const mongoose = require('mongoose');

let Local = mongoose.model('Rubrica', {
  descricao: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  tipo: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = { Rubrica };
