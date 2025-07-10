import { renderNavbar } from "../components/navbar";
import { getCurrentUser } from "../api/usersAPI";
import "../assets/styles/profile.css";

export function profile(container, id) {
    container.innerHTML=`<div class="profile-container">
    <h1 class="profile-h1">Mi Perfil</h1>
    <div class="basic-profile">
        <div class="profile-photo">
        <img id="selectedAvatar" class="avatar-preview" src="" alt="Avatar seleccionado" />
        </div>
        <div class="profile-fav">
            <a href="/fav" class="profile-link">Mis favoritos</a>
        </div>
        <div class="profile-info">
            <p><strong>Nombre:</strong> <span id="nombre">---</span></p>
            <p><strong>Email:</strong> <span id="email">---</span></p>
        </div>
        <br>
    </div>
    <button class="profileBtn" id="toggleBtn">Editar perfil</button>
    <div class="profile-box" id="profileBox" style="display:none;">
        <form id="profileForm">
          <input class="profileInput" type="text" id="inputNombre" placeholder="Nombre"  />
          <input class="profileInput" type="email" id="inputEmail" placeholder="Email"  />
          <div id="avatarGallery" class="avatar-gallery"></div>
        
          <button class="profileBtn" type="submit">Guardar</button>
          <div id="mensajePerfil" class="mensaje-perfil" style="display: none;"></div>
        </form>
    </div>
  </div>`;

    const avatarGallery = document.getElementById("avatarGallery");
    const selectedAvatar = document.getElementById("selectedAvatar");

    //AVATARES
    const avatars = [
        new URL('../assets/images/1.png', import.meta.url).href,
        new URL('../assets/images/2.png', import.meta.url).href,
        new URL('../assets/images/3.png', import.meta.url).href,
        new URL('../assets/images/4.png', import.meta.url).href,
        new URL('../assets/images/5.png', import.meta.url).href,
        new URL('../assets/images/6.png', import.meta.url).href,
        new URL('../assets/images/7.png', import.meta.url).href,
        new URL('../assets/images/8.png', import.meta.url).href,
    ];

    let avatarSeleccionado = avatars[0]; //valor por defecto

    //Mostrar AVATARES
    avatars.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.classList.add("avatar-option");
        img.addEventListener("click", () => {
            avatarSeleccionado = url;
            selectedAvatar.src = url;
            highlightAvatar(url);
        });
        avatarGallery.appendChild(img);
    });

    function highlightAvatar(selectedUrl) {
        document.querySelectorAll(".avatar-option").forEach(img => {
            img.classList.toggle("selected", img.src === selectedUrl);
        });
    }

    //VALORES DOM
    const form = document.getElementById('profileForm');
    const nombreSpan = document.getElementById('nombre');
    const emailSpan = document.getElementById('email');

    //Cargar datos guardados y actualizar vista
    const datosGuardados = getCurrentUser();
    if (datosGuardados) {
        nombreSpan.textContent = datosGuardados.name || "...";
        emailSpan.textContent = datosGuardados.email || "...";

        // Cargar avatar guardado
        if (datosGuardados.avatar /*|| datosGuardados.foto*/) {
            const avatarGuardado = datosGuardados.avatar /*|| datosGuardados.foto*/;
            selectedAvatar.src = avatarGuardado;
            avatarSeleccionado = avatarGuardado;
            highlightAvatar(avatarGuardado);
        } else {
            // Si no hay avatar guardado, usar el por defecto
            selectedAvatar.src = avatarSeleccionado;
            /*highlightAvatar(avatarSeleccionado);*/
        }
    } else {
        // Si no hay usuario, usar avatar por defecto
        selectedAvatar.src = avatarSeleccionado;
        highlightAvatar(avatarSeleccionado);
    }
    
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombre = document.getElementById('inputNombre').value.trim();
        const email = document.getElementById('inputEmail').value.trim();
        
        // Usar el avatar seleccionado
        await guardarYMostrar(nombre, email, avatarSeleccionado);
    });

    async function guardarYMostrar(nombre, email, avatar) {
        // Actualizar la vista
        if (nombre) nombreSpan.textContent = nombre;
        if (email) emailSpan.textContent = email;
        selectedAvatar.src = avatar;

        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.id) {
            mostrarMensaje("Error: No se encontró el usuario actual", "error");
            return;
        }

        // Preparar datos para actualizar
        const datosActualizados = {
            ...currentUser,
            name: nombre || currentUser.name,
            email: email || currentUser.email,
            avatar: avatar
        };

        try {
            // Actualizar en MockAPI
            const response = await fetch(`https://686183678e74864084463e90.mockapi.io/proyect4/users/${currentUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosActualizados),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta de MockAPI');
            }

            const data = await response.json();
            console.log("Usuario actualizado en MockAPI:", data);

            // Actualizar localStorage con los datos de la API
            localStorage.setItem('currentUser', JSON.stringify(data));

            // Mostrar mensaje de éxito
            mostrarMensaje("¡Perfil actualizado con éxito!", "success");
            form.reset();

        } catch (error) {
            console.error("Error al actualizar en MockAPI:", error);
            mostrarMensaje("Error al guardar el perfil en MockAPI", "error");
        }
    }

    function mostrarMensaje(texto, tipo = "success") {
        const mensajeDiv = document.getElementById("mensajePerfil");
        mensajeDiv.textContent = texto;
        mensajeDiv.style.display = "block";
        mensajeDiv.className = `mensaje-perfil ${tipo}`;

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