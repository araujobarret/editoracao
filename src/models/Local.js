export class Local {

  constructor(_id = null, descricao = null, _idSubLocal = null) {
    this._id = _id;
    this.descricao = descricao;
    this._idSubLocal = _idSubLocal;
  }

  get() {
    return {
      _id: this._id,
      descricao: this.descricao,
      _idSubLocal: this._idSubLocal
    };
  }

}
