
import { showToast } from "./showToast";


export function credentialValidations({name, email, password}) {

 if(name !==undefined) {
    const regexName = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{2,50}$/;
    if(name.length < 2 && name.length > 30  || !name ) {
       showToast({
               text: "El nombre solo debe contener letras y espacios, mínimo 2 letras.",
               type: "error",
             });

        return false;
    }
    
 }

 const regexEmail= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

 if(email !== undefined) {
    if(!regexEmail.test(email)) {
        
        showToast({
                text: "Email no válido.",
                type: "error",
              });

        return false;
    }

 }

 const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;


 if (password !== undefined) {
    if(!regexPassword.test(password)) {
        
        showToast({
        text: "La contraseña debe tener más de 6 caractéres y al menos un número y una letra",
        type: "error",
        });

        return false
    }
 }

 return true;



}