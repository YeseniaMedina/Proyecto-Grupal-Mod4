import { getCurrentUser } from "../api/usersAPI";
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

  //const storedIds = JSON.parse(localStorage.getItem("favourites")) || []; // storeids por currentUser y cambiar favourites por currentUser
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const storedIds = currentUser && currentUser.fav ? currentUser.fav : [];


  if (storedIds.length === 0) { // currentUser.fav
    favList.innerHTML = "<p>No tienes películas favoritas aún.</p>";
    return;
  }
  //Traer los datos de cada película
  for (const movieId of storedIds) { //(linea 37 coja usuario editado) //storedIds por currentUser.fav
    try {
      const movie = await fetchMovieDetails(movieId); // para traer la info completa
      const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://wallpapers.com/images/featured/pelicula-9pvmdtvz4cb0x137.jpg";

      //Debug en consola
      // console.log("movie.title:", movie.title);
      // console.log("imageUrl:", imageUrl);

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
        // Obtener usuario actual
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));

        // Eliminar de favoritos
        //const updatedFavs = storedIds.filter(
        //  (id) => id.toString() !== movie.id.toString()
        //);

        // Quitar de favoritos
    currentUser.fav = currentUser.fav.filter(id => id.toString() !== movie.id.toString());

        await currentUserEdit(currentUser, movie.id);
        
        // Actualizar la vista llamando de nuevo a la función para refrescar la lista
        favourites(container, id);
      });

      favList.appendChild(movieDiv);
    } catch (error) {
      console.error(`Error al cargar detalles de la película:`);
    }
  }
}

