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
                
            })
        })

        if(!response.ok) {
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
        if(!response.ok) {
            throw new Error("Error:", response.status);
        }

        const users = await response.json();
        return users;
        

    } catch (error) {
        console.error(error);
    }
 }

export function getCurrentUser() {
    const loadUser= localStorage.getItem("currentUser");
    
    return loadUser ? JSON.parse(loadUser) : null;
}

