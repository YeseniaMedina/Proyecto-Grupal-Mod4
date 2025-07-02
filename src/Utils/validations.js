// Mostrar estado de carga
export function showLoading() {
  const loadingContainer = document.querySelector('.loading-container');
  if (loadingContainer) {
    loadingContainer.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Cargando catálogo de películas...</p>
      </div>
    `;
  }
}

// Ocultar estado de carga
export function hideLoading() {
  const loadingContainer = document.querySelector('.loading-container');
  if (loadingContainer) {
    loadingContainer.innerHTML = '';
  }
}

// Mostrar mensaje de error
export function showError(message) {
  const errorContainer = document.querySelector('.error-container');
  if (errorContainer) {
    errorContainer.innerHTML = `
      <div class="error-message">
        <span>Error</span>
        <p>${message}</p>
      </div>
    `;
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
      errorContainer.innerHTML = '';
    }, 5000);
  }
}

// Mostrar mensaje de éxito
export function showSuccess(message) {
  const errorContainer = document.querySelector('.error-container');
  if (errorContainer) {
    errorContainer.innerHTML = `
      <div class="success-message">
        <span>¡Perfecto!</span>
        <p>${message}</p>
      </div>
    `;
    
    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
      errorContainer.innerHTML = '';
    }, 3000);
  }
}