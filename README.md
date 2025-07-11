## **🎬 Group Project – Module 4: Menilarose**

A web application that displays a wide informative catalog of movies in card format, allowing users to manage their favorites.

## **🚀 Features**

* **User registration and login**: required to properly interact with the platform.  
* **Frontend form validation**.  
* **Movie listing** with image, title, year, description and rating.  
* **Add or remove favourites** with a single click (buttom)..  
* **Detailed movie information** with cards and external links.  
* **User data storage**: name, email, password and favorite movies.  
* **Simulated data** via Fetch API and LocalStorage.  
* **Toast-style notifications** for feedback.

## **🛠️ Technologies Used**

* **HTML / CSS**: interface structure and styling.  
* **JavaScript**: core logic and modular architecture.  
* **Vite**: development server and modern bundler.  
* **Fetch API**: simulated API communication:  
  * MockAPI (https://mockapi.io/)  
  * TMDB (https://developer.themoviedb.org/reference/intro/getting-started).  
* **LocalStorage**: client-side data persistence.  
* .env: environment variable management.  
* **Toastify JS**: floating toast notifications

## **📂 Project Structure**

Proyecto-Grupal-Mod4/  
├── node\_modules/  
├── src/  
│ ├── api/ \# Simulated API connection logic  
│ │ ├── movieAPI.js  
│ │ └── usersAPI.js  
│  
│ ├── assets/ \# Images and styles  
│ │ ├── images/  
│ │ └── styles/  
│  
│ ├── components/ \# Reusable UI components (Navbar, Card)  
│ │ ├── movieCard.js  
│ │ └── navbar.js  
│  
│ ├── Utils/ \# Utility functions  
│ │ ├── credentialValidations.js  
│ │ ├── showToast.js  
│ │ └── validations.js  
│  
│ ├── views/ \# Main application views  
│ │ ├── favourites.js  
│ │ ├── home.js  
│ │ ├── login.js  
│ │ ├── movieDetail.js  
│ │ ├── profile.js  
│ │ ├── register.js  
│ │ └── main.js  
│  
│ └── router.js \# View routing logic  
│  
├── index.html  
├── .env  
├── .gitignore  
├── package.json  
├── package-lock.json

## **🔐 Environment Variables**

In your .env file, include:

VITE\_API\_URL='YOUR\_API\_KEY\_TMDB'

## **🧪 How to Run the Project**

1. Clone the repository to your local machine:

2. git clone \<https://github.com/YeseniaMedina/Proyecto-Grupal-Mod4\>  
cd proyecto-grupal-mod4

3. Install the dependencies:
     - npm install

4. Install Toastify.js (if not already included):
     - npm install toastify-js

5. Verify your package.json includes:
       "dependencies": {  
           "toastify-js": "^1.12.0"  
        }

6. Create .env file and add your TMDB API Key:
   - VITE\_API\_URL='YOUR\_API\_KEY\_TMDB'

7. Start the development server.
   Two options:
      - npm run dev
      - http://localhost:5173  
  


## **⚙️ Work in progress**

* Create a password confirmation validation on registration.  
* Edit a single data point in the profile form.  
* Implement password change funcionality.  
* Improve page loading speed.  
* Use caching to reduce API requests.

## **✨ Authors**

Project developed by the student team:  
**Yesenia Medina**, **Carmen Luis**, **Sheila Castellano** and **Carolina de León**.

## **📄 License**

This project is licensed under the **CC0 1.0 Universal License**.

It is completely free: you can copy, modify, and use it without restrictions.

More about CC0 → Deed \- CC0 1.0 Universal \- Creative Commons [https://creativecommons.org/publicdomain/zero/1.0/](https://creativecommons.org/publicdomain/zero/1.0/) \]

