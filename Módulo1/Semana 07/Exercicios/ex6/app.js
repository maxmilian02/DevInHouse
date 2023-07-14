import Juros from './Juros.js';

const aplicacao1 = new Juros(10000, 0.07, 24);
const jurosSimples1 = aplicacao1.calcularJurosSimples();
const jurosCompostos1 = aplicacao1.calcularJurosCompostos();
console.log("Aplicação 1 - Juros Simples:", jurosSimples1);
console.log("Aplicação 1 - Juros Compostos:", jurosCompostos1);

const aplicacao2 = new Juros(10000, 0.15, 10);
const jurosSimples2 = aplicacao2.calcularJurosSimples();
const jurosCompostos2 = aplicacao2.calcularJurosCompostos();
console.log("Aplicação 2 - Juros Simples:", jurosSimples2);
console.log("Aplicação 2 - Juros Compostos:", jurosCompostos2);
