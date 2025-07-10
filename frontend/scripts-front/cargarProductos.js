const siteURL = "https://gitmasters-ids-1c-2025.onrender.com/"


// Variables globales
let todosLosProductos = [];
let productosFiltrados = [];

// Función para construir URL de imagen de manera segura
function construirUrlImagen(rutaImagen) {
    if (!rutaImagen) return '/placeholder.svg?height=225&width=100%';

    // Remover "backend/src/" del path
    const imagenPath = rutaImagen.replace('backend/src/', '');

    // Dividir la ruta en partes para codificar cada parte por separado
    const partesRuta = imagenPath.split('/');
    const rutaCodificada = partesRuta.map(parte => encodeURIComponent(parte)).join('/');

    return siteURL + `${rutaCodificada}`;
}

// Función para verificar si una imagen existe
async function verificarImagen(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Función para crear una tarjeta de producto
async function crearTarjetaProducto(producto) {
    const imagenUrl = construirUrlImagen(producto.imagen);
    const imagenExiste = await verificarImagen(imagenUrl);
    const imagenFinal = imagenExiste ? imagenUrl : '/placeholder.svg?height=225&width=100%';

    return `
        <div class="col" data-tipo="${producto.tipo}">
            <div class="card light-prod-box h-100">
                <img src="${imagenFinal}" 
                     class="card-img-top" 
                     alt="${producto.nombre}"
                     style="height: 225px; object-fit: cover;"
                     onerror="this.src='/placeholder.svg?height=225&width=100%'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">${producto.descripcion}</p>
                    <p class="card-text"><strong>$${producto.precio_venta.toLocaleString()}</strong></p>
                    <p class="card-text">
                        <small class="text-body-secondary">Stock: ${producto.stock}</small>
                    </p>
                    <div class="d-flex justify-content-center align-items-center mt-auto">
                        <div class="btn-group">
                            <a href="producto_user.html?id=${producto.id}" class="btn btn-full-violet">Ver Producto</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para cargar todos los productos desde la API
async function cargarProductos() {
    const container = document.getElementById('productos-container');

    try {
        const response = await fetch(siteURL + 'api/v1/productos/');

        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }

        todosLosProductos = await response.json();
        productosFiltrados = [...todosLosProductos];

        await mostrarProductos(productosFiltrados);

    } catch (error) {
        console.error('Error al cargar productos:', error);
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Error al cargar productos</h4>
                    <p>No se pudieron cargar los productos. Por favor, intenta nuevamente más tarde.</p>
                    <button class="btn btn-outline-danger" onclick="cargarProductos()">Reintentar</button>
                </div>
            </div>
        `;
    }
}

// Función para mostrar productos en el contenedor
async function mostrarProductos(productos) {
    const container = document.getElementById('productos-container');

    if (productos.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info" role="alert">
                    <h4 class="alert-heading">No hay productos</h4>
                    <p>No se encontraron productos en esta categoría.</p>
                </div>
            </div>
        `;
        return;
    }

    // Crear las tarjetas de productos
    const tarjetasPromises = productos.map(producto => crearTarjetaProducto(producto));
    const tarjetas = await Promise.all(tarjetasPromises);

    container.innerHTML = tarjetas.join('');
}

// Función para filtrar productos por tipo
function filtrarProductos(tipo) {
    // Actualizar botones activos
    const botones = document.querySelectorAll('.btn-group .btn');
    botones.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (tipo === 'todos') {
        productosFiltrados = [...todosLosProductos];
    } else {
        productosFiltrados = todosLosProductos.filter(producto =>
            producto.tipo.toLowerCase() === tipo.toLowerCase()
        );
    }

    mostrarProductos(productosFiltrados);
}

// Función para buscar productos (opcional, para futuras mejoras)
function buscarProductos(termino) {
    const terminoLower = termino.toLowerCase();
    productosFiltrados = todosLosProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(terminoLower) ||
        producto.descripcion.toLowerCase().includes(terminoLower)
    );

    mostrarProductos(productosFiltrados);
}

// Cargar productos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

    // Marcar el botón "Todos" como activo por defecto
    const botonTodos = document.querySelector('button[onclick="filtrarProductos(\'todos\')"]');
    if (botonTodos) {
        botonTodos.classList.add('active');
    }
});