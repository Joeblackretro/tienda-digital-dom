// Arreglo principal de productos disponibles en la tienda.
// Cada producto está representado como un objeto con propiedades y métodos.
const productos = [
    {
        id: 1,
        nombre: "Notebook Lenovo IdeaPad",
        categoria: "tecnologia",
        precio: 450000,
        stock: 5,
        descuento: 10,
        mostrarInformacion: function() {
            return `${this.nombre} - Precio: $${this.precio}`;
        },
        aplicarDescuento: function() {
            return this.precio - (this.precio * this.descuento / 100);
        },
        validarStock: function() {
            return this.stock > 0;
        },
        descontarStock: function() {
            if (this.stock > 0) {
                this.stock = this.stock - 1;
            }
        }
    },
    {
        id: 2,
        nombre: "Audífonos Bluetooth",
        categoria: "accesorios",
        precio: 35000,
        stock: 12,
        descuento: 15,
        mostrarInformacion: function() {
            return `${this.nombre} - Precio: $${this.precio}`;
        },
        aplicarDescuento: function() {
            return this.precio - (this.precio * this.descuento / 100);
        },
        validarStock: function() {
            return this.stock > 0;
        },
        descontarStock: function() {
            if (this.stock > 0) {
                this.stock = this.stock - 1;
            }
        }
    },
    {
        id: 3,
        nombre: "Cafetera eléctrica",
        categoria: "hogar",
        precio: 60000,
        stock: 8,
        descuento: 5,
        mostrarInformacion: function() {
            return `${this.nombre} - Precio: $${this.precio}`;
        },
        aplicarDescuento: function() {
            return this.precio - (this.precio * this.descuento / 100);
        },
        validarStock: function() {
            return this.stock > 0;
        },
        descontarStock: function() {
            if (this.stock > 0) {
                this.stock = this.stock - 1;
            }
        }
    },
    {
        id: 4,
        nombre: "Mouse inalámbrico",
        categoria: "tecnologia",
        precio: 18000,
        stock: 20,
        descuento: 0,
        mostrarInformacion: function() {
            return `${this.nombre} - Precio: $${this.precio}`;
        },
        aplicarDescuento: function() {
            return this.precio - (this.precio * this.descuento / 100);
        },
        validarStock: function() {
            return this.stock > 0;
        },
        descontarStock: function() {
            if (this.stock > 0) {
                this.stock = this.stock - 1;
            }
        }
    }
];

// Carrito de compras.
let carrito = [];

// Selección de elementos del DOM.
const inputBusqueda = document.getElementById("product-search");
const filtroCategoria = document.getElementById("category-filter");
const botonBuscar = document.getElementById("btn-buscar");
const contenedorResultados = document.getElementById("results-container");

const listaCarrito = document.getElementById("lista-carrito");
const estadoCarrito = document.getElementById("estado-carrito");
const totalCarrito = document.getElementById("total-carrito");

const botonPromocion = document.getElementById("btn-promocion");
const notificacionPromocion = document.getElementById("notificacion-promocion");

const botonSeguimiento = document.getElementById("btn-seguimiento");
const estadoPedido = document.getElementById("estado-pedido");

// Función que muestra productos en la página.
function mostrarProductos(listaProductos) {
    contenedorResultados.innerHTML = "";

    if (listaProductos.length === 0) {
        contenedorResultados.innerHTML = "<p>No se encontraron productos asociados a la búsqueda.</p>";
        return;
    }

    listaProductos.forEach(function(producto) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("producto");

        let textoBoton = "Agregar al carrito";
        let botonDeshabilitado = "";

        if (producto.stock === 0) {
            textoBoton = "Sin stock";
            botonDeshabilitado = "disabled";
        }

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p class="precio"><strong>Precio normal:</strong> $${producto.precio}</p>
            <p class="descuento"><strong>Descuento:</strong> ${producto.descuento}%</p>
            <p><strong>Precio final:</strong> $${producto.aplicarDescuento()}</p>
            <p><strong>Stock disponible:</strong> ${producto.stock}</p>
            <button onclick="agregarAlCarrito(${producto.id})" ${botonDeshabilitado}>${textoBoton}</button>
        `;

        contenedorResultados.appendChild(tarjeta);
    });
}

// Función para buscar y filtrar productos.
function buscarProductos() {
    const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
    const categoriaSeleccionada = filtroCategoria.value;

    const productosFiltrados = productos.filter(function(producto) {
        const coincideNombre = producto.nombre.toLowerCase().includes(textoBusqueda);
        const coincideCategoria = categoriaSeleccionada === "todos" || producto.categoria === categoriaSeleccionada;

        return coincideNombre && coincideCategoria;
    });

    mostrarProductos(productosFiltrados);
}

// Función para agregar productos al carrito.
function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(function(producto) {
        return producto.id === idProducto;
    });

    if (!productoSeleccionado.validarStock()) {
        alert("El producto no tiene stock disponible.");
        return;
    }

    carrito.push(productoSeleccionado);

    // Se descuenta una unidad del stock disponible.
    productoSeleccionado.descontarStock();

    // Se actualiza el carrito.
    actualizarCarrito();

    // Se vuelve a mostrar la lista de productos para reflejar el nuevo stock.
    buscarProductos();
}

// Función para actualizar el estado del carrito.
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        estadoCarrito.textContent = "El carrito está vacío.";
        totalCarrito.textContent = "Total: $0";
        return;
    }

    estadoCarrito.textContent = `Productos en el carrito: ${carrito.length}`;

    let total = 0;

    carrito.forEach(function(producto) {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.aplicarDescuento()}`;
        listaCarrito.appendChild(item);

        total += producto.aplicarDescuento();
    });

    totalCarrito.textContent = `Total: $${total}`;
}

// Evento click para buscar productos.
botonBuscar.addEventListener("click", function() {
    buscarProductos();
});

// Evento input para actualizar la búsqueda mientras el usuario escribe.
inputBusqueda.addEventListener("input", function() {
    buscarProductos();
});

// Evento change para filtrar productos al cambiar la categoría.
filtroCategoria.addEventListener("change", function() {
    buscarProductos();
});

// Evento click para mostrar promoción instantánea.
botonPromocion.addEventListener("click", function() {
    notificacionPromocion.textContent = "Promoción activa: productos seleccionados con hasta 15% de descuento.";
    notificacionPromocion.classList.add("notificacion-activa");
});

// Evento click para consultar seguimiento del pedido.
botonSeguimiento.addEventListener("click", function() {
    if (carrito.length === 0) {
        estadoPedido.textContent = "No se puede consultar seguimiento porque el carrito está vacío.";
    } else {
        estadoPedido.textContent = "Estado del pedido: preparado para despacho.";
    }
});

// Carga inicial de productos al abrir la página.
mostrarProductos(productos);
