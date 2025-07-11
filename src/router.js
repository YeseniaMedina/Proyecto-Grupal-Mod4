import { home } from "./views/home.js";
import { register } from "./views/register.js";
import { login } from "./views/login.js";
import { detail } from "./views/movieDetail.js";
import { profile } from "./views/profile.js";
import { favourites } from "./views/favourites.js";
import { getCurrentUser } from "./api/usersAPI.js";
import { renderNavbar } from "./components/navbar.js";

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
  

  
  
  const isPublic = publicPaths.includes(path);
  if (!currentUser && !isPublic) {
    navigate("/login");
    return;
  }

  
  if (currentUser && isPublic) {
    navigate("/");
    return;
  }

    
  if (routes[path]) {
    routes[path](container);
    return;
  }

   
  if (path.startsWith("/movie/")) {
    const id = path.split("/")[2]; 
    detail(container, id);
    return;
  }

   
  if (path.startsWith("/user/")) {
    const id = path.split("/")[2]; 
    profile(container, id);
    return;
  }

   
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

  renderNavbar(document.getElementById('navbar'));
}