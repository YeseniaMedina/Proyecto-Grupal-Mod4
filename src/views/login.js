import { getAllUsers } from "../api/usersAPI";
import { renderNavbar } from "../components/navbar";
import { navigate } from "../router";
import { showToast } from "../Utils/showToast";
import "../assets/styles/login.css";

export function login(container) {
  container.innerHTML = `
    <div class="login-container">
    <form id="loginForm">
    <h1>Login</h1>
    <input type="email" placeholder="email" id="logEmail" required/>
    <input type="password" placeholder="password" id="logPassword" required/>
    <button id="submit" class="loginBtn">Login</button>
    <small>¿Todavia no tienes cuenta? <a href="#" id="goRegister">Registrarme</a></small>
    </div>
    
    `;

  const loginForm = document.getElementById("loginForm");

  const goRegister= document.getElementById("goRegister");
  goRegister.addEventListener("click", ()=> {
    navigate("/register");
  })

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const loginEmail = document.getElementById("logEmail").value;
    const loginPassword = document.getElementById("logPassword").value;

    
      const users = await getAllUsers();
    
      const currentUser = users.find(
        (e) => e.email === loginEmail && e.password === loginPassword
      );
      

      if (currentUser) {
        currentUser.active = true;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        
      } else {
        showToast({
        text: "Email o contraseña no valido",
        type: "error",
      });
      }
    renderNavbar(container);
    navigate("/");
  });
}