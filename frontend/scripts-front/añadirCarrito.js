
document.addEventListener('DOMContentLoaded', () => {
    const botonCompra = document.querySelector('.boton-compra');
    if (botonCompra) {
        botonCompra.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento por defecto del enlace
            añadirCarrito();
        });
    }
});

function obtenerIdProducto() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function añadirCarrito(){
    const nombreProducto = document.getElementById('nombre').textContent;
    const imagenProducto = document.getElementById('imagen-producto').getAttribute('src');
    const precioProducto = document.getElementById('precio').textContent;
    const cantidadProducto = parseInt(document.getElementById('cantidadInput').value,10);
    const stockProducto = parseInt(document.getElementById('stock').textContent,10);
    const idProducto = obtenerIdProducto();

    const producto = {
        nombre: nombreProducto,
        imagen: imagenProducto,
        precio: precioProducto,
        cantidad: cantidadProducto,
        stock: stockProducto,
        id: idProducto
    };


    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    const index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index !== -1) {
        if (carrito[index].cantidad + cantidadProducto > stockProducto) {
            alert('No hay suficiente stock disponible');
            return;
        }
        carrito[index].cantidad += cantidadProducto;
    } else {
        carrito.push(producto);
    }

    console.log(carrito);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto añadido al carrito');
}