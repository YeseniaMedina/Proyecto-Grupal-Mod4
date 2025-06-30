export function footer() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-brand">
        <h3>MENILAROSE</h3>
        <p>El mejor lugar para descubrir películas</p>
      </div>
      
      <div class="footer-links">
        <div class="links-column">
          <h4>Lo Básico</h4>
          <ul>
            <li><a href="#">Sobre MENILAROSE</a></li>
            <li><a href="#">Contacto</a></li>         
          </ul>
        </div>
        
        <div class="links-column">
          <h4>Participa</h4>
          <ul>
            <li><a href="#">Foros de ayuda</a></li>
          </ul>
        </div>
        
        <div class="links-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Términos de uso</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2025 MENILAROSE. Todos los derechos reservados.</p>
    </div>
  `;
  return footer;
}