
let urlString = window.location.search;
let params = new URLSearchParams(urlString);
if(params.get('fromLogout')){
    cuteToast({
      type: 'info',
      title:'Sesión terminada',
      message:'La sesión se ha cerrado correctamente. ',
      timer:3000,
    
    });
  }
else if(params.get('fromRegister')){
    cuteToast({
        type:'info',
        title:'Cuenta creada con éxito',
        message: 'Puedes ingresar con tus credenciales. ',
        timer:3000
    });
}  

if(localStorage.getItem('token')){
    window.location.href = 'preguntas.html';
}

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

            // Aquí puedes realizar acciones adicionales con la respuesta del servidor.
   
            // Aquí puedes guardar el token en el Local Storage si existe en la respuesta del servidor
        if (responseData.token) {
            localStorage.setItem('token', responseData.token);
            console.log('Token guardado en Local Storage.');
            window.location.href= 'preguntas.html?fromlogin=true';
        }

    }catch (error) {
    console.error('Error:', error.message);
    console.log(console.error);
    cuteAlert({
        type: 'error',
        title: 'Credenciales incorrectas',
        message: 'Asegúrese de introducir sus credenciales correctamente. ',
        buttonText: 'Aceptar'

    });
    }
});
