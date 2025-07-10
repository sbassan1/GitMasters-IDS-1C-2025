const siteURL = "https://gitmasters-ids-1c-2025.onrender.com/"

// Función para obtener el ID del producto desde la URL
function obtenerIdProducto() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Función para construir URL de imagen de manera segura
function construirUrlImagen(rutaImagen) {
    if (!rutaImagen) return null;

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

// Función para cargar los datos del producto desde la API
async function cargarProducto() {
    const idProducto = obtenerIdProducto();

    if (!idProducto) {
        document.getElementById("nombre").textContent = "Producto no encontrado";
        document.getElementById("descripcion").textContent = "No se especificó un producto válido.";
        return;
    }

    try {
        const response = await fetch(siteURL + `api/v1/productos/id/${idProducto}`);

        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }

        const producto = await response.json();

        // Actualizar el contenido de la página
        document.getElementById("nombre").textContent = producto.nombre;
        document.getElementById("descripcion").textContent = producto.descripcion;
        document.getElementById("precio").textContent = producto.precio_venta.toLocaleString();
        document.getElementById("stock").textContent = producto.stock;

        // Actualizar la imagen si existe
        if (producto.imagen) {
            const imagenUrl = construirUrlImagen(producto.imagen);
            console.log('URL de imagen construida:', imagenUrl);

            // Verificar si la imagen existe antes de cargarla
            const imagenExiste = await verificarImagen(imagenUrl);

            if (imagenExiste) {
                document.getElementById("imagen-producto").src = imagenUrl;
                document.getElementById("imagen-producto").alt = producto.nombre;
            } else {
                console.warn('Imagen no encontrada:', imagenUrl);
                // Mantener la imagen placeholder si no se encuentra la imagen
            }
        }

        // Configurar el input de cantidad con el stock máximo
        const cantidadInput = document.getElementById('cantidadInput');
        cantidadInput.max = producto.stock;

        // Actualizar el enlace del botón "Añadir al carrito"
        const botonCarrito = document.querySelector('.btn-full-violet');
        botonCarrito.href = `#`; // Por ahora solo un placeholder

    } catch (error) {
        console.error('Error al cargar el producto:', error);
        document.getElementById("nombre").textContent = "Error al cargar producto";
        document.getElementById("descripcion").textContent = "No se pudo cargar la información del producto.";
    }
}

// Cargar el producto cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarProducto);

document.addEventListener('DOMContentLoaded', () => {
    const stock = parseInt(document.getElementById('stock').textContent);
    const input = document.getElementById('cantidadInput');
    input.max = stock;
});

function cambiarCantidad(delta) {
    const input = document.getElementById('cantidadInput');
    const min = parseInt(input.min);
    const max = parseInt(input.max);
    let valor = parseInt(input.value);

    valor = Math.min(max, Math.max(min, valor + delta));
    input.value = valor;
}