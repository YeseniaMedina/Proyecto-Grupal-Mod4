import { createNewUser } from "../api/usersAPI";
import { navigate } from "../router";

export function register(container) {
  
  container.innerHTML = `
    <h1>Sign up</h1>
    <form id="register-form">
    <input type="text" placeholder="name" id="regName" required/>
    <input type="email" placeholder="email" id="regEmail" required/>
    <input type="password" placeholder="password" id="regPassword" required/>
    <input type="tel" placeholder="teléfono" id="phone_number" required/>
    <button type="submit">Register</button>
    </form>
    `;

    const regForm= document.getElementById("register-form");
    
    regForm.addEventListener("submit", async (event) => {
        event.preventDefault();

            // Cojo el value de los inputs
        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
        const phone = document.getElementById("phone_number").value;

        // creo el objeto de los dattos del ususario

        const userData = {
            name, email, password, phone,
        }

        await createNewUser(userData);

        navigate("/login");


    })
}