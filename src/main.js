import { Header } from './components/header.js';
import { footer } from './components/footer.js';
import { home } from './views/home.js';
import './assets/styles/main.css';

// Función para inicializar
function initApp() {
  const appContainer = document.createElement('div');
  appContainer.id = 'app-container';

  // Añadir header fijo
  appContainer.appendChild(Header());

  // Contenido principal con margen para el header fijo
  const mainContent = document.createElement('main');
  mainContent.id = 'main-content';
  mainContent.appendChild(home());
  appContainer.appendChild(mainContent);

  // Añadir footer
  appContainer.appendChild(footer());

  // Añadir el contenedor al DOM
  document.getElementById('app').appendChild(appContainer);
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);