export async function favourites(container) {

     container.innerHTML = `<p class="loading">Cargando tus películas favoritas...</p>`;

    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favourites.length === 0) {
        container.innerHTML = `
            <section class="favourites-page">
                <h2>Tus Favoritas</h2>
                <p class="no-favourites">No tienes películas favoritas aún.</p>
            </section>
        `;
        return;
    }

    try {
        const favMovies = [];
        for (const id of favourites) {
            try {
                const movie = await getMovieDetails(id);
                favMovies.push(movie);
            } catch (error) {
                console.error(`Error cargando detalles de la película con ID ${id}`, error);
            }
        }

        container.innerHTML = `
            <section class="favourites-page">
                <h2>Tus Favoritas</h2>
                <div class="movies-container"></div>
            </section>
        `;

        const moviesContainer = container.querySelector('.movies-container');

        favMovies.forEach(movie => {
            const card = movieCard(movie);
            moviesContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading favourite movies:', error);
        container.innerHTML = `<p class="error">Error al cargar tus películas favoritas. Intenta de nuevo más tarde.</p>`;
    }
}