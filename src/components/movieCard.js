import { currentUserEdit } from "../api/usersAPI";

// Imagen por defecto para cuando no se encuentra la de TMDB
const DEFAULT_IMAGE = 'https://wallpapers.com/images/featured/pelicula-9pvmdtvz4cb0xl37.jpg';

export function movieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  
  // Usar imagen por defecto si no hay poster_path
 
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


  //----------------------------------------------------------
  // EVENTO PARA EL BOTÓN DE FAVORITOS *********************************
// const favButton = card.querySelector('.favorite-btn');
//   const movieId = movie.id.toString();
//   // card.querySelector('.favorite-btn').addEventListener('click', (e) => {
//   //  e.stopPropagation();
  
//     // Inicializar estado favorito desde localStorage

  

//   //Inicializar estado favorito

//   const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
//   if (favourites.includes(movieId)) {
//     favButton.classList.add('favourited');
//   }


//   // Evento para toggle favoritos
//   favButton.addEventListener('click', (e) => {
//     e.stopPropagation();
//     let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
      

//     if (favourites.includes(movieId)) {
//       favourites = favourites.filter(id => id !== movieId);
//       favButton.classList.remove('favourited');
//     } else {
//       favourites.push(movieId);
//       favButton.classList.add('favourited');
//     }
//     localStorage.setItem('favourites', JSON.stringify(favourites));
//   });
//   // });

  
//   favButton.addEventListener('click', (e) => {
//     e.stopPropagation();
//     let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
//     if (favourites.includes(movieId)) {
//       favourites = favourites.filter(id => id !== movieId);
//     } else {
//       favourites.push(movieId); //Guardar objeto completo, no solo ID
//     }
//     localStorage.setItem('favourites', JSON.stringify(favourites));
//     });
  




//   // EVENTO PARA VER DETALLES ******************************************
//   // card.addEventListener('click', () => {
//   //   console.log('Ver detalles de:', movie.title);
//     // TODO: Navegar a página de detalles
// //   });

//   // return card;
 
// // }
//  card.addEventListener('click', () => {
//     window.history.pushState({}, '', `/movie/${movie.id}`);
//     window.dispatchEvent(new PopStateEvent('popstate'));
//   });
//   return card;
  //--------------------------------------------------------

  // Obtener referencia al botón
  const favButton = card.querySelector('.favorite-btn');
  const movieId = movie.id.toString();

  // Leer favoritos actuales del localStorage
  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];

  // Marcar como favorito si ya está en la lista
  if (currentUser && currentUser.fav && currentUser.fav.includes(movieId)) {
    favButton.classList.add('favourited');
  }

  // Evento para añadir o quitar de favoritos
  favButton.addEventListener('click', async (e) => {
    e.stopPropagation(); // Evita que se dispare el evento de ver detalles

    //let currentUser = JSON.parse(localStorage.getItem('currentUser')) || []; // reemplazar por traer usuario
    if (!currentUser) return;

    if (currentUser.fav && currentUser.fav.includes(movieId)) { // currentUser.fav
      currentUser = currentUser.fav.filter(id => id !== movieId);
      favButton.classList.remove('favourited');//los button no
    } else {
      //Peticion PUT de edit de usuario.fav  ...currentUser.fav, lo nuevo
      //currentUser= await currentUserEdit(currentUser, movieId);
      // favourites.push(movieId);// borrar
      //favButton.classList.add('favourited');
      // Añadir a favoritos
    if (!currentUser.fav) currentUser.fav = [];
    currentUser.fav.push(movieId);
    favButton.classList.add('favourited');
    }
// Actualizar en la API y localStorage
   await currentUserEdit(currentUser, movieId);
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); //actualizar con la nueva info de usuario el localstorage


  });

  //--------------------------------------------------------------

  // DEtalles que puso Carmen

  // Evento para ver detalles (puedes expandirlo luego)
  // card.addEventListener('click', () => {
  //   console.log('Ver detalles de:', movie.title);
  //   // TODO: Redirigir o mostrar detalles
  // });

  // return card;
  //---------------------------------------------------


  // Detalles que puso sheila( sin esto no se ve )
  card.addEventListener('click', () => {
    window.history.pushState({}, '', `/movie/${movie.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  return card;
}

