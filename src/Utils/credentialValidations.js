

export function validations({name, email, password}) {
    
 if(name !==undefined) {
    const regexName = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{2,50}$/;
    if(name.length < 2 && name.length > 30  /*&& !regexName.test(name)*/ || !name ) {
        //showtoast con el aviso de error

        return false;
    }
    
 }

 const regexEmail= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

 if(email !== undefined) {
    if(!regexEmail.test(email)) {
        //alert showtoast con error

        return false;
    }

 }

 const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

 if (password !== undefined) {
    if(!regexPassword.test(password)) {
        //showtoast typo error ( "La contraseña debe tener letras y números, mínimo 6 caracteres")

        return false
    }
 }

 return true;


}