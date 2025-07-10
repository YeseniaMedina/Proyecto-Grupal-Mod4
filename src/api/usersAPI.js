const baseUrl = "https://686183678e74864084463e90.mockapi.io/proyect4";


export async function createNewUser(param) {
    const url = `${baseUrl}/users`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: param.regName,
                email: param.regEmail,
                password: param.regPassword,
                fav: param.fav || [],
                avatar: new URL('../assets/images/1.png', import.meta.url).href,
            })
        })

        if (!response.ok) {
            throw new Error(response.status);
        }

        const user = await response.json();
        console.log(user);

    } catch (error) {
        console.error(error);
    }
}


export async function getAllUsers() {
    const url = `${baseUrl}/users`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error:", response.status);
        }

        const users = await response.json();
        return users;


    } catch (error) {
        console.error(error);
    }
}

export function getCurrentUser() {
    const loadUser = localStorage.getItem("currentUser");

    return loadUser ? JSON.parse(loadUser) : null;
}


export async function currentUserEdit(currentUser, movieId) {
    try {
        const response = await fetch(`https://686183678e74864084463e90.mockapi.io/proyect4/users/${currentUser.id}`);
        const userData = await response.json();

        //añadimos la pelicula al array fav
        const updateFavs = userData.fav.includes(movieId)
            ? userData.fav
            : [...(userData.fav || []), movieId];

        // Actualizar en MockAPI
        let putResponse = await fetch(`https://686183678e74864084463e90.mockapi.io/proyect4/users/${currentUser.id}`, {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fav: updateFavs }),
        });

        if (!putResponse.ok) {
            throw new Error('Error en la respuesta de MockAPI');
        }

        const data = await putResponse.json();
        console.log("Usuario actualizado en MockAPI:", data);
    } catch (error) {
        console.error("Error al actualizar en MockAPI:", error);
        // mostrarMensaje("Error al guardar el perfil en MockAPI", "error");
    }
}

