import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { Home } from './pages/Home.js';
import './assets/styles/main.css';

// Función para inicializar la aplicación
function initApp() {
  const appContainer = document.createElement('div');
  appContainer.id = 'app-container';

  // Añadir header fijo
  appContainer.appendChild(Header());

  // Contenido principal con margen para el header fijo
  const mainContent = document.createElement('main');
  mainContent.id = 'main-content';
  mainContent.appendChild(Home());
  appContainer.appendChild(mainContent);

  // Añadir footer
  appContainer.appendChild(Footer());

  // Añadir el contenedor al DOM
  document.getElementById('app').appendChild(appContainer);
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);