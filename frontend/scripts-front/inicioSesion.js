document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("iniciar sesion clickeado");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (!email || !password) {
      mensaje.textContent = "Por favor, completa todos los campos.";
      mensaje.className = "alert alert-danger";
      mensaje.classList.remove("d-none");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/usuarios/email/${encodeURIComponent(email)}`);

      if (!response.ok) {
        throw new Error('Error al conseguir usuario!');
      }

      const usuario = await response.json();
      console.log(usuario);

      if (usuario["contrasena"] === password) {
        sessionStorage.setItem("usuarioActual", JSON.stringify(usuario));
        
        if(usuario[nombre] === "admin"){
          window.location.href = "../admin/main_admin.html";
        }else{
          window.location.href = "../user/main_user.html";
        }
        
      } else {
        mensaje.textContent = "Contraseña incorrecta.";
        mensaje.className = "alert alert-danger";
        mensaje.classList.remove("d-none");
      }
    } catch (error) {
      console.error('email no existe!!:', error);
      mensaje.textContent = "Error al iniciar sesión. Verifica tus credenciales.";
      mensaje.className = "alert alert-danger";
      mensaje.classList.remove("d-none");
    }
  });
});
