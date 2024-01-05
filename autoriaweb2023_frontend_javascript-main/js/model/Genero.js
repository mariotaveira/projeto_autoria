export class Genero {
  constructor(nome) {
      this._nome = nome;
  }

  set nome(nome){
    this._nome = nome;
  }

  get nome(){
    return this._nome;
  }

}