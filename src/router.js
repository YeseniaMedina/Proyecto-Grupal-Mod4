import { home } from "./views/home.js";
import { register } from "./views/register.js";
import { login } from "./views/login.js";
import { detail } from "./views/movieDetail.js";
import { profile } from "./views/profile.js";
import { favourites } from "./views/favourites.js";
import { getCurrentUser } from "./api/usersAPI.js";

const publicPaths = ["/login", "/register"];

const routes = {
    "/": home,
    "/register": register,
    "/login": login,
    "/movie/:id": detail,
    "/user/:id": profile,
    "/fav": favourites,
};

export function router() {
    const path = window.location.pathname;

    const container = document.getElementById("app");
  container.innerHTML = "";
  const currentUser= getCurrentUser();
  

  
  // Protegemos rutas privadas
  const isPublic = publicPaths.includes(path);
  if (!currentUser && !isPublic) {
    navigate("/login");
    return;
  }

  // Si usuario logueado intenta ir a login o signup, redirige a home
  if (currentUser && isPublic) {
    navigate("/");
    return;
  }

    //  Si la ruta existe tal cual en routes
  if (routes[path]) {
    routes[path](container);
    return;
  }

   // 2. Manejar ruta /pelicula/:id
  if (path.startsWith("/movie/")) {
    const id = path.split("/")[2]; // ejemplo: "/pelicula/123" → "123"
    detail(container, id);
    return;
  }

   // 3. Manejar ruta /usuario/:id
  if (path.startsWith("/user/")) {
    const id = path.split("/")[2]; // ejemplo: "/usuario/456" → "456"
    profile(container, id);
    return;
  }

   //  4. Ruta no encontrada → volver al inicio
  login(container);
}

export function navigate(path) {
  window.history.pushState({}, "", path);
  router();
}

export function handleLinks() {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigate(e.target.getAttribute("href"));
    }
  });

  window.addEventListener("popstate", router);
}