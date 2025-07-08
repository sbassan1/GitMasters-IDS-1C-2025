// Script para agregar productos

// Función para verificar si el usuario es administrador
function verificarAdmin() {
  // Implementación de la verificación de administrador
  // Por ejemplo, podrías verificar una variable de sesión o un token
  return true // Cambia esto según tu lógica de verificación
}

// Manejar cambio de imagen
function manejarCambioImagen() {
  const input = document.getElementById("imagen")
  const preview = document.getElementById("imagenPreview")

  if (!input || !preview) {
    console.error("No se encontraron los elementos de imagen")
    return
  }

  input.addEventListener("change", (e) => {
    console.log("Archivo seleccionado:", e.target.files[0])
    const file = e.target.files[0]

    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        mostrarError("Por favor selecciona un archivo de imagen válido")
        input.value = "" // Limpiar el input
        return
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        mostrarError("La imagen no puede ser mayor a 5MB")
        input.value = "" // Limpiar el input
        return
      }

      // Mostrar preview
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log("Cargando imagen preview...")
        preview.src = e.target.result
      }
      reader.readAsDataURL(file)
    } else {
      // Si no hay archivo, volver al placeholder
      preview.src = "/placeholder.svg?height=200&width=200"
    }
  })
}

// Validar formulario
function validarFormulario() {
  console.log("Validando formulario...")
  limpiarErrores()
  let esValido = true

  const nombre = document.getElementById("nombre").value.trim()
  const descripcion = document.getElementById("descripcion").value.trim()
  const precio = Number.parseFloat(document.getElementById("precio").value)
  const stock = Number.parseInt(document.getElementById("stock").value)
  const tipo = document.getElementById("tipo").value

  console.log("Datos del formulario:", { nombre, descripcion, precio, stock, tipo })

  if (!nombre) {
    mostrarErrorCampo("nombre", "El nombre es requerido")
    esValido = false
  }

  if (!descripcion) {
    mostrarErrorCampo("descripcion", "La descripción es requerida")
    esValido = false
  } else if (descripcion.length > 60) {
    mostrarErrorCampo("descripcion", "La descripción no puede exceder 60 caracteres")
    esValido = false
  }

  if (!precio || precio <= 0 || isNaN(precio)) {
    mostrarErrorCampo("precio", "El precio debe ser mayor a 0")
    esValido = false
  }

  if (isNaN(stock) || stock < 0) {
    mostrarErrorCampo("stock", "El stock debe ser un número mayor o igual a 0")
    esValido = false
  }

  if (!tipo) {
    mostrarErrorCampo("tipo", "Selecciona un tipo de producto")
    esValido = false
  }

  console.log("Formulario válido:", esValido)
  return esValido
}

// Crear producto
async function crearProducto(datosProducto) {
  console.log("Enviando datos del producto:", datosProducto)

  try {
    const response = await fetch("http://localhost:3000/api/v1/productos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosProducto),
    })

    console.log("Respuesta del servidor:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error del servidor:", errorData)
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Producto creado:", data)

    mostrarMensaje("Producto creado correctamente", "success")

    // Limpiar formulario
    document.getElementById("agregarProductoForm").reset()
    document.getElementById("imagenPreview").src = "/placeholder.svg?height=200&width=200"

    // Redirigir después de 2 segundos
    setTimeout(() => {
      window.location.href = "productos_admin.html"
    }, 2000)
  } catch (error) {
    console.error("Error al crear producto:", error)
    mostrarError(error.message || "Error desconocido al crear el producto")
  }
}

// Funciones de utilidad
function mostrarMensaje(mensaje, tipo = "info") {
  const mensajeDiv = document.getElementById("mensaje")
  if (!mensajeDiv) {
    console.error("No se encontró el elemento mensaje")
    return
  }

  mensajeDiv.className = `alert alert-${tipo}`
  mensajeDiv.textContent = mensaje
  mensajeDiv.classList.remove("d-none")

  setTimeout(() => {
    mensajeDiv.classList.add("d-none")
  }, 5000)
}

function mostrarError(mensaje) {
  mostrarMensaje(mensaje, "danger")
}

function mostrarErrorCampo(campo, mensaje) {
  const input = document.getElementById(campo)
  const errorDiv = document.getElementById(campo + "Error")

  if (input) input.classList.add("is-invalid")
  if (errorDiv) errorDiv.textContent = mensaje
}

function limpiarErrores() {
  document.querySelectorAll(".form-control, .form-select").forEach((input) => {
    input.classList.remove("is-invalid")
  })

  document.querySelectorAll(".invalid-feedback").forEach((errorDiv) => {
    errorDiv.textContent = ""
  })
}

function mostrarSpinner(mostrar) {
  const spinner = document.getElementById("guardarSpinner")
  const boton = document.getElementById("guardarBtn")

  if (mostrar) {
    if (spinner) spinner.classList.remove("d-none")
    if (boton) boton.disabled = true
  } else {
    if (spinner) spinner.classList.add("d-none")
    if (boton) boton.disabled = false
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando...")

  if (verificarAdmin()) {
    manejarCambioImagen()

    // Manejar envío del formulario
    const form = document.getElementById("agregarProductoForm")
    if (!form) {
      console.error("No se encontró el formulario")
      return
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      console.log("Formulario enviado")

      if (!validarFormulario()) {
        console.log("Formulario no válido")
        return
      }

      mostrarSpinner(true)

      // Usar sede_id = 1 por defecto (primera sede)
      const datosProducto = {
        nombre: document.getElementById("nombre").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        precio_venta: Number.parseFloat(document.getElementById("precio").value),
        stock: Number.parseInt(document.getElementById("stock").value),
        tipo: document.getElementById("tipo").value,
        sede_id: 1, // Sede por defecto
        imagen: "placeholder.jpg", // Por ahora usar placeholder
      }

      try {
        await crearProducto(datosProducto)
      } finally {
        mostrarSpinner(false)
      }
    })
  } else {
    mostrarError("No tienes permiso para acceder a esta página")
  }
})
