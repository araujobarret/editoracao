const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {autenticar} = require('../middleware/autenticar');
let {Autor} = require('../model/autor');
let router = express.Router();

router.post('/autor/', autenticar, (req, res) => {
  let body = _.pick(req.body, ['nome']);
  let autor = new Autor(body);

  autor.save()
    .then((autor) => res.send(autor))
    .catch((e) => res.status(400).send(e));
});

router.get('/autor/', (req, res) => {
  Autor.find({})
    .then((autor) => res.send(autor))
    .catch((e) => res.status(400).send());
});

module.exports = router;
