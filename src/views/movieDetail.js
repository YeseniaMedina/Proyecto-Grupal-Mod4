import { getMovieDetails, getMovieVideos } from '../api/movieAPI.js';
import { currentUserEdit } from '../api/usersAPI.js';
import '../assets/styles/movieDetails.css';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export async function detail(container, id) {
  container.innerHTML = `<p class="loading">Cargando detalles de la película...</p>`;

  try {
    const movie = await getMovieDetails(id);
    const videos = await getMovieVideos(id);

    const imageUrl = movie.poster_path
      ? `${IMG_BASE_URL}${movie.poster_path}`
      : 'https://wallpapers.com/images/featured/pelicula-9pvmdtvz4cb0xl37.jpg';

    const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    const trailerEmbedUrl = trailer
      ? `https://www.youtube.com/embed/${trailer.key}`
      : null;

    const actors = movie.credits?.cast.slice(0, 5).map(a => a.name).join(', ') || 'N/A';
    const directors = movie.credits?.crew.filter(c => c.job === 'Director').map(d => d.name).join(', ') || 'N/A';
    const producers = movie.credits?.crew.filter(c => c.job === 'Producer').map(p => p.name).join(', ') || 'N/A';

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isFavourited = currentUser && currentUser.fav && currentUser.fav.includes(movie.id.toString());

    container.innerHTML = `
      <div class="movie-detail-wrapper">
        <section class="movie-detail">
          <div class="detail-image">
            <button class="back-button" aria-label="Volver al inicio">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <img src="${imageUrl}" alt="${movie.title}" />
            <button class="play-btn" ${!trailerEmbedUrl ? 'disabled' : ''} aria-label="Ver tráiler">
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
          <div class="detail-info">
            <h2>${movie.title}</h2>
            ${movie.tagline ? `<p class="tagline">"${movie.tagline}"</p>` : ''}
            <div class="info-row">
              <strong>Year:</strong><span>${movie.release_date?.split('-')[0] || 'N/A'}</span>
              <strong>Rating:</strong><span>⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}</span>
              <strong>Runtime:</strong><span>${movie.runtime ? movie.runtime + ' min' : 'N/A'}</span>
            </div>
            <div class="info-row">
              <strong>Language:</strong><span>${movie.original_language?.toUpperCase() || 'N/A'}</span>
            </div>
            <div class="info-row">
              <strong>Genres:</strong><span>${movie.genres?.map(g => g.name).join(', ') || 'N/A'}</span>
            </div>
            <div class="info-row">
              <strong>Director:</strong><span>${directors}</span>
            </div>
            <div class="info-row">
              <strong>Producers:</strong><span>${producers}</span>
            </div>
            <div class="info-row">
              <strong>Studios:</strong><span>${movie.production_companies?.map(pc => pc.name).join(', ') || 'N/A'}</span>
            </div>
            <div class="info-row">
              <strong>Cast:</strong><span>${actors}</span>
            </div>
            <p class="description">${movie.overview || 'Descripción no disponible.'}</p>
            <div class="button-group">
              <button class="fav-action-btn ${isFavourited ? 'favourited' : ''}">
                ${isFavourited ? 'Remove from Favourites' : 'Add to Favourites'}
              </button>
              ${movie.imdb_id ? `<a href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank" rel="noopener noreferrer" class="imdb-btn">Ver en IMDB</a>` : ''}
            </div>
          </div>
        </section>
      </div>
      <div class="trailer-modal" id="trailerModal">
        <div class="trailer-content">
          <button class="trailer-close" aria-label="Cerrar tráiler">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.3 5.7l-1.4-1.4L12 9.2 7.1 4.3 5.7 5.7 10.6 10.6 5.7 15.5l1.4 1.4L12 12.8l4.9 4.9 1.4-1.4-4.9-4.9z"/>
            </svg>
          </button>
          <iframe id="trailerIframe" src="" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    `;

    const backBtn = container.querySelector('.back-button');
    const playBtn = container.querySelector('.play-btn');
    const modal = document.getElementById('trailerModal');
    const iframe = document.getElementById('trailerIframe');
    const closeBtn = modal.querySelector('.trailer-close');
    const favBtn = container.querySelector('.fav-action-btn');

    backBtn.addEventListener('click', () => {
      window.location.href = '/';
    });

    if (trailerEmbedUrl) {
      playBtn.addEventListener('click', () => {
        iframe.src = `${trailerEmbedUrl}?autoplay=1`;
        modal.classList.add('active');
      });
    }

    closeBtn.addEventListener('click', () => { modal.classList.remove('active'); iframe.src = ''; });
    modal.addEventListener('click', e => { if (e.target === modal) { modal.classList.remove('active'); iframe.src = ''; } });

    favBtn.addEventListener('click', async() => {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const key = movie.id.toString();

  if (!currentUser) return;

  if (currentUser.fav && currentUser.fav.includes(key)) {
    // Quitar de favoritos
    currentUser.fav = currentUser.fav.filter(id => id !== key);
    favBtn.classList.remove('favourited');
    favBtn.textContent = 'Add to Favourites';
  } else {
    // Añadir a favoritos
    if (!currentUser.fav) currentUser.fav = [];
    currentUser.fav.push(key);
    favBtn.classList.add('favourited');
    favBtn.textContent = 'Remove from Favourites';
  }

  // Actualizar en la API y localStorage
  await currentUserEdit(currentUser, key);

  // El localStorage se actualiza dentro de currentUserEdit
      /*let current = JSON.parse(localStorage.getItem('favourites')) || [];
      const key = movie.id.toString();
      if (current.includes(key)) {
        current = current.filter(x => x !== key);
        favBtn.classList.remove('favourited'); favBtn.textContent = 'Add to Favourites';
      } else {
        current.push(key);
        favBtn.classList.add('favourited'); favBtn.textContent = 'Remove from Favourites';
      }
      localStorage.setItem('favourites', JSON.stringify(current));*/
    });

  } catch (error) {
    console.error('Error loading movie details:', error);
    container.innerHTML = `<p class="error">Error al cargar los detalles de la película. Intenta de nuevo más tarde.</p>`;
  }
}