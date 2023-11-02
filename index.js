document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-menu");
  const navList = document.getElementById("navbarList");
  const listaCarrito = document.querySelector(".lista-carrito");
  const totalCarrito = document.querySelector(".total");
  const vaciarCarrito = document.getElementById("vaciar-carrito");
  const botonSiguiente = document.getElementById("boton-siguiente");
  const botonAnterior = document.getElementById("boton-anterior");
  const closeButton = document.querySelector(".close-button");
  const closeCarrito = document.querySelector(".close-carrito");
  const productosContainer = document.querySelector(".productos-container");
  const navbarLinks = document.querySelectorAll(".navbar-link a");
  const carritoToggle = document.querySelector(".cart");
  const carritoContainer = document.querySelector(".carrito");
  const agregarDescuento = document.querySelector(".descuento");
  const mensajeCarrito = document.getElementById("mensaje-carrito");
  const comprarCarritoButton = document.getElementById("comprar-carrito");
  const modal = document.getElementById("modal");
  const confirmarCompraSiButton = document.getElementById(
    "confirmar-compra-si"
  );
  const confirmarCompraNoButton = document.getElementById(
    "confirmar-compra-no"
  );

  mobileMenuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let currentIndex = 0;

  agregarDescuento.addEventListener("click", () => {
    const productoTrumpeter = cardsInfo.find(
      (producto) => producto.name === "Trumpeter Malbec"
    );

    if (productoTrumpeter) {
      const nombre = productoTrumpeter.name;
      const precio = productoTrumpeter.price;
      const imagen = productoTrumpeter.cardImg;
      agregarProductoAlCarrito(nombre, precio, imagen);
      actualizarCarrito();
    }
  });

  const cardsInfo = [
    {
      id: 1,
      name: "Taittinger Brut Reserve Jeroboamc",
      category: "otros",
      cardImg: "assets/champagneTaittinger.jpg",
      price: 16000,
    },
    {
      id: 2,
      name: "Absolut Apeach",
      category: "otros",
      cardImg: "assets/absolut.jpg",
      price: 10500,
    },
    {
      id: 3,
      name: "Alta Vista Premium Malbec 2016",
      category: "vinos",
      cardImg: "assets/altaVista.jpg",
      price: 6160,
    },
    {
      id: 4,
      name: "Cerveza Antares Kolsch Lata 473",
      category: "cervezas",
      cardImg: "assets/cervezaAntares.jpg",
      price: 900,
    },
    {
      id: 5,
      name: "Rutini Cabernet Malbec",
      category: "vinos",
      cardImg: "assets/rutini.jpg",
      price: 4630,
    },
    {
      id: 6,
      name: "Köstritzer",
      category: "cervezas",
      cardImg: "assets/kostritzer.jpg",
      price: 1500,
    },
    {
      id: 7,
      name: "Cerveza Antares Honey",
      category: "cervezas",
      cardImg: "assets/antaresHoney.jpg",
      price: 800,
    },
    {
      id: 8,
      name: "Trumpeter Malbec",
      category: "vinos",
      cardImg: "assets/trumpeter.jpg",
      price: 1725,
    },
    {
      id: 9,
      name: "Bavaria 8.6 Black",
      category: "cervezas",
      cardImg: "assets/bavaria.jpg",
      price: 1000,
    },
    {
      id: 10,
      name: "Las Perdices Malbec",
      category: "vinos",
      cardImg: "assets/perdices.jpg",
      price: 4500,
    },
    {
      id: 11,
      name: "Chivas Regal 12 Años",
      category: "otros",
      cardImg: "assets/chivasRegal.jpg",
      price: 22500,
    },
    {
      id: 12,
      name: "Cava Vilarnau Ice Sec",
      category: "otros",
      cardImg: "assets/cava.jpg",
      price: 12500,
    },
  ];
  const openMenu = () => {
    navList.classList.add("active");
    cerrarCarrito();
  };

  const closeMenu = () => {
    navList.classList.remove("active");
  };

  const openCarrito = () => {
    carritoContainer.classList.add("open");
    closeMenu();
  };

  const cerrarCarrito = () => {
    carritoContainer.classList.remove("open");
  };

  mobileMenuToggle.addEventListener("click", () => {
    if (navList.classList.contains("active")) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  carritoToggle.addEventListener("click", () => {
    if (carritoContainer.classList.contains("open")) {
      cerrarCarrito();
    } else {
      openCarrito();
    }
  });

  navbarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  closeButton.addEventListener("click", () => {
    closeMenu();
  });
  closeCarrito.addEventListener("click", () => {
    cerrarCarrito();
  });

  const eliminarProductoDelCarrito = (producto) => {
    carrito = carrito.filter((item) => item.nombre !== producto.nombre);
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const actualizarCarrito = () => {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto) => {
      const listItem = document.createElement("div");
      listItem.classList.add("carrito-item");

      const subtotal = producto.precio * producto.cantidad;

      listItem.innerHTML = `
        <div class="producto-info">
          <img src="${producto.cardImg}" alt="${producto.nombre}">
          <p>${producto.nombre}</p>
        </div>
        <p>$${producto.precio}</p>
        <input type="number" class="cantidad" value="${producto.cantidad}" min="1">
        <p>$${subtotal}</p>
        <button class="eliminar"><i class="fa-regular fa-circle-xmark"></i></button>
      `;

      listItem.querySelector(".eliminar").addEventListener("click", () => {
        eliminarProductoDelCarrito(producto);
      });

      listItem.querySelector(".cantidad").addEventListener("input", (e) => {
        const nuevaCantidad = parseInt(e.target.value);
        if (nuevaCantidad > 0) {
          producto.cantidad = nuevaCantidad;
          actualizarCarrito();
        }
      });

      listaCarrito.appendChild(listItem);
      total += subtotal;
    });

    totalCarrito.textContent = total;
  };
  comprarCarritoButton.addEventListener("click", () => {
    modal.style.display = "block";
  });
  confirmarCompraSiButton.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    } else {
      modal.style.display = "none";
      alert("Compra realizada con éxito.");
      vaciarCarritoModal();
      vaciarCarritoLocalStorage();
      carrito = [];
      actualizarCarrito();
    }
  });
  const vaciarCarritoLocalStorage = () => {
    localStorage.removeItem("carrito");
  };

  confirmarCompraNoButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const vaciarCarritoModal = () => {
    const listaCarrito = document.querySelector(".lista-carrito");
    listaCarrito.innerHTML = "";
    const totalElement = document.querySelector(".total");
    totalElement.textContent = "0.00";
  };

  const agregarProductoAlCarrito = (nombre, precio, cardImg) => {
    const productoExistente = carrito.find(
      (producto) => producto.nombre === nombre
    );

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      const productoSeleccionado = {
        nombre,
        precio,
        cardImg,
        cantidad: 1,
      };
      carrito.push(productoSeleccionado);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarCarrito();
    mensajeCarrito.textContent = "Producto agregado al carrito";
    mensajeCarrito.classList.remove("oculto");

    setTimeout(() => {
      mensajeCarrito.textContent = "";
      mensajeCarrito.classList.add("oculto");
    }, 3000);
  };

  window.addEventListener("load", () => {
    actualizarCarrito();
    document.querySelectorAll(".agregar").forEach((button) => {
      button.addEventListener("click", (event) => {
        const { target } = event;
        const nombre = target.dataset.nombre;
        const producto = cardsInfo.find((producto) => producto.name === nombre);

        if (producto) {
          const precio = producto.price;
          const imagen = producto.cardImg;
          agregarProductoAlCarrito(nombre, precio, imagen);
        }
      });
    });
  });
  vaciarCarrito.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
  const productosPorPagina = 4;

  const mostrarProductos = () => {
    productosContainer.innerHTML = "";

    for (let i = currentIndex; i < currentIndex + productosPorPagina; i++) {
      if (i < cardsInfo.length) {
        const producto = cardsInfo[i];
        const card = crearCardProduct(producto);
        productosContainer.appendChild(card);
      }
    }
  };
  const botonVerMas = document.querySelector(".ver-mas");
  const mostrarMasProductos = () => {
    const productosPorPagina = 4;
    for (let i = currentIndex; i < currentIndex + productosPorPagina; i++) {
      if (i < cardsInfo.length) {
        const producto = cardsInfo[i];
        const card = crearCardProduct(producto);
        productosContainer.appendChild(card);
      }
    }
    currentIndex += productosPorPagina;

    if (currentIndex >= cardsInfo.length) {
      botonVerMas.style.display = "none";
    }
  };

  botonVerMas.addEventListener("click", mostrarMasProductos);

  const crearCardProduct = (producto) => {
    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${producto.cardImg}" alt="${producto.name}">
      <h2>${producto.name}</h2>
      <p>Precio: $${producto.price}</p>
      <button class="agregar">Agregar al carrito</button>
    `;

    card.querySelector(".agregar").addEventListener("click", () => {
      const nombre = producto.name;
      const precio = producto.price;
      const imagen = producto.cardImg;
      agregarProductoAlCarrito(nombre, precio, imagen);
      actualizarCarrito();
    });

    return card;
  };

  botonSiguiente.addEventListener("click", () => {
    if (currentIndex + productosPorPagina < cardsInfo.length) {
      currentIndex += productosPorPagina;
      mostrarProductos();
    }
  });

  botonAnterior.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= productosPorPagina;
      mostrarProductos();
    }
  });

  mostrarProductos();
});

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{3,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{3,12}$/, // 4 a 12 digitos.
  // correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};
const validarCampos = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarFormulario(expresiones.usuario, e.target, "nombre");
      break;
    case "apellido":
      validarFormulario(expresiones.nombre, e.target, "apellido");
      break;
    case "telefono":
      validarFormulario(expresiones.telefono, e.target, "telefono");
      break;
  }
};

const validarFormulario = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`input__${campo}`)
      .classList.remove("formulario-incorrecto");
    document
      .getElementById(`input__${campo}`)
      .classList.add("formulario-correcto");
    document
      .querySelector(`#input__${campo} .formulario__error`)
      .classList.remove("formulario__error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`input__${campo}`)
      .classList.add("formulario-incorrecto");
    document
      .getElementById(`input__${campo}`)
      .classList.remove("formulario-correcto");
    document
      .querySelector(`#input__${campo} .formulario__error`)
      .classList.add("formulario__error-activo");
    campos[campo] = false;
  }
};

const inputsForm = document.querySelectorAll("#formulario input");
const formulario = document.getElementById("formulario");
inputsForm.forEach((input) => {
  input.addEventListener("keyup", validarCampos);
  input.addEventListener("blur", validarCampos);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
});
