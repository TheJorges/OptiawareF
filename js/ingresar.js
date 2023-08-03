document.getElementById("ingreso").addEventListener("click", async function (event) {
    event.preventDefault();

    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;

    const data = {
        Email: Email,
        Password: Password
    };
  
  try {
      const response = await fetch("https://dev-api.optiaware.com/api/Login/", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
      });
  
      if (!response.ok) {
          throw new Error('Error en la solicitud.');
        }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            alert('Iniciando Sesion');
            // Aquí puedes realizar acciones adicionales con la respuesta del servidor.
   
            // Aquí puedes guardar el token en el Local Storage si existe en la respuesta del servidor
        if (responseData.token) {
            localStorage.setItem('token', responseData.token);
            console.log('Token guardado en Local Storage.');
        }

    }catch (error) {
    console.error('Error:', error.message);
    console.log(console.error);
    }
});
