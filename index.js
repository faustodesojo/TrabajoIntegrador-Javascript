document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-menu");
  const navList = document.getElementById("navbarList");
  const listaCarrito = document.querySelector(".lista-carrito");
  const totalCarrito = document.querySelector(".total");
  const vaciarCarrito = document.getElementById("vaciar-carrito");
  const botonSiguiente = document.getElementById("boton-siguiente");
  const botonAnterior = document.getElementById("boton-anterior");
  const closeButton = document.querySelector(".close-button");
  const productosContainer = document.querySelector(".productos-container");
  const navbarLinks = document.querySelectorAll(".navbar-link a");
  const carritoToggle = document.querySelector(".cart");
  const carritoContainer = document.querySelector(".carrito");
  const agregarDescuento = document.querySelector(".descuento");
  const mensajeCarrito = document.getElementById("mensaje-carrito");

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
    closeCarrito();
  };

  const closeMenu = () => {
    navList.classList.remove("active");
  };

  const openCarrito = () => {
    carritoContainer.classList.add("open");
    closeMenu();
  };

  const closeCarrito = () => {
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
      closeCarrito();
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
        const imagen = target.dataset.img;
        agregarProductoAlCarrito(nombre, precio, imagen);
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