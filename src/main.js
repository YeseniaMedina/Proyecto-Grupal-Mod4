import { renderNavbar } from './components/navbar.js';
import { router, handleLinks } from "./router.js";
import { home } from './views/home.js';
import './assets/styles/reset.css';
import './assets/styles/variables.css';
import './assets/styles/navbar.css';


/*// Función para inicializar la aplicación
function initApp() {
  const appContainer = document.createElement('div');
  appContainer.id = 'app-container';

  // Añadir header
  appContainer.appendChild(Header());

  // Contenido principal
  const mainContent = document.createElement('main');
  mainContent.id = 'main-content';
  mainContent.appendChild(home());
  appContainer.appendChild(mainContent);

  // Añadir el contenedor al DOM
  document.getElementById('app').appendChild(appContainer);

  // Configurar el menú hamburguesa
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      document.querySelector('.mobile-menu').classList.toggle('active');
    });
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);*/

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar(document.getElementById('navbar'));
  handleLinks();
  router();
  
});