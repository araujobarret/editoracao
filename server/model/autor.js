const mongoose = require('mongoose');
let {Livro} = require('./livro');

let Autor = mongoose.model('Autor', {
  nome: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = { Autor };
