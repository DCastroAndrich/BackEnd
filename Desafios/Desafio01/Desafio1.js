class Usuario {
  nombre;
  apellido;
  libros;
  mascotas;

  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }

  getFullName() {
    console.log(`${this.nombre} ${this.apellido}`);
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    console.log(this.mascotas.length);
  }

  addBook(nombre, autor) {
    this.libros.push({ Nombre: nombre, Autor: autor });
  }

  getBookNames() {
    this.libros.forEach((libro) => {
      console.log(`${libro.Nombre}`);
    });
  }
}

let usuario1 = new Usuario("Damian Alejandro", "Castro Andrich");

usuario1.getFullName();

usuario1.addMascota("gato");
usuario1.addMascota("perro");
usuario1.addMascota("pollo");
console.log(usuario1.mascotas);

usuario1.countMascotas();

usuario1.addBook("El señor de los anillos", "JJR Tolkien");
usuario1.addBook("El temor de un hombre sabio", "Patrick Rothfuss");

usuario1.getBookNames();

