import { getPopularMovies, searchMovies, getGenres } from '../api/movieAPI.js';
import { movieCard } from '../components/movieCard.js';
import { showLoading, hideLoading, showError } from '../utils/validations.js';
import "../assets/styles/home.css";

export function home(container) {
  const homeSection = document.createElement('section'); 
  homeSection.className = 'home';
  homeSection.innerHTML = `
    <div class="filters-container">
      <div class="search-filter">
        <button id="search-toggle" class="search-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
        <input type="text" id="search-input" placeholder="Buscar películas..." class="hidden">
      </div>
      
      <div class="advanced-filters">
        <div class="filter-group">
          <label for="genre-filter">Género:</label>
          <select id="genre-filter">
            <option value="">Todos</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="year-filter">Año:</label>
          <select id="year-filter">
            <option value="">Todos</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="sort-by">Ordenar por:</label>
          <select id="sort-by">
            <option value="popularity.desc">Más populares</option>
            <option value="popularity.asc">Menos populares</option>
            <option value="release_date.desc">Más recientes</option>
            <option value="release_date.asc">Más antiguas</option>
            <option value="vote_average.desc">Mayor puntuación</option>
            <option value="vote_average.asc">Menor puntuación</option>
          </select>
        </div>
        
        <button id="apply-filters" class="filter-btn">Aplicar</button>
        <button id="reset-filters" class="filter-btn">Restablecer</button>
      </div>
    </div>
    
    <div class="loading-container"></div>
    <div class="error-container"></div>
    <div class="movies-container"></div>
    <div class="pagination">
      <button id="prev-page" disabled>Anterior</button>
      <span id="page-info">Página 1</span>
      <button id="next-page">Siguiente</button>
    </div>
  `;

  
  let currentFilters = {
    query: '',
    genre: '',
    year: '',
    sortBy: 'popularity.desc',
    page: 1,
    totalPages: 1
  };

  
  loadInitialData();

 
  setupEventListeners();

  async function loadInitialData() {
    showLoading();
    try {
      
      const genres = await getGenres();
      populateGenres(genres);
      
      
      populateYears();
      
      
      await loadMovies();
    } catch (error) {
      showError('Error al cargar los datos iniciales');
    } finally {
      hideLoading();
    }
  }

  function populateGenres(genres) {
    const genreSelect = homeSection.querySelector('#genre-filter');
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  }

  function populateYears() {
    const yearSelect = homeSection.querySelector('#year-filter');
    const currentYear = new Date().getFullYear();
    
    for (let year = currentYear; year >= currentYear - 30; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  }

  async function loadMovies() {
    showLoading();
    try {
      let movies;
      
      if (currentFilters.query) {
        movies = await searchMovies(currentFilters.query, currentFilters.page);
      } else {
        movies = await getPopularMovies(
          currentFilters.page,
          currentFilters.sortBy,
          currentFilters.genre,
          currentFilters.year
        );
      }
      
      
      currentFilters.totalPages = movies.total_pages > 500 ? 500 : movies.total_pages;
      
      
      if (movies.results && movies.results.length > 0) {
        renderMovies(movies.results);
        updatePagination();
      } else {
        renderMovies([]);
        showError('No se encontraron películas con estos filtros');
      }
    } catch (error) {
      console.error('Error loading movies:', error);
      showError('Error al cargar las películas');
      renderMovies([]);
    } finally {
      hideLoading();
    }
  }

  function renderMovies(movies) {
    const container = homeSection.querySelector('.movies-container');
    container.innerHTML = '';
    
    if (movies.length === 0) {
      container.innerHTML = '<p class="no-results">No se encontraron películas con los filtros aplicados.</p>';
      return;
    }
    
    movies.forEach(movie => {
      container.appendChild(movieCard(movie));
    });
  }

  function updatePagination() {
    const prevBtn = homeSection.querySelector('#prev-page');
    const nextBtn = homeSection.querySelector('#next-page');
    const pageInfo = homeSection.querySelector('#page-info');
    
    prevBtn.disabled = currentFilters.page <= 1;
    nextBtn.disabled = currentFilters.page >= currentFilters.totalPages;
    pageInfo.textContent = `Página ${currentFilters.page} de ${currentFilters.totalPages}`;
  }

  function setupEventListeners() {
    
    const searchToggle = homeSection.querySelector('#search-toggle');
    const searchInput = homeSection.querySelector('#search-input');
    
    searchToggle.addEventListener('click', () => {
      searchInput.classList.toggle('hidden');
      if (!searchInput.classList.contains('hidden')) {
        searchInput.focus();
      }
    });
    
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
    
    
    homeSection.querySelector('#apply-filters').addEventListener('click', () => {
      currentFilters.genre = homeSection.querySelector('#genre-filter').value;
      currentFilters.year = homeSection.querySelector('#year-filter').value;
      currentFilters.sortBy = homeSection.querySelector('#sort-by').value;
      currentFilters.page = 1;
      currentFilters.query = '';
      searchInput.value = '';
      searchInput.classList.add('hidden');
      loadMovies();
    });
    
    
    homeSection.querySelector('#reset-filters').addEventListener('click', () => {
      currentFilters = {
        query: '',
        genre: '',
        year: '',
        sortBy: 'popularity.desc',
        page: 1,
        totalPages: 1
      };
      
      homeSection.querySelector('#genre-filter').value = '';
      homeSection.querySelector('#year-filter').value = '';
      homeSection.querySelector('#sort-by').value = 'popularity.desc';
      searchInput.value = '';
      searchInput.classList.add('hidden');
      loadMovies();
    });
    
    
    homeSection.querySelector('#prev-page').addEventListener('click', () => {
      if (currentFilters.page > 1) {
        currentFilters.page--;
        loadMovies();
      }
    });
    
    homeSection.querySelector('#next-page').addEventListener('click', () => {
      if (currentFilters.page < currentFilters.totalPages) {
        currentFilters.page++;
        loadMovies();
      }
    });
  }

  function handleSearch() {
    currentFilters.query = homeSection.querySelector('#search-input').value.trim();
    currentFilters.page = 1;
    loadMovies();
  }


  
  container.innerHTML = "";
  container.appendChild(homeSection); 
}

