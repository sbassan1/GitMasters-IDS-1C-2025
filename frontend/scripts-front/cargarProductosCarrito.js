/**
 * Productos carrito tiene que ser un json que guarde los productos en el carrito
 * Tiene que tener la imagen del producto, 
 */

function cargarCarrito() {
    const productosCarrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const listaCarrito = document.querySelector(".carrito-lista");

    listaCarrito.innerHTML = "";

    if (productosCarrito.length === 0) {
        listaCarrito.innerHTML = `
            <li class="list-group-item d-flex justify-content-between p-4 align-items-center producto-carrito">
                No hay productos en el carrito de compras.
            </li>
        `;
    } else {
        productosCarrito.forEach((producto, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between p-4 align-items-center producto-carrito";
            
            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${producto.imagen || '../../images/ejemplo.png'}" alt="Producto" class="img-thumbnail me-3" style="width: 80px; height: 80px; object-fit: cover;">
                    <div>
                        <h6 class="mb-1">${producto.nombre}</h6>
                        <small class="text-muted">Cantidad: ${producto.cantidad}</small>
                    </div>
                </div>
                <button class="btn btn-sm btn-danger eliminar-producto" data-index="${index}">
                    <i class="bi bi-trash"></i>
                </button>
            `;

            listaCarrito.appendChild(li);
        });

        // Agregar event listeners a todos los botones de eliminar
        const botonesEliminar = document.querySelectorAll(".eliminar-producto");

        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                productosCarrito.splice(index, 1); // eliminar producto
                sessionStorage.setItem("carrito", JSON.stringify(productosCarrito));
                cargarCarrito(); // recargar lista
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
});