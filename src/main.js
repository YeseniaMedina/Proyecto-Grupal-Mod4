import { renderNavbar } from './components/navbar.js';
import { router, handleLinks } from "./router.js";
import { home } from './views/home.js';
import './assets/styles/reset.css';
import './assets/styles/variables.css';
import './assets/styles/navbar.css';



document.addEventListener("DOMContentLoaded", () => {
  renderNavbar(document.getElementById('navbar'));
  handleLinks();
  router();
  
});