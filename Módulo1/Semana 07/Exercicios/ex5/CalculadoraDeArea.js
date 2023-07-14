class CalculadoraDeArea {
    constructor(tipo, base, altura) {
      this.tipo = tipo;
      this.base = base;
      this.altura = altura;
    }
  
    calcular() {
      let area = 0;
      if (this.tipo === "triangulo") {
        area = (this.base * this.altura) / 2;
      } else if (this.tipo === "quadrado" || this.tipo === "retangulo") {
        area = this.base * this.altura;
      }
      return area;
    }
  }
  
  export default CalculadoraDeArea;
  