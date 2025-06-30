import { getAllUsers } from "../api/usersAPI";
import { renderNavbar } from "../components/navbar";
import { navigate } from "../router";

export function login(container) {
  container.innerHTML = `
    <h1>Login</h1>
    <form id="loginForm">
    <input type="email" placeholder="email" id="logEmail" required/>
    <input type="password" placeholder="password" id="logPassword" required/>
    <button id="submit" class="loginBtn">Login</button>
    <button id="goRegister">register</button></form>
    
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
        alert("Login successful");
      } else {
        alert("Datos introducidos incorrectos");
      }
    renderNavbar(container);
    navigate("/");
  });
}