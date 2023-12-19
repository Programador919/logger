import { LoginError } from `../servicesErrors/customError.js`

document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        const response = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          try {
            if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);        
            if (data.token && data.user.rol === 'admin') 
            {
                //Acceso administrador
                window.location.href = '/admin';
            } else if (data.token && data.user.rol === 'usuario') {
              //Acceso Usuario
                window.location.href = '/current';
            }
      
          }
          } catch (error) {
            if (error instanceof LoginError) {
              // Manejar el error de inicio de sesión específico
              console.error(`Error de inicio de sesión: ${error.message}`);
              console.error(`Código de estado HTTP: ${error.statusCode}`);
            }else {
                // Manejar otros errores
                console.error(`Error general: ${error.message}`);
            }
            console.error("Error en el inicio de sesión"); 
          }
    })
