const boton = document.getElementById('btn-comprar-carrito');
const productosCarrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
const usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));
const eleccionPago = document.getElementById('forma-pago');
const mensajeDiv = document.getElementById('mensaje');


const today = new Date();
const day = String(today.getDate()).padStart(2, '0');       // 01 a 31
const month = String(today.getMonth() + 1).padStart(2, '0'); // 01 a 12
const year = today.getFullYear();                            // 2025
const fechaHoy = `${year}-${month}-${day}`;

const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const botonCupon = document.getElementById("validarCupon");

function mostrarMensaje(mensaje, tipo) {
    mensajeDiv.className = `alert alert-${tipo}`;
    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.remove("d-none");
}

async function comprarCarrito() {

    boton.addEventListener("click", async () => {

        if (!usuario) {
            mostrarMensaje("Error: No ha iniciado sesión", "danger");
            return;
        }

        const id_usuario = usuario.id;

        const id_venta = await crearVenta({
            valor: 0,
            fecha: fechaHoy,
            id_usuario: id_usuario,
            metodo_pago: eleccionPago.value
        });

        if (!id_venta) {
            mostrarMensaje("No se pudo completar la venta", "danger");
            return;
        }

        for (const producto of productosCarrito) {
            await crearVentaProducto({
                id_venta: id_venta,
                id_producto: producto.id,
                cantidad: producto.cantidad
            });
        }
    });

}


async function crearVentaProducto(dataProductoCesta) {
    try{
        const res = await fetch("http://localhost:3000/api/v1/ventas_productos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataProductoCesta),
        });

        if (res.ok) {
            console.log("Compra agregada a historial")
        } else {

            let mensajeError = "Error al crear la venta de producto"

            mostrarMensaje(mensajeError, "danger");

        }
    } catch(error) {
        console.log(error);
        mostrarMensaje("Ha ocurrido un error. Inténtalo de nuevo más tarde", "danger");
    }
    
}


/**
 * @param {*} dataVenta, un json con valor 0, la fecha actual, el id del usuario y el metodo pago "Efectivo por default" 
 */
async function crearVenta(dataVenta) {
    try{
        const res = await fetch("http://localhost:3000/api/v1/ventas/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataVenta),
        });

        const venta = await res.json()
        const id_venta = venta["id"];

        if (res.ok) {
            mostrarMensaje("Compra exitosa! Disfruta de su producto", "success");
            return id_venta;
        } else {

            let mensajeError = "Error al crear la venta"

            if (data.message) {
                mensajeError = data.message
            } else if (data.error) {
                mensajeError = data.error;
            }

            mostrarMensaje(mensajeError, "danger");

        }
    } catch(error) {
        console.log(error);
        mostrarMensaje("Ha ocurrido un error. Inténtalo de nuevo más tarde", "danger");
    }
}

function getProductosCarrito() {
    return JSON.parse(sessionStorage.getItem("carrito")) || [];
}

document.addEventListener('click', function(event) {
    if (event.target.closest('.eliminar-producto')) {
        calcularSubtotal();
    }
});

botonCupon.addEventListener("click", () => {
    validarCupon();
});

function validarCupon() {
    const codigoCupon = document.getElementById("cupon").value;
  
    if (codigoCupon === "APROBADOS10" || codigoCupon === "aprobados10" || codigoCupon === "Aprobados10") {
        cuponValido = true;
        mostrarMensaje("Cupón válido! 10% de descuento aplicado", "success");
        calcularTotal();
    } else {
        cuponValido = false;
        mostrarMensaje("Cupón inválido", "danger");
        calcularTotal();
    }
}

function calcularTotal() {
    total = subtotal;
    const codigoCupon = document.getElementById("cupon").value;
  
    if (codigoCupon === "Aprobados10" || codigoCupon === "APROBADOS10" || codigoCupon === "aprobados10") {
        descuentoAplicado = subtotal * 0.1;
        total = subtotal - descuentoAplicado;
    } else {
        descuentoAplicado = 0;
    }
  
    actualizarValor(total, subtotal);
}

function calcularSubtotal() {
    subtotal = 0;

    console.log(getProductosCarrito())

    getProductosCarrito().forEach(producto => {
        const precioNumber = Number(producto.precio.replace(/,/g, ''));
        subtotal += precioNumber * producto.cantidad;
    });

    calcularTotal();
    actualizarValor(subtotal, subtotal);
}
  
function actualizarValor(total, subtotal) {
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`;
    }
    
      if (totalElement) {
        totalElement.textContent = `$${total.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`;
    }
}

calcularSubtotal();
comprarCarrito();