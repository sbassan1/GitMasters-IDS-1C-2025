const locationList = document.querySelector(".location-list");

// mostrar error
function mostrarError(mensaje) {
    locationList.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <strong>Error:</strong> ${mensaje}
        </div>
    `
}

//  crear una tarjeta de sede
function crearTarjetaSede(sede) {  
    return `
        <div class="location-card">
            <h5>${sede.nombre}</h5>
            <p><i class="bi bi-geo-alt"></i> ${sede.direccion}</p>
            <p><i class="bi bi-telephone"></i>${sede.telefono}</p>
            <p><i class="bi bi-clock"></i>${sede.horarios}</p>
            <p><i class="bi bi-calendar-check"></i> ${sede.dias_abiertos}</p>
            <p class="text-muted small"><i class="bi bi-box-seam"></i> Restock: ${sede.dias_restock}</p>
            <button class="btn btn-location btn-sm">
                Ver en mapa
            </button>
        </div>
    `
}
  
// cargar sedes desde api
async function cargarSedes() {
    try {  
        const res = await fetch("http://localhost:3000/api/v1/sedes/");
        const sedes = await res.json();

        if (!res.ok) {
            console.log(res);
        }
  
        if (!sedes || sedes.length === 0) {
            locationList.innerHTML = `
                <div class="alert alert-info" role="alert">
                    <i class="bi bi-info-circle me-2"></i>
                    No hay sucursales disponibles en este momento.
                </div>
            `
            return;
        }
  
        // html para todas las sedes
        const sedesHTML = sedes.map((sede) => crearTarjetaSede(sede)).join("");
        locationList.innerHTML = sedesHTML;
  
        console.log(sedes.length) // cantidad de sedes cargadas
    } catch (error) {
        console.error(error);
        let mensajeError = "No se pudieron cargar las sucursales";
        mostrarError(mensajeError);
    }
}

cargarSedes();