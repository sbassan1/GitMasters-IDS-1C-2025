const locationList = document.querySelector(".location-list")
const mapIframe = document.querySelector(".map-container iframe")
const nuevaSedeForm = document.getElementById("nuevaSedeForm")
const crearSedeBtn = document.getElementById("crearSedeBtn")
const bootstrap = window.bootstrap
  
function obtenerDiasSeleccionados(tipo = "abiertos") {
    let prefijo;
  
    if (tipo === "abiertos") {
        prefijo = "dia";
    } else {
        prefijo = "restock";
    }
  
    const checkboxesMarcados = document.querySelectorAll(`input[id^="${prefijo}"]:checked`);
    const valoresSeleccionados = [];
  
    for (const checkbox of checkboxesMarcados) {
        valoresSeleccionados.push(checkbox.value);
    }
  
    return valoresSeleccionados;
}
  
function formatearDiasSeleccionados(dias, campo) {
    if (dias.length === 0) {
        return "";
    }
  
    const diasOrdenados = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];
    const diasSeleccionados = dias.sort((a, b) => diasOrdenados.indexOf(a) - diasOrdenados.indexOf(b));
  
    if (JSON.stringify(diasSeleccionados) === JSON.stringify(["LUN", "MAR", "MIE", "JUE", "VIE"])) {
        return "LUN-VIE";
    }
  
    if (JSON.stringify(diasSeleccionados) === JSON.stringify(["LUN", "MAR", "MIE", "JUE", "VIE", "SAB"])) {
        return "LUN-SAB";
    }
  
    if (diasSeleccionados.length === 7) {
        return "LUN-DOM";
    }

    if (campo === "diasAbierto") {
        return diasSeleccionados.join("-");
    }
      
    if (campo === "diasRestock") {
        return diasSeleccionados.join(",");
    }
}

function limpiarErroresSede() {
    const campos = ["sedeTelefono", "sedeHorarios", "sedeDiasAbiertos", "sedeDiasRestock"]
    campos.forEach((campo) => {
        const input = document.getElementById(campo)
        const errorDiv = document.getElementById(campo + "Error")
        if (input) input.classList.remove("is-invalid")
        if (errorDiv) errorDiv.textContent = ""
    })
}
  
function mostrarErrorSede(campo, mensaje) {
    const errorDiv = document.getElementById(campo + "Error")
    if (errorDiv) {
        errorDiv.textContent = mensaje
        errorDiv.style.display = "block"
    }
}
  
function validarFormularioSede(formData) {
    let esValido = true;

    const telefonoRegex = /^(11|15)-\d{4}-\d{4}$/;
    if (!telefonoRegex.test(formData.telefono)) {
        mostrarErrorSede("sedeTelefono", "El formato del teléfono es incorrecto. Debe ser '11-xxxx-xxxx' o '15-xxxx-xxxx'");
        document.getElementById("sedeTelefono").classList.add("is-invalid");
        esValido = false;
    }
  
    const horarioRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!horarioRegex.test(formData.horarios)) {
        mostrarErrorSede("sedeHorarios", "Formato inválido. Usar HH:MM-HH:MM (ej: 08:00-18:00)");
        document.getElementById("sedeHorarios").classList.add("is-invalid");
        esValido = false;
    }
  
    if (!formData.dias_abiertos || formData.dias_abiertos === "") {
        mostrarErrorSede("sedeDiasAbiertos", "Selecciona al menos un día");
        esValido = false;
    }

    if (!formData.dias_restock || formData.dias_restock === "") {
        mostrarErrorSede("sedeDiasRestock", "Selecciona al menos un día");
        esValido = false;
    }
  
    return esValido;
}
  
async function crearNuevaSede(sedeData) {
    try {
        const res = await fetch("http://localhost:3000/api/v1/sedes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sedeData),
        })
  
        const data = await res.json();
  
        if (res.ok) {
            mostrarMensajeSede("Sede creada exitosamente", "success");
            nuevaSedeForm.reset();
  
            setTimeout(() => {
                cargarSedes()
                bootstrap.Modal.getInstance(document.getElementById("nuevaSedeModal")).hide()
            }, 1500)
        } else {
            let mensajeError = "Error al crear la sede";
  
            if (data.message) {
                mensajeError = data.message;
            } else if (data.error) {
                mensajeError = data.error;
            }
  
            mostrarMensajeSede(mensajeError, "danger");
        }
    } catch (error) {
        console.error(error)
        mostrarMensajeSede("Ha ocurrido un error. Inténtelo de nuevo más tarde", "danger")
    }
}

nuevaSedeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarErroresSede();
  
    const diasAbiertos = obtenerDiasSeleccionados("abiertos");
    const diasRestock = obtenerDiasSeleccionados("restock");
  
    const formData = {
        nombre: document.getElementById("sedeNombre").value.trim(),
        telefono: document.getElementById("sedeTelefono").value.trim(),
        direccion: document.getElementById("sedeDireccion").value.trim(),
        horarios: document.getElementById("sedeHorarios").value.trim(),
        dias_abiertos: formatearDiasSeleccionados(diasAbiertos, "diasAbierto"),
        dias_restock: formatearDiasSeleccionados(diasRestock, "diasRestock"),
    }
  
    console.log(formData);
  
    if (!validarFormularioSede(formData)) {
        return;
    }
  
    crearSedeBtn.disabled = true;
  
    try {
        await crearNuevaSede(formData)
    } finally {
        crearSedeBtn.disabled = false
    }
})
  
// limpiar formulario
document.getElementById("nuevaSedeModal").addEventListener("show.bs.modal", () => {
    nuevaSedeForm.reset();
    limpiarErroresSede();
})
  
  
function mostrarError(mensaje) {
    locationList.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <strong>Error:</strong> ${mensaje}
        </div>
    `
}

function crearTarjetaSede(sede) {  
    return `
        <div class="location-card">
            <h5>${sede.nombre}</h5>
            <p><i class="bi bi-geo-alt"></i> ${sede.direccion}</p>
            <p><i class="bi bi-telephone"></i>${sede.telefono}</p>
            <p><i class="bi bi-clock"></i>${sede.horarios}</p>
            <p><i class="bi bi-calendar-check"></i> ${sede.dias_abiertos}</p>
            <p class="text-muted small"><i class="bi bi-box-seam"></i> Restock: ${sede.dias_restock}</p>
    
            <button class="btn btn-primary btn-sm" onclick="verEnMapa('${sede.nombre}', '${sede.direccion}')">
                <i class="bi bi-geo-alt me-1"></i>Ver en mapa
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

window.verEnMapa = (direccion) => {
    console.log(direccion);
    if (!direccion) {
        alert("Dirección no disponible");
        return;
    }

    actualizarMapa(direccion);
}

cargarSedes();