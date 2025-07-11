import { getCurrentUser, currentUserEdit } from "../api/usersAPI";
import "../assets/styles/favourites.css";

const API_KEY = "f363bbdcb9461f3aaf0cb603bbbc93b6";
const API_BASE = "https://api.themoviedb.org/3";

async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${API_BASE}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`
  );
  if (!response.ok) {
    throw new Error("No se pudo obtener información de la película");
  }
  return response.json();
}

function resetContainer(container) {
  container.innerHTML = "";
  const favList = document.createElement("div");
  favList.classList.add("favourite-list");
  container.appendChild(favList);
  return favList;
}

export async function favourites(container, id = null) {
  const favList = resetContainer(container);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const storedIds = currentUser && currentUser.fav ? currentUser.fav : [];

  if (storedIds.length === 0) {
    favList.innerHTML = "<p>No tienes películas favoritas aún.</p>";
    return;
  }
  
  for (const movieId of storedIds) {
    try {
      const movie = await fetchMovieDetails(movieId); 
      const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://wallpapers.com/images/featured/pelicula-9pvmdtvz4cb0x137.jpg";


      const movieDiv = document.createElement("div");
      movieDiv.classList.add("favorite-movie");

      movieDiv.innerHTML = `
            <div class="movie-card-fav">
                <div class="card-image-fav">
                    <img src="${imageUrl}" alt="${movie.title}" width="250" />
                </div>
                <div class="card-info-fav">
                    <h3>${movie.title}</h3>
                    <div class="card-details-fav">
                        <span>Año: ${movie.release_date
          ? movie.release_date.split("-")[0]
          : "N/A"
        }</span>
                        <span>⭐ ${movie.vote_average
          ? movie.vote_average.toFixed(1)
          : "N/A"
        }</span>
                    </div>
                    <button class="remove-fav-btn">Eliminar de favoritos</button>
                </div>
            `;

      const removeBtn = movieDiv.querySelector(".remove-fav-btn");
      removeBtn.addEventListener("click", async () => {
        
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));

        
        currentUser.fav = currentUser.fav.filter(id => id.toString() !== movie.id.toString());

       
        const updatedUser = await currentUserEdit(currentUser, movie.id);

        
        favourites(container, updatedUser.id);
      });

      favList.appendChild(movieDiv);
    } catch (error) {
      console.error(`Error al cargar detalles de la película:`);
    }
  }
}

