const mongoose = require('mongoose');

let assuntoSchema = mongoose.Schema({
  assunto: {
    type: String,
    trim: true
  }
}, {_id: false});

let Livro = mongoose.model('Livro', {
  isbn: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  autores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
      ref: 'Autor'
    }
  ],
  ano: {
    type: Number,
    required: true
  },
  assuntos: [ assuntoSchema ],
  paginas: {
    type: Number,
    required: true
  },
  peso: {
    type: String,
    trim: true
  },
  formato: {
    type: String,
    trim: true
  },
  valor_venda: {
    type: Number
  },
  ean: {
    type: String,
    trim: true
  }
});

module.exports = { Livro };
