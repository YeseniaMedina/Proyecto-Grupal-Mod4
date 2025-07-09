export function Header() {
  const header = document.createElement('header');
  header.className = 'fixed-header';
  header.innerHTML = `
    <div class="header-content">
      <div class="logo-container">
        <img src="./src/assets/images/LOGO_M4_V2.png" alt="MENILAROSE" class="logo">
      </div>
      <button class="hamburger-btn" aria-label="Menú">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>
      <nav class="main-nav">
        <a href="/" data-link title="Inicio">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <path d="M9 22V12h6v10"/>
          </svg>
        </a>
        <a href="/favorites" data-link title="Favoritos">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </a>
        <a href="/profile" data-link title="Mi Perfil">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </a>
        <a href="/login" data-link title="Cerrar sesión">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
        </a>
      </nav>
      <div class="mobile-menu">
        <nav>
          <a href="/" data-link>Inicio</a>
          <a href="/favorites" data-link>Favoritos</a>
          <a href="/profile" data-link>Mi Perfil</a>
          <a href="/login" data-link>Cerrar sesión</a>
        </nav>
      </div>
    </div>
  `;
  return header;
}