const locationList = document.querySelector(".location-list");
const mapIframe = document.querySelector(".map-container iframe");
const nuevaSedeForm = document.getElementById("nuevaSedeForm");
const crearSedeBtn = document.getElementById("crearSedeBtn");
const bootstrap = window.bootstrap;

// variables para edicion
let modoEdicion = false;
let sedeEditandoId = null;
const sedeMessage = document.getElementById("sedeMessage")
const modalTitle = document.getElementById("nuevaSedeModalLabel");

// edicion
function cargarDatosEnModal(sede) {
    document.getElementById("sedeNombre").value = sede.nombre;
    document.getElementById("sedeTelefono").value = sede.telefono;
    document.getElementById("sedeDireccion").value = sede.direccion;
    document.getElementById("sedeHorarios").value = sede.horarios;
  
    limpiarTodosLosCheckboxes();

    marcarDiasEnCheckboxes(sede.dias_abiertos, "abiertos");
    marcarDiasEnCheckboxes(sede.dias_restock, "restock");

    setTimeout(() => {
        controlarLimiteRestock();
    }, 100)
}

function marcarDiasEnCheckboxes(diasString, tipo) {
    console.log(diasString, tipo)
    const prefijo = tipo === "abiertos" ? "dia" : "restock";
    let diasArray = [];
  
    if (diasString.includes("LUN-VIE")) {
        diasArray = ["LUN", "MAR", "MIE", "JUE", "VIE"];
    } else if (diasString.includes("LUN-SAB")) {
        diasArray = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
    } else if (diasString.includes("LUN-DOM")) {
        diasArray = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];
    } else {
        diasArray = diasString.split(/[,-]/).map((d) => d.trim())
    }
  
    diasArray.forEach((dia) => {
        const checkbox = document.querySelector(`input[id^="${prefijo}"][value="${dia}"]`)
        if (checkbox) {
            checkbox.checked = true
        }
    })
}

window.editarSede = async (sedeId) => {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/sedes/id/${sedeId}`)
  
        if (!res.ok) {
            console.log(res);
        }
  
        const sede = await res.json();
  
        modoEdicion = true;
        sedeEditandoId = sedeId;

        if (modalTitle) {
            modalTitle.innerHTML = `Editar Sede: ${sede.nombre}`;
        }
        crearSedeBtn.innerHTML = 'Editar Sede';
        
        cargarDatosEnModal(sede);
  
        // abrir modal
        const modal = new bootstrap.Modal(document.getElementById("nuevaSedeModal"));
        modal.show();
    } catch (error) {
        console.error("error editar sede:", error)
    }
}

// controlar cantidad de dias restock seleccionados
function controlarLimiteRestock() {
    const maxSeleccion = 3;
    const checkboxesRestock = document.querySelectorAll('input[id^="restock"]');
    const seleccionados = document.querySelectorAll('input[id^="restock"]:checked');
  
    if (seleccionados.length >= maxSeleccion) {
        checkboxesRestock.forEach((checkbox) => {
            if (!checkbox.checked) {
                checkbox.disabled = true;
            }
        });
    } else {
        checkboxesRestock.forEach((checkbox) => {
            checkbox.disabled = false;
        })
    }
}

function inicializarControlRestock() {
    const checkboxesRestock = document.querySelectorAll('input[id^="restock"]')
  
    checkboxesRestock.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        controlarLimiteRestock()
      })
    })
  
    controlarLimiteRestock();
}

function limpiarTodosLosCheckboxes() {
    document.querySelectorAll('input[id^="dia"], input[id^="restock"]').forEach((cb) => {
        cb.checked = false;
        cb.disabled = false;
    })
}

// crear
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
    console.log(dias)

    if (campo === "diasAbierto") {
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
        await guardarSede(formData)
    } finally {
        crearSedeBtn.disabled = false
    }
})
  
// limpiar formulario
document.getElementById("nuevaSedeModal").addEventListener("show.bs.modal", () => {
    if (!modoEdicion) {
        nuevaSedeForm.reset();
        limpiarErroresSede();
        limpiarTodosLosCheckboxes();
  
        if (modalTitle) {
            modalTitle.innerHTML = 'Crear nueva sede'
        }
        crearSedeBtn.innerHTML = 'Crear sede';
    }

    setTimeout(() => {
        inicializarControlRestock();
    }, 100);
})
  
document.getElementById("nuevaSedeModal").addEventListener("hidden.bs.modal", () => {
    modoEdicion = false;
    sedeEditandoId = null;
});
  
  
function mostrarError(mensaje) {
    locationList.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <strong>Error:</strong> ${mensaje}
        </div>
    `
}

function crearTarjetaSede(sede) {  
    return `
        <div class="location-card" data-sede-id="${sede.id}">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="mb-0">${sede.nombre}</h5>
                <button class="btn btn-outline-primary btn-sm" onclick="editarSede('${sede.id}')" title="Editar sede">
                    <i class="bi bi-pencil"></i>
                </button>
            </div>
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

function mostrarMensajeSede(mensaje, tipo) {
    if (sedeMessage) {
        sedeMessage.className = `alert alert-${tipo}`
        sedeMessage.textContent = mensaje
        sedeMessage.classList.remove("d-none")
  
        setTimeout(() => {
            sedeMessage.classList.add("d-none")
        }, 2000)
    }
  }

async function guardarSede(sedeData) {
    try {
        // si mododEdicion es true, se hace un put con el id de la sede. sino, hace un post (creacion de sede)
        const url = modoEdicion ? `http://localhost:3000/api/v1/sedes/${sedeEditandoId}` : "http://localhost:3000/api/v1/sedes/";
        const method = modoEdicion ? "PUT" : "POST";
  
        const res = await fetch(url, {
            method: method,
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(sedeData),
        });

        const data = await res.json()
  
        if (res.ok) {
            const mensaje = modoEdicion ? "Sede editada exitosamente" : "Sede creada exitosamente";
            mostrarMensajeSede(mensaje, "success");
  
            setTimeout(() => {
                cargarSedes();
                nuevaSedeForm.reset();
                bootstrap.Modal.getInstance(document.getElementById("nuevaSedeModal")).hide();
            }, 1500);
        } else {
            let mensajeError =  modoEdicion ? "Error al edirtar la sede" : "Error al crear la sede";

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

// agregar pais y provincia a direccion
function prepararDireccion(direccion) {
    if (!direccion) {
        return "";
    }

    let direccionDetallada = direccion.trim();

    if (!direccionDetallada.toLowerCase().includes("argentina") && !direccionDetallada.toLowerCase().includes("buenos aires")) {
        direccionDetallada += ", Buenos Aires, Argentina";
    }

    return direccionDetallada;
}

function actualizarMapa(direccion) {
    const direccionDetallada = prepararDireccion(direccion);
    const direccionEncoded = encodeURIComponent(direccionDetallada);

    // crear url de maps con la direccion
    const mapSrc = `https://maps.google.com/maps?q=${direccionEncoded}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    mapIframe.src = mapSrc;

    console.log("direccion buscada:", direccionDetallada);
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