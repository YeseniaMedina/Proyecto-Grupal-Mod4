import { createNewUser } from "../api/usersAPI";
import { navigate } from "../router";
import { credentialValidations} from "../Utils/credentialValidations";
import { showToast } from "../Utils/showToast";

export function register(container) {
  
  container.innerHTML = `
    <h1>Sign up</h1>
    <form id="register-form">
    <input type="text" placeholder="name" id="regName" required/>
    <input type="email" placeholder="email" id="regEmail" required/>
    <input type="password" placeholder="password" id="regPassword" required/>
    <button type="submit">Register</button>
    </form>
    `;

    const regForm= document.getElementById("register-form");
    
    regForm.addEventListener("submit", async (event) => {
        event.preventDefault();

            // Cojo el value de los inputs
        const regName = document.getElementById("regName").value;
        const regEmail = document.getElementById("regEmail").value;
        const regPassword = document.getElementById("regPassword").value;
        // const regPhone = document.getElementById("phone_number").value;

        // creo el objeto de los dattos del ususario y llamando a las validaciones

        const validations = credentialValidations({name: regName, email: regEmail, password: regPassword})

      

        if(validations) {
            const userData= {
                regName, regEmail, regPassword,
            }

             await createNewUser(userData);
             console.log(userData);
             
        
            showToast({
                text: "Te has registrado correctamente",
                type: "success",
            });

            navigate("/login");
            
            

        }


       
        


    })
}