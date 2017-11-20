const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Usuario} = require('./model/usuario');
let {Local} = require('./model/local');
let {Autor} = require('./model/autor');
let {Livro} = require('./model/livro');
let {autenticar} = require('./middleware/autenticar');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/usuario', (req, res) => {
  let body = _.pick(req.body, ['login', 'senha']);
  let usuario = new Usuario(body);

  usuario.save().then(() => {
    return usuario.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(usuario);
  }).catch((e) => res.status(400).send(e));
});

app.post('/usuario/login', (req,res) => {
  let body = _.pick(req.body, ['login', 'senha']);

  Usuario.findByCredentials(body.login, body.senha).then((usuario) => {
    return usuario.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(usuario);
    });
  }).catch((e) => res.status(400).send());

});

app.get('/usuario/me', autenticar, (req, res) => {
  res.send(req.usuario);
});

app.delete('/usuario/logout', autenticar, (req, res) => {
  req.usuario.removeToken(req.token)
    .then(() => res.status(200).send())
    .catch((e) => res.status(400).send());
});

app.post('/local', autenticar, (req, res) => {
  let body = _.pick(req.body, ['descricao', 'subLocal']);
  let local = new Local({
    descricao: body.descricao,
    _idSubLocal: body._idSubLocal
  });

  local.save()
    .then((local) => res.status(200).send(local))
    .catch((e) => res.status(400).send(e));

});

app.get('/local', (req, res) => {
  let body = _.pick(req.query, ['descricao']);

  Local.find(body)
    .populate('_idSubLocal')
    .then((locais) => {
      res.send(locais);
    })
    .catch((e) => res.status(400).send(e));
});

app.patch('/local/:id', autenticar, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['descricao', '_idSubLocal']);
  let unset = {};

  if(!ObjectID.isValid(id))
    res.status(404).send();

  if(body._idSubLocal){
    if(!ObjectID.isValid(body._idSubLocal))
      res.status(404).send();
  }
  else {
    unset['_idSubLocal'] = "";
  }

  if(_.isEmpty(unset)) {
    Local.findByIdAndUpdate(id, {
       $set: body
     }, {new: true})
      .then((local) => res.send(local))
      .catch((e) => res.status(400).send(e));
  }
  else {
    Local.findByIdAndUpdate(id, {
       $set: body,
       $unset: unset
     }, {new: true})
      .then((local) => res.send(local))
      .catch((e) => res.status(400).send(e));
  }
});

app.post('/autor/', autenticar, (req, res) => {
  let body = _.pick(req.body, ['nome']);
  let autor = new Autor(body);

  autor.save()
    .then((autor) => res.send(autor))
    .catch((e) => res.status(400).send(e));
});

app.post('/livro', autenticar, (req, res) => {
  let body = _.pick(req.body, ['isbn', 'titulo', 'ano', 'paginas', 'peso', 'formato', 'valor_venda', 'ean']);
  let autores = _.pick(req.body, ['autores']);
  let assuntos = _.pick(req.body, ['assuntos']);

  let livro = new Livro(body);

  if(!_.isEmpty(autores)) {
    for(autor of autores.autores)
      livro.autores.addToSet(autor._idAutor);
  }

  if(!_.isEmpty(assuntos)) {
    for(assunto of assuntos.assuntos)
      livro.assuntos.addToSet(assunto);
  }

  livro.save()
     .then((livro) => res.send(livro))
     .catch((e) => res.status(400).send(e));
});

app.get('/livro', (req, res) => {
  let body = _.pick(req.query, ['isbn', 'titulo', 'ano', 'paginas', 'peso', 'formato', 'valor_venda', 'ean']);

  Livro.find(body)
    .populate('autores')
    .then((livros) => res.send(livros))
    .catch((e) => res.status(400).send(e));
});

app.get('/livro/:id', (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id))
    res.status(404).send();

  Livro.findById(id)
    .then((livro) => {
      if(!livro)
        res.status(404).send();

      res.send(livro);
    }).catch((e) => res.status(400).send(e));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = {app};
