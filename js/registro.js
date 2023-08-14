if(localStorage.getItem('token')){
    window.location.href = 'preguntas.html';
}

document.getElementById("registrar").addEventListener("click", async function (event) {
    event.preventDefault();
    const regexPassword= new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+{}[\\]|;:',\".<>/?])(?=.*[0-9])(?=.{8,512}).*$");
    const Name= document.getElementById('Name').value;
    const LastName = document.getElementById( 'LastName').value;
    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;
    const RepeatPassword = document.getElementById('RepeatPassword').value;

    const data = {
        Name: Name,
        LastName: LastName,
        Email: Email,
        Password: Password
    };
    
    if(Password !== RepeatPassword){
        cuteAlert({
        type:'error',
        title:'Datos incorrectos',
        message: 'Las contraseñas no coinciden. '
    });
    return;
    }

    if(!regexPassword.test(Password)){
        cuteAlert({
        type:'error',
        title:'Datos incorrectos',
        message: 'Verifica que tu contraseña contenga por lo menos 8 dígitos e incluya mayúsculas y números. '
    });
    return;
    }

    try {
        const response = await fetch("https://dev-api.optiaware.com/api/Users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        });
    

        if (!response.ok) {
            cuteAlert({
                type: 'error',
                title: 'Datos incorrectos',
                message: 'Asegúrate de introducir tu información de forma correcta. '
            });
            throw new Error('Error en la solicitud.');
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
        window.location.href= 'ingresar.html?fromRegister=true';
        // Aquí puedes realizar acciones adicionales con la respuesta del servidor.
    } catch (error) {
        console.error('Error:', error.message);
    }
});

