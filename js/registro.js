document.getElementById("registrar").addEventListener("click", async function (event) {
    event.preventDefault();
    alert("Enviado");

    const Name= document.getElementById('Name').value;
    const LastName = document.getElementById( 'LastName').value;
    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;

    const data = {
        Name: Name,
        LastName: LastName,
        Email: Email,
        Password: Password
    };
    

    try {
        const response = await fetch("https://dev-api.optiaware.com/api/Users", {
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
    } catch (error) {
        console.error('Error:', error.message);
    }
});
