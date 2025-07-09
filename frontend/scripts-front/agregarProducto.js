// Variables globales
let imagenSubida = null

// Elementos del DOM
const form = document.getElementById("agregarProductoForm")
const imagenInput = document.getElementById("imagen")
const imagenPreview = document.getElementById("imagenPreview")
const guardarBtn = document.getElementById("guardarBtn")
const guardarSpinner = document.getElementById("guardarSpinner")
const mensajeDiv = document.getElementById("mensaje")

// Cargar sedes al inicializar
document.addEventListener("DOMContentLoaded", async () => {
  await cargarSedes()
  configurarEventos()
})

// Cargar sedes desde la API
async function cargarSedes() {
  const sedeSelect = document.getElementById("sede")

  try {
    const response = await fetch("http://localhost:3000/api/v1/sedes/")

    if (!response.ok) {
      throw new Error("Error al cargar sedes")
    }

    const sedes = await response.json()

    // Limpiar opciones existentes
    sedeSelect.innerHTML = '<option value="" class="dark-prod-box">Seleccionar sede</option>'

    // Agregar sedes
    sedes.forEach((sede) => {
      const option = document.createElement("option")
      option.value = sede.id
      option.textContent = sede.nombre
      option.className = "dark-prod-box"
      sedeSelect.appendChild(option)
    })
  } catch (error) {
    console.error("Error al cargar sedes:", error)
    sedeSelect.innerHTML = '<option value="" class="dark-prod-box">Error al cargar sedes</option>'
    mostrarMensaje("Error al cargar las sedes disponibles", "warning")
  }
}

// Configurar eventos
function configurarEventos() {
  // Preview de imagen
  imagenInput.addEventListener("change", manejarCambioImagen)

  // Validación en tiempo real
  document.getElementById("nombre").addEventListener("input", validarNombre)
  document.getElementById("descripcion").addEventListener("input", validarDescripcion)
  document.getElementById("precio").addEventListener("input", validarPrecio)
  document.getElementById("stock").addEventListener("input", validarStock)

  // Envío del formulario
  form.addEventListener("submit", manejarEnvioFormulario)
}

// Manejar cambio de imagen
function manejarCambioImagen(event) {
  const file = event.target.files[0]

  if (!file) {
    imagenPreview.src = "/placeholder.svg?height=200&width=200"
    imagenSubida = null
    return
  }

  // Validar tipo de archivo
  if (!file.type.startsWith("image/")) {
    mostrarErrorCampo("imagen", "Solo se permiten archivos de imagen")
    imagenInput.value = ""
    return
  }

  // Validar tamaño (5MB)
  if (file.size > 5 * 1024 * 1024) {
    mostrarErrorCampo("imagen", "La imagen no puede superar los 5MB")
    imagenInput.value = ""
    return
  }

  // Mostrar preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagenPreview.src = e.target.result
  }
  reader.readAsDataURL(file)

  // Limpiar errores
  limpiarErrorCampo("imagen")
}

// Validaciones individuales
function validarNombre() {
  const nombre = document.getElementById("nombre").value.trim()

  if (nombre.length === 0) {
    mostrarErrorCampo("nombre", "El nombre es requerido")
    return false
  }

  if (nombre.length > 50) {
    mostrarErrorCampo("nombre", "El nombre no puede superar los 50 caracteres")
    return false
  }

  limpiarErrorCampo("nombre")
  return true
}

function validarDescripcion() {
  const descripcion = document.getElementById("descripcion").value.trim()

  if (descripcion.length === 0) {
    mostrarErrorCampo("descripcion", "La descripción es requerida")
    return false
  }

  if (descripcion.length > 60) {
    mostrarErrorCampo("descripcion", "La descripción no puede superar los 60 caracteres")
    return false
  }

  limpiarErrorCampo("descripcion")
  return true
}

function validarPrecio() {
  const precio = Number.parseFloat(document.getElementById("precio").value)

  if (isNaN(precio) || precio <= 0) {
    mostrarErrorCampo("precio", "El precio debe ser mayor a 0")
    return false
  }

  limpiarErrorCampo("precio")
  return true
}

function validarStock() {
  const stock = Number.parseInt(document.getElementById("stock").value)

  if (isNaN(stock) || stock < 0) {
    mostrarErrorCampo("stock", "El stock debe ser 0 o mayor")
    return false
  }

  limpiarErrorCampo("stock")
  return true
}

// Validar formulario completo
function validarFormulario() {
  let esValido = true

  // Validar campos individuales
  if (!validarNombre()) esValido = false
  if (!validarDescripcion()) esValido = false
  if (!validarPrecio()) esValido = false
  if (!validarStock()) esValido = false

  // Validar tipo
  const tipo = document.getElementById("tipo").value
  if (!tipo) {
    mostrarErrorCampo("tipo", "Selecciona un tipo de producto")
    esValido = false
  } else {
    limpiarErrorCampo("tipo")
  }

  // Validar sede
  const sede = document.getElementById("sede").value
  if (!sede) {
    mostrarErrorCampo("sede", "Selecciona una sede")
    esValido = false
  } else {
    limpiarErrorCampo("sede")
  }

  // Validar imagen
  if (!imagenInput.files[0]) {
    mostrarErrorCampo("imagen", "Selecciona una imagen para el producto")
    esValido = false
  } else {
    limpiarErrorCampo("imagen")
  }

  return esValido
}

// Subir imagen
async function subirImagen(archivo) {
  const formData = new FormData()
  formData.append("imagen", archivo)

  try {
    const response = await fetch("http://localhost:3000/api/v1/upload-imagen", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Error al subir imagen")
    }

    const resultado = await response.json()
    return resultado.rutaImagen
  } catch (error) {
    console.error("Error al subir imagen:", error)
    throw error
  }
}

// Crear producto
async function crearProducto(datosProducto) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/productos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosProducto),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Error al crear producto")
    }

    const producto = await response.json()
    return producto
  } catch (error) {
    console.error("Error al crear producto:", error)
    throw error
  }
}

// Manejar envío del formulario
async function manejarEnvioFormulario(event) {
  event.preventDefault()

  // Limpiar mensajes anteriores
  mensajeDiv.classList.add("d-none")

  // Validar formulario
  if (!validarFormulario()) {
    mostrarMensaje("Por favor, corrige los errores en el formulario", "danger")
    return
  }

  // Deshabilitar botón y mostrar spinner
  guardarBtn.disabled = true
  guardarSpinner.classList.remove("d-none")

  try {
    // 1. Subir imagen
    const archivoImagen = imagenInput.files[0]
    const rutaImagen = await subirImagen(archivoImagen)

    // 2. Preparar datos del producto
    const datosProducto = {
      nombre: document.getElementById("nombre").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      stock: Number.parseInt(document.getElementById("stock").value),
      precio_venta: Number.parseInt(document.getElementById("precio").value),
      tipo: document.getElementById("tipo").value,
      imagen: rutaImagen,
      sede_id: Number.parseInt(document.getElementById("sede").value),
    }

    // 3. Crear producto
    const producto = await crearProducto(datosProducto)

    // 4. Mostrar éxito
    mostrarMensaje("Producto creado exitosamente", "success")

    // 5. Limpiar formulario
    form.reset()
    imagenPreview.src = "/placeholder.svg?height=200&width=200"

    // 6. Redirigir después de un momento
    setTimeout(() => {
      window.location.href = "productos_admin.html"
    }, 2000)
  } catch (error) {
    console.error("Error:", error)
    mostrarMensaje(error.message || "Error al crear el producto", "danger")
  } finally {
    // Rehabilitar botón y ocultar spinner
    guardarBtn.disabled = false
    guardarSpinner.classList.add("d-none")
  }
}

// Funciones de utilidad para mostrar errores
function mostrarErrorCampo(campo, mensaje) {
  const input = document.getElementById(campo)
  const errorDiv = document.getElementById(campo + "Error")

  input.classList.add("is-invalid")
  if (errorDiv) {
    errorDiv.textContent = mensaje
  }
}

function limpiarErrorCampo(campo) {
  const input = document.getElementById(campo)
  const errorDiv = document.getElementById(campo + "Error")

  input.classList.remove("is-invalid")
  if (errorDiv) {
    errorDiv.textContent = ""
  }
}

function mostrarMensaje(mensaje, tipo) {
  mensajeDiv.className = `alert alert-${tipo}`
  mensajeDiv.textContent = mensaje
  mensajeDiv.classList.remove("d-none")

  // Scroll hacia el mensaje
  mensajeDiv.scrollIntoView({ behavior: "smooth", block: "center" })
}
