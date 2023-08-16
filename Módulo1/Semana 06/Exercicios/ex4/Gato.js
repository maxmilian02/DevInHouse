import Animal from './Animal.js';

class Gato extends Animal {
  constructor(nome, idade) {
    super(nome, idade, "miado");
  }
}

export default Gato;
