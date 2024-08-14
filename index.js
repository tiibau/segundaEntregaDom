let saludoUsuario = "";

function mostrarSaludo() {
  const saludoDiv = document.getElementById("saludo");
  saludoDiv.innerText = `Bienvenido ${saludoUsuario} a la mejor plataforma de beats!`;
}

function ingresarNombre() {
  saludoUsuario = document.getElementById("nombre").value.trim();
  if (saludoUsuario) {
    mostrarSaludo();
    document.getElementById("nombre-input").style.display = "none";
    mostrarGenerosDisponibles();
  } else {
    alert("Por favor, ingresa tu nombre.");
  }
}

class Beat {
  constructor(nombre, precio, genero) {
    this.nombre = nombre;
    this.precio = precio;
    this.genero = genero;
  }
}

class Carrito {
  constructor() {
    this.items = [];
  }

  agregarBeat(beat) {
    this.items.push(beat);
    this.mostrarCarrito();
  }

  eliminarBeat(nombre) {
    this.items = this.items.filter((beat) => beat.nombre !== nombre);
    this.mostrarCarrito();
  }

  calcularTotal(impuesto = 0.21) {
    let subtotal = this.items.reduce((suma, beat) => suma + beat.precio, 0);
    let total = subtotal + subtotal * impuesto;
    return total;
  }

  mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito-items");
    carritoDiv.innerHTML = "";

    if (this.items.length === 0) {
      carritoDiv.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
      this.items.forEach((beat, index) => {
        carritoDiv.innerHTML += `
                    <div>
                        ${index + 1}. ${beat.nombre} - $${beat.precio}
                        <button onclick="eliminarDelCarrito('${
                          beat.nombre
                        }')">Eliminar</button>
                    </div>`;
      });
    }

    document.getElementById("finalizar-compra").style.display =
      this.items.length > 0 ? "block" : "none";
  }
}

let beats = [
  new Beat("Dream - Boom bap classic type beat", 30, "rap"),
  new Beat("Powder - Chill 90s rap beat", 35, "rap"),
  new Beat("Genesis - Hard rap beat 2024", 40, "rap"),
  new Beat("Too good for you - R&B beat", 45, "R&B"),
  new Beat("Money - Instrumental R&B", 50, "R&B"),
  new Beat("L.O.V.E. - R&B new type beat", 55, "R&B"),
  new Beat("Tiempos de cambiar - Instrumental rock", 60, "rock"),
  new Beat("Esmeralda - Guasones rock type beat", 65, "rock"),
  new Beat("Soul - Modern rock type beat", 70, "rock"),
];

let generosDisponibles = [
  "rap",
  "R&B",
  "rock",
  "pop",
  "reggae",
  "indie",
  "EDM",
];

let carrito = new Carrito();

function mostrarGenerosDisponibles() {
  const generosDiv = document.getElementById("generos-disponibles");
  generosDiv.innerHTML = `<p>Géneros disponibles: ${generosDisponibles.join(
    ", "
  )}</p>`;
  document.getElementById("genero-input").style.display = "block";
}

function explorarBeats() {
  const genero = document.getElementById("genero").value.trim().toLowerCase();
  const beatsDiv = document.getElementById("beats");
  beatsDiv.innerHTML = "";

  let opciones = beats.filter((beat) => beat.genero.toLowerCase() === genero);

  if (opciones.length > 0) {
    opciones.forEach((beat, index) => {
      beatsDiv.innerHTML += `
                <div>
                    ${index + 1}. ${beat.nombre} - $${beat.precio}
                    <button onclick="agregarAlCarrito('${
                      beat.nombre
                    }')">Agregar al carrito</button>
                </div>`;
    });
  } else {
    beatsDiv.innerHTML = `<p>Lo siento, no tenemos opciones para el género ${genero}.</p>`;
  }
}

function agregarAlCarrito(nombre) {
  let beat = beats.find((beat) => beat.nombre === nombre);
  if (beat) {
    carrito.agregarBeat(beat);
  }
}

function eliminarDelCarrito(nombre) {
  carrito.eliminarBeat(nombre);
}

function finalizarCompra() {
  let cantidadCuotas = parseInt(
    prompt("¿En cuántas cuotas deseas pagar? (máximo 6)"),
    10
  );
  cantidadCuotas =
    cantidadCuotas > 0 && cantidadCuotas <= 6 ? cantidadCuotas : 1;

  let total = carrito.calcularTotal();
  let cuota = (total / cantidadCuotas).toFixed(2);

  alert(
    `Monto total a pagar (con impuestos): $${total.toFixed(
      2
    )}\nMonto por cuota (si se paga en ${cantidadCuotas} cuotas): $${cuota}`
  );
}
