import { getCurrentUser } from "../api/usersAPI";
import { navigate } from "../router";



export function renderNavbar(container) {
  const currentUser = getCurrentUser();
 // lamo al nav y el inyecto  las paginas segun si el usuario esta activo o no
  const nav = document.querySelector("nav");
  nav.innerHTML = currentUser ? `
      <a href="/" data-link>Home</a>
      <a href="/user/${currentUser.id}" data-link>Profile</a>
      <a href="/fav" data-link>Fav</a>
      <button id="logoutBtn">Logout</button>
  ` : `
      
      <a href="/login" data-link>Login</a>
      <a href="/register" data-link>Register</a>
  `;

  // Limpia el navbar anterior y lo reemplaza para evitar duplicados
  const existingNav = document.querySelector("nav");
  if (existingNav) {
    existingNav.replaceWith(nav);
  } else {
    container.prepend(nav);
  }

  // Evento logout (si hay sesión)
  if (currentUser) {
    const logoutBtn = nav.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", () => {
    currentUser.active = false;
      localStorage.removeItem("currentUser");
      renderNavbar(container);
      navigate("/login");
    });
  }
}
