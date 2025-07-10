const siteURL = "https://gitmasters-ids-1c-2025.onrender.com/"

const registerForm = document.getElementById("registerForm")
const registerBtn = document.getElementById("registerBtn")
const registerSpinner = document.getElementById("registerSpinner")
const mensajeDiv = document.getElementById("mensaje")
  

// limpiar errores de validación
function limpiarErrores() {
    const campos = [ "nombre", "email", "password", "confirmPassword", "cumpleanos" ];

    campos.forEach((campo) => {
        const input = document.getElementById(campo);
        const errorDiv = document.getElementById(campo + "Error");
        input.classList.remove("is-invalid");
        if (errorDiv) {
            errorDiv.textContent = "";
        }
    })
}
  
// mostrar error en campo específico
function mostrarErrorCampo(campo, mensaje) {
    const input = document.getElementById(campo);
    const errorDiv = document.getElementById(campo + "Error");
    input.classList.add("is-invalid");

    if (errorDiv) { 
        errorDiv.textContent = mensaje;
    }
}
  
// validaciones de campos
function validarFormulario(formData) {
    let esValido = true;
  
    // validar mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
        mostrarErrorCampo("email", "Ingresa un email válido");
        esValido = false;
    };
  
    // validar dominio mail
    if (formData.email.includes("@admin")) {
        mostrarErrorCampo("email", "No puedes usar dominios @admin");
        esValido = false;
    };
  
    // validar largo contraseña
    if (formData.contrasena.length < 8) {
        mostrarErrorCampo("password", "La contraseña debe tener al menos 8 caracteres");
        esValido = false;
    };
  
    // validar contraseñas iguales
    if (formData.contrasena !== formData.confirmPassword) {
        mostrarErrorCampo("confirmPassword", "Las contraseñas no coinciden");
        esValido = false;
    }
  
    // validar edad
    const fechaNacimiento = new Date(formData.cumpleanos)
    const hoy = new Date()
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
  
    if (edad < 18) {
        mostrarErrorCampo("cumpleanos", "Debes tener al menos 18 años");
        esValido = false;
    };
  
    return esValido;
}
  
// fecha actual formateada en YYYY-MM-DD
function obtenerFechaActual() {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
}

// mostrar mensaje de alerta
function mostrarMensaje(mensaje, tipo) {
    mensajeDiv.className = `alert alert-${tipo}`;
    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.remove("d-none");
}
  
// registro de usuario con api
async function registrarUsuario(userData) {
    try {
        const res = await fetch(siteURL+"api/v1/usuarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
    
        const data = await res.json()

        if (res.ok) {
            mostrarMensaje("Cuenta creada exitosamente", "success");
            registerForm.reset();

            setTimeout(() => {
                window.location.href = "login.html"
            }, 2000);
        } else {
            let mensajeError = "Error al crear la cuenta"

            if (data.message) {
                mensajeError = data.message
            } else if (data.error) {
                mensajeError = data.error;
            }

            mostrarMensaje(mensajeError, "danger");
        }
    } catch (error) {
        console.log(error);
        mostrarMensaje("Ha ocurrido un error. Inténtalo de nuevo más tarde", "danger");
    }
}
  
registerForm.addEventListener("submit", async (e) => {
    console.log(e);
    e.preventDefault()
    limpiarErrores();
    mensajeDiv.classList.add("d-none");
  
    const formData = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        contrasena: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        cumpleanos: document.getElementById("cumpleanos").value,
        fecha_inicio: obtenerFechaActual(),
    }
  
    if (!validarFormulario(formData)) {
        return;
    }
  
    registerBtn.disabled = true;
    registerSpinner.classList.remove("d-none");
  
    const userData = {
        nombre: formData.nombre,
        email: formData.email,
        contrasena: formData.contrasena,
        cumpleanos: formData.cumpleanos,
        fecha_inicio: formData.fecha_inicio,
    }
  
    try {
        await registrarUsuario(userData);
    } finally {
        registerBtn.disabled = false
        registerSpinner.classList.add("d-none")
    }
})
  
// validar contraseñas iguales
document.getElementById("confirmPassword").addEventListener("input", function () {
    const password = document.getElementById("password").value;
    const confirmPassword = this.value
  
    if (confirmPassword && password !== confirmPassword) {
        mostrarErrorCampo("confirmPassword", "Las contraseñas no coinciden")
    } else if (confirmPassword && password === confirmPassword) {
        document.getElementById("confirmPassword").classList.remove("is-invalid")
        document.getElementById("confirmPasswordError").textContent = ""
    }
})
  
// validar dominio mail
document.getElementById("email").addEventListener("input", function () {
    const email = this.value.toLowerCase();

    if (email.includes("@admin")) {
        mostrarErrorCampo("email", "No puedes usar dominios @admin");
    } else {
        this.classList.remove("is-invalid")
        document.getElementById("emailError").textContent = "";
    }
});

  