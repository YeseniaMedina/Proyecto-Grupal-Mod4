import { currentUserEdit } from "../api/usersAPI";


const DEFAULT_IMAGE = 'https://wallpapers.com/images/featured/pelicula-9pvmdtvz4cb0xl37.jpg';

export function movieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : DEFAULT_IMAGE;

  card.innerHTML = `
    <div class="card-image">
      <img src="${imageUrl}" alt="${movie.title}" loading="lazy">
      <button class="favorite-btn" data-movie-id="${movie.id}" aria-label="Añadir a favoritos">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
    </div>
    <div class="card-info">
      <h3>${movie.title}</h3>
      <div class="card-details">
        <span>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
        <span>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
      </div>
    </div>
  `;


  

  const favButton = card.querySelector('.favorite-btn');
  const movieId = movie.id.toString();

 
  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];

  
  if (currentUser && currentUser.fav && currentUser.fav.includes(movieId)) {
    favButton.classList.add('favourited');
  }

  
  favButton.addEventListener('click', async (e) => {
    e.stopPropagation(); 
    e.currentTarget.classList.toggle('active'); 

   
    if (!currentUser) return;

    if (currentUser.fav && currentUser.fav.includes(movieId)) { 
      currentUser = currentUser.fav.filter(id => id !== movieId);
      favButton.classList.remove('favourited');
    } else {
      
      if (!currentUser.fav) currentUser.fav = [];
      currentUser.fav.push(movieId);
      favButton.classList.add('favourited');
    }
    
    await currentUserEdit(currentUser, movieId);
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); 


  });




  
  card.addEventListener('click', () => {
    window.history.pushState({}, '', `/movie/${movie.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  return card;
}

