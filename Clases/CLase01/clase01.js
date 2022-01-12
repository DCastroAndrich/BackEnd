// Ejercicio de Closures
function mostrarLista(lista) {
  if (lista != null) {
    console.log(lista);
  } else {
    console.log("lista vacia");
  }
}

(function (lista2) {
  if (lista2 != null) {
    console.log(lista2);
  } else {
    console.log("lista vacia");
  }
})(["A", "B", "C"])


function crearMultiplicador (num1){
    return function (num2) {
        resultado = num1 * num2;
        console.log(resultado);

        
    }
}

let duplicar = crearMultiplicador(2);
let triplicar = crearMultiplicador(3);

duplicar(5);
triplicar(10);