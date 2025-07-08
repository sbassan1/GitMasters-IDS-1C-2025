// Variables globales
let todasLasSedes = []

// Elementos del DOM
const sucursalesContainer = document.getElementById("sucursales-container")

// Cargar sedes cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  cargarSedes()
})

// Función para mostrar error
function mostrarError(mensaje) {
  sucursalesContainer.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger text-center" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                <strong>Error:</strong> ${mensaje}
                <div class="mt-3">
                    <button class="btn btn-outline-danger" onclick="cargarSedes()">
                        <i class="bi bi-arrow-clockwise me-1"></i>Reintentar
                    </button>
                </div>
            </div>
        </div>
    `
}

// Función para mostrar estado de carga
function mostrarCargando() {
  sucursalesContainer.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando sucursales...</span>
            </div>
            <p class="mt-2">Cargando sucursales...</p>
        </div>
    `
}

// Función para generar URL de Google Maps
function generarUrlGoogleMaps(direccion, nombre) {
  // Codificar la dirección para URL
  const direccionCodificada = encodeURIComponent(`${nombre}, ${direccion}`)
  return `https://www.google.com/maps/search/?api=1&query=${direccionCodificada}`
}

// Función para abrir Google Maps en nueva pestaña
function abrirEnGoogleMaps(direccion, nombre) {
  const url = generarUrlGoogleMaps(direccion, nombre)
  window.open(url, "_blank")
}

// Función para formatear días de la semana
function formatearDias(dias) {
  const diasMap = {
    LUN: "Lun",
    MAR: "Mar",
    MIE: "Mié",
    JUE: "Jue",
    VIE: "Vie",
    SAB: "Sáb",
    DOM: "Dom",
  }

  return dias
    .split("-")
    .map((dia) => diasMap[dia] || dia)
    .join(" - ")
}

// Función para formatear días de restock
function formatearDiasRestock(dias) {
  const diasMap = {
    LUN: "Lunes",
    MAR: "Martes",
    MIE: "Miércoles",
    JUE: "Jueves",
    VIE: "Viernes",
    SAB: "Sábado",
    DOM: "Domingo",
  }

  return dias
    .split(",")
    .map((dia) => diasMap[dia.trim()] || dia.trim())
    .join(", ")
}

// Función para determinar el estado de la sucursal
function obtenerEstadoSucursal(horarios) {
  const ahora = new Date()
  const horaActual = ahora.getHours()
  const minutosActuales = ahora.getMinutes()
  const tiempoActual = horaActual * 60 + minutosActuales

  // Parsear horarios (formato: "08:00-18:00")
  const [apertura, cierre] = horarios.split("-")
  const [horaApertura, minutoApertura] = apertura.split(":").map(Number)
  const [horaCierre, minutoCierre] = cierre.split(":").map(Number)

  const tiempoApertura = horaApertura * 60 + minutoApertura
  const tiempoCierre = horaCierre * 60 + minutoCierre

  if (tiempoActual >= tiempoApertura && tiempoActual <= tiempoCierre) {
    return { estado: "abierto", clase: "success", icono: "check-circle-fill" }
  } else {
    return { estado: "cerrado", clase: "danger", icono: "x-circle-fill" }
  }
}

// Función para crear una tarjeta de sede
function crearTarjetaSede(sede) {
  const estadoInfo = obtenerEstadoSucursal(sede.horarios)
  const diasFormateados = formatearDias(sede.dias_abiertos)
  const restockFormateado = formatearDiasRestock(sede.dias_restock)

  return `
        <div class="col-lg-6 col-xl-4 mb-4">
            <div class="card light-prod-box h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">
                        <i class="bi bi-shop me-2 text-primary"></i>
                        ${sede.nombre}
                    </h5>
                    <span class="badge bg-${estadoInfo.clase}">
                        <i class="bi bi-${estadoInfo.icono} me-1"></i>
                        ${estadoInfo.estado.charAt(0).toUpperCase() + estadoInfo.estado.slice(1)}
                    </span>
                </div>
                
                <div class="card-body">
                    <!-- Dirección -->
                    <div class="mb-3">
                        <div class="d-flex align-items-start">
                            <i class="bi bi-geo-alt text-primary me-2 mt-1"></i>
                            <div>
                                <strong>Dirección</strong>
                                <p class="mb-0 text-muted">${sede.direccion}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Teléfono -->
                    <div class="mb-3">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-telephone text-primary me-2"></i>
                            <div>
                                <strong>Teléfono</strong>
                                <p class="mb-0">
                                    <a href="tel:${sede.telefono.replace(/\s/g, "")}" class="text-decoration-none">
                                        ${sede.telefono}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Horarios -->
                    <div class="mb-3">
                        <div class="d-flex align-items-start">
                            <i class="bi bi-clock text-primary me-2 mt-1"></i>
                            <div class="w-100">
                                <strong>Horarios</strong>
                                <p class="mb-1">${sede.horarios}</p>
                                <small class="text-muted">${diasFormateados}</small>
                            </div>
                        </div>
                    </div>

                    <!-- Restock -->
                    <div class="mb-4">
                        <div class="d-flex align-items-start">
                            <i class="bi bi-box-seam text-primary me-2 mt-1"></i>
                            <div>
                                <strong>Restock</strong>
                                <p class="mb-0 text-muted small">${restockFormateado}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Acciones -->
                <div class="card-footer bg-transparent">
                    <div class="d-grid gap-2">
                        <button class="btn btn-full-violet" onclick="abrirEnGoogleMaps('${sede.direccion}', '${sede.nombre}')">
                            <i class="bi bi-map me-2"></i>Ver en Google Maps
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}

// Función para mostrar sucursales
function mostrarSucursales(sedes) {
  if (sedes.length === 0) {
    sucursalesContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center" role="alert">
                    <i class="bi bi-info-circle me-2"></i>
                    No hay sucursales disponibles en este momento.
                </div>
            </div>
        `
    return
  }

  const tarjetas = sedes.map((sede) => crearTarjetaSede(sede))
  sucursalesContainer.innerHTML = tarjetas.join("")
}

// Función principal para cargar sedes desde la API
async function cargarSedes() {
  try {
    mostrarCargando()

    const response = await fetch("http://localhost:3000/api/v1/sedes/")

    if (!response.ok) {
      throw new Error("Error al cargar sucursales")
    }

    const sedes = await response.json()

    if (!sedes || sedes.length === 0) {
      sucursalesContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center" role="alert">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        No hay sucursales disponibles en este momento.
                    </div>
                </div>
            `
      return
    }

    todasLasSedes = sedes
    mostrarSucursales(sedes)

    console.log(`${sedes.length} sucursales cargadas exitosamente`)
  } catch (error) {
    console.error("Error al cargar sedes:", error)
    mostrarError("No se pudieron cargar las sucursales. Verifica tu conexión e intenta nuevamente.")
  }
}
