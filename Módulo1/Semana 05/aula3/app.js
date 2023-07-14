console.log("m1s05a3")

const idade = 20;

if (idade >= 18) {
    console.log("É maior de idade");
}

// Valores FALSO
// false, 0, "", null, undefined, NaN

const meuObjeto = {
    valor: 42,
    valueOf() {
      return undefined;
    }
  };
  
  if (meuObjeto) {
    console.log('A condição é verdadeira');
  } else {
    console.log('A condição é falsa');
  }
  
for (let _ = 0;_<2;){
    _++
}
console.log("fim")