import { router, handleLinks } from "./router.js";
import { renderNavbar } from "./components/navbar.js";


document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  handleLinks();
  router();
  
});

