import Animal from './Animal.js';

class Cachorro extends Animal {
  constructor(nome, idade) {
    super(nome, idade, "latido");
  }
}

export default Cachorro;
