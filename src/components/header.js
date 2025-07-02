export function Header() {
  const header = document.createElement('header');
  header.className = 'fixed-header';
  header.innerHTML = `
    <div class="header-content">
      <a href="/" class="logo" data-link>MENILAROSE</a>
      <p>El mejor lugar para descubrir películas</p>
      <nav class="main-nav">
        <a href="/" data-link>Inicio</a>
        <a href="/favorites" data-link>Favoritos</a>
        <a href="/login" data-link>Ingresar</a>
        <a href="/register" data-link>Registrarse</a>
        <a href="/profile" data-link>Mi Perfil</a>
      </nav>
    </div>
  `;
  return header;
}
