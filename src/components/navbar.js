import { getCurrentUser } from "../api/usersAPI";
import { navigate } from "../router";


export function renderNavbar(container) {
  const currentUser = getCurrentUser();

  // Crear el header completo
  const header = document.createElement("header");
  header.className = "fixed-header";

  // Crear contenido del header
  header.innerHTML = `
    <div class="header-content">
      <a href="/" class="logo">MENILAROSE</a>
      <p>El mejor lugar para descubrir películas</p>
      <nav class="main-nav">
        ${currentUser ? `
          <a href="/" data-link>Inicio</a>
          <a href="/user/${currentUser.id}" data-link>Mi Perfil</a>
          <a href="/fav" data-link>Favoritos</a>
          <button id="logoutBtn">Cerrar sesión</button>
        ` : `
          <a href="/login" data-link>Ingresar</a>
          <a href="/register" data-link>Registrarse</a>
        `}
      </nav>
    </div>
  `;

  // Reemplazar el header anterior (si existe)
  const existingHeader = document.querySelector("header");
  if (existingHeader) {
    existingHeader.replaceWith(header);
  } else {
    container.prepend(header);
  }

  // Evento logout
  if (currentUser) {
    const logoutBtn = header.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      renderNavbar(container); // volver a renderizar
      navigate("/login");
    });
  }
}

