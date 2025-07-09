import { renderNavbar } from "../components/navbar";
import { getCurrentUser } from "../api/usersAPI";
import "../assets/styles/profile.css";

export function profile(container, id) {
    container.innerHTML=`<div class="profile-container">
    <h1 class="profile-h1">Mi Perfil</h1>
    <div class="basic-profile">
        <div class="profile-photo">
        <img id="fotoPerfil" src="./assets/images/3538491_editado.jpg" alt="Foto de perfil" />
        </div>
        <div class="profile-fav">
            <a href="/fav" class="profile-link">Mis favoritos</a>
        </div>
        <div class="profile-info">
            <p><strong>Nombre:</strong> <span id="nombre">---</span></p>
            <p><strong>Email:</strong> <span id="email">---</span></p>
            <p><strong>Película favorita:</strong> <span id="peliculafavorita">---</span></p>
        </div>
        <br>
    </div>
    <button class="profileBtn" id="toggleBtn">Editar perfil</button>
    <div class="profile-box" id="profileBox" style="display:none;">
        <form id="profileForm">
          <input class="profileInput" type="text" id="inputNombre" placeholder="Nombre"  />
          <input class="profileInput" type="email" id="inputEmail" placeholder="Email"  />
          <input class="profileInput" type="text" id="inputPeliculaFavorita" placeholder="Pelicula favorita" required />
          <input class="profileInput" type="file" id="inputFoto" accept="image/*" />
          <button class="profileBtn" type="submit">Guardar</button>
          <div id="mensajePerfil" class="mensaje-perfil" style="display: none;"></div>
        </form>
    </div>
  </div>`;
    const form = document.getElementById('profileForm');
    const nombreSpan = document.getElementById('nombre');
    const emailSpan = document.getElementById('email');
    const peliculafavoritaSpan = document.getElementById('peliculafavorita');
    const fotoPerfil = document.getElementById('fotoPerfil');
    const inputFoto = document.getElementById('inputFoto');

    //Cargar datos guardados y actualizar vista **aquí mismo**
    const datosGuardados = getCurrentUser(); //Cambie el "perfil" por el current user para ver quien estaba logueado y se guardaran sus datos y por la funcion getCurrentUser para ver quien este logueado
    if (datosGuardados) {
        nombreSpan.textContent = datosGuardados.name || "...";
        emailSpan.textContent = datosGuardados.email || "...";

        // haY QUE VER PORQUE ESTO NO ESTA EN MOCKAPI POR LO TANTO SOLO SE GUARDARIA EN EL LOCAL STORAGE
        
        // peliculafavoritaSpan.textContent = datosGuardados.peliculafavorita || "...";
        if (datosGuardados.foto) {
        fotoPerfil.src = datosGuardados.foto;
        }
    };
    
    form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('inputNombre').value;
    const email = document.getElementById('inputEmail').value;
    const peliculafavorita = document.getElementById('inputPeliculaFavorita').value;
    
    //Foto de perfil
    const fotoFile = inputFoto.files[0];
    if (fotoFile) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const fotoBase64 = reader.result;

            guardarYMostrar(nombre, email, peliculafavorita, fotoBase64);
        
        };     
        reader.readAsDataURL(fotoFile);
    } else {
        const datosGuardados = JSON.parse(localStorage.getItem('perfil'));
        const fotoBase64 = datosGuardados?.foto || '3538491_editado.jpg';
        guardarYMostrar(nombre, email, peliculafavorita, fotoBase64);
    }
    });

    function guardarYMostrar(nombre, email, peliculafavorita, foto) {
    nombreSpan.textContent = nombre;
    emailSpan.textContent = email;
    peliculafavoritaSpan.textContent = peliculafavorita;
    fotoPerfil.src = foto;

    const perfil = { nombre, email, peliculafavorita, foto };
    localStorage.setItem('perfil', JSON.stringify(perfil));
    form.reset();
    

    //Mensaje de éxito
    const mensajeDiv = document.getElementById("mensajePerfil");
    mensajeDiv.textContent = "¡Perfil actualizado con éxito!";
    mensajeDiv.style.display = "block";

    //Ocultar mensaje de éxito
    setTimeout(() => {
        mensajeDiv.style.display = "none";
    }, 3000);

    }

    //Visibilidad de la caja (toggleBox)
    const button = document.getElementById("toggleBtn");
    const div = document.getElementById("profileBox");

    button.addEventListener("click", () => {
        div.style.display = div.style.display === "none" ? "block" : "none";
    });   
}