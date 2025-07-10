const container = document.querySelector('.ventas-lista');

async function cargarProductos() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/ventas/');
        if (!response.ok) throw new Error('Error al cargar ventas');

        const todasLasVentas = await response.json();
        await cargarVentasProductos(todasLasVentas);

    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

async function cargarVentasProductos(ventas) {
    
    for (const venta of ventas) {
        try {

            const usuarioResponse = await fetch(`http://localhost:3000/api/v1/usuarios/id/${encodeURIComponent(venta.id_usuario)}`);
            const usuario = await usuarioResponse.json();

            const ventaProductosResponse = await fetch(`http://localhost:3000/api/v1/ventas_productos/id_venta/${venta.id}`);
            const ventaProductos = await ventaProductosResponse.json();

            for (const ventaProducto of ventaProductos) {
                const productoResponse = await fetch(`http://localhost:3000/api/v1/productos/id/${encodeURIComponent(ventaProducto.id_producto)}`);
                const producto = await productoResponse.json();

                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between p-4 align-items-center producto-venta";

                li.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div>
                            <h6 class="mb-1">${producto.nombre}</h6>
                            <small class="text-muted d-block mb-1">Id venta: ${venta.id}</small>
                            <small class="text-muted d-block mb-1">Cantidad: ${ventaProducto.cantidad}</small>
                            <small class="text-muted d-block mb-1">Precio: ${producto.precio_venta}</small>
                            <small class="text-muted d-block">Comprador: ${usuario.nombre}</small>
                        </div>
                    </div>
                `;
                container.appendChild(li);
            }

        } catch (error) {
            console.log("Hubo un error intentando conseguir las ventas");
            console.error('Error al cargar productos:', error);
        }
    }
}

cargarProductos();
