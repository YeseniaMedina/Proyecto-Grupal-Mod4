import { navigate } from "../router";
import { renderNavbar } from "../components/navbar";

export async function home(container) {
  
  container.innerHTML = `
    <h1>Market</h1>
    <button id="registerButton"> click me </button>
    
  `;

    const registerButton = document.getElementById("registerButton");

    // registerButton.addEventListener("click", () => {
    //     navigate("/login");
    // })


}