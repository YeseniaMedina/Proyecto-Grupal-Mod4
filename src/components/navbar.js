import { getCurrentUser } from "../api/usersAPI";
import { navigate } from "../router";



export function renderNavbar(container) {
  const currentUser = getCurrentUser();
  if (!container) return; 

    
    const header = document.createElement("header");
    header.className = "fixed-header";
  
    
    header.innerHTML = `
      <div class="header-content">
        <div class="logo-container">
          <img src="/src/assets/images/LOGO_M4_V2.png" alt="MENILAROSE" class="logo">
        </div>
        <button class="hamburger-btn" aria-label="Menú">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        <nav class="main-nav">
          ${
            currentUser
              ? `
            <a href="/" data-link title="Inicio">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <path d="M9 22V12h6v10"/>
              </svg>
            </a>
            <a href="/fav" data-link title="Favoritos">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </a>
            <a href="/user/${currentUser.id}" data-link title="Mi Perfil">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </a>
            <a id="logoutBtn" title="Cerrar sesión">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </a>
          `
              : `
            <a href="/login" data-link title="Ingresar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </a>
            <a href="/register" data-link title="Registrarse">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
            </a>
          `
          }
        </nav>
        <div class="mobile-menu">
          <nav>
            ${
              currentUser
                ? `
              <a href="/" data-link>Inicio</a>
              <a href="/fav" data-link>Favoritos</a>
              <a href="/user/${currentUser.id}" data-link>Mi Perfil</a>
              <button id="logoutBtnMobile">Cerrar sesión</button>
            `
                : `
              <a href="/login" data-link>Ingresar</a>
              <a href="/register" data-link>Registrarse</a>
            `
            }
          </nav>
        </div>
      </div>
    `;
  
    
    const existingHeader = document.querySelector("header");
    if (existingHeader) {
      existingHeader.replaceWith(header);
    } else {
      container.prepend(header);
    }
  

    
    const hamburgerBtn = header.querySelector(".hamburger-btn");
    const mobileMenu = header.querySelector(".mobile-menu");

    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
      });
    }

    
    const mobileLinks = header.querySelectorAll(".mobile-menu [data-link]");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });

    
    if (currentUser) {
      const logoutBtnMobile = header.querySelector("#logoutBtnMobile");
      if (logoutBtnMobile) {
        logoutBtnMobile.addEventListener("click", () => {
          mobileMenu.classList.remove("active");
        });
      }
    }


    
    if (currentUser) {
      const logoutBtn = header.querySelector("#logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("currentUser");
          renderNavbar(container); 
          navigate("/login");
        });
      }
      
      const logoutBtnMobile = header.querySelector("#logoutBtnMobile");
      if (logoutBtnMobile) {
        logoutBtnMobile.addEventListener("click", () => {
          localStorage.removeItem("currentUser");
          renderNavbar(container);
          navigate("/login");
        });
      }
    }  
}

