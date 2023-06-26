console.log("m1s05a1");

// Manipular o primeiro elemento h1:
let h1 = document.getElementsByTagName("h1")[0];
h1.style.color = "#0A0";


// Criar uma query com todos os elementos h2 no html:
let h1List = document.querySelectorAll("h2");
h1List.forEach(h2 => {
  h2.style.color = "#CCC";
});
