class Juros {
    constructor(capitalInicial, taxaAplicada, tempo) {
      this.capitalInicial = capitalInicial;
      this.taxaAplicada = taxaAplicada;
      this.tempo = tempo;
    }
  
    calcularJurosSimples() {
      const juros = this.capitalInicial * this.taxaAplicada * this.tempo;
      return juros;
    }
  
    calcularJurosCompostos() {
      const montante = this.capitalInicial * Math.pow(1 + this.taxaAplicada, this.tempo);
      const juros = montante - this.capitalInicial;
      return juros;
    }
  }
  
  export default Juros;
  