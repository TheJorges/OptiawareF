// Obtener el token almacenado en el Local Storage
const token = localStorage.getItem('token');   
const botonPresionado = localStorage.getItem("botonPresionado");


const jwtToken = token;
// URL de la API
const apiUrl1 = 'https://dev-api.optiaware.com/api/UserResponses'; // Reemplaza "tu_endpoint" con el endpoint específico de la API que deseas consultar.
// Código en esta página para verificar si la API tiene datos
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  };
  // Hacer la solicitud GET a la API
  fetch(apiUrl1, {
    method: 'GET',
    headers: headers
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json(); // Convertir la respuesta en formato JSON
    })
    .then(data => {
      // Aquí puedes trabajar con los datos obtenidos de la API
      console.log('Respuesta de la API:', data);
      // Verificar si la respuesta contiene valores
      if (Object.keys(data).length === 0 || botonPresionado === "true") {
        localStorage.setItem("botonPresionado", "false");
        console.log('La API no tiene valores o el botón fue presionado en la otra página.');
        // Si no tiene valores, llamar a los demás métodos para mostrar preguntas, etc.
        Pruebas();
      } else {
        console.log('La API tiene valores.');
        // Si tiene valores, redirigir a otra página
       window.location.href = 'respuestas.html'; // Reemplaza con la URL de la página a la que quieres redirigir     
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });



function Pruebas(){
const apiUr = 'https://dev-api.optiaware.com/api/Questions'; // Reemplaza con la URL de tu API
const apiUrlResponses = 'https://dev-api.optiaware.com/api/Responses'; // Reemplaza con la URL de la API de respuestas



const jwtToken = token;
const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
};
// Realiza la solicitud "GET" utilizando fetch
fetch(apiUr, {
  method: 'GET',
  headers: headers
})
  .then(response => {
      if (!response.ok) {
          throw new Error('Error en la solicitud');
      }
      return response.json(); // Convierte la respuesta a formato JSON
  })
  .then(data => {
      // Una vez que se obtienen las preguntas, obtener las respuestas
      fetch(apiUrlResponses, {
        method: 'GET',
        headers: headers
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la solicitud');
          }
          return response.json(); // Convierte la respuesta a formato JSON
      })
      .then(responses => {
          // Luego de obtener las respuestas, generar el formulario con preguntas y respuestas
          generarPreguntas(data, responses);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })
  .catch(error => {
      console.error('Error:', error);
  });
}



let preguntasRespondidas = [];



function generarPreguntas(data, responses) {
  let contador = 1;
  const cuestionarioForm = document.getElementById("cuestionarioForm");
  const arrayRespuestas = Object.values(responses);
  data.forEach(pregunta => {
    const divPregunta = document.createElement("div");
    divPregunta.classList.add("pregunta");

    const preguntaTexto = document.createElement("span");
    preguntaTexto.innerHTML = `<strong>${contador}.- ${pregunta.Value}</strong><br>`;
    divPregunta.appendChild(preguntaTexto);

    arrayRespuestas.forEach((respuesta, index) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="pregunta${contador}" value="${index}" /> ${respuesta}<br>`;
      divPregunta.appendChild(label);
    });

    preguntasRespondidas.push(pregunta.QuestionId);
    cuestionarioForm.appendChild(divPregunta);
    contador++;
  });
  generarBoton();
}



function generarBoton() {
  const enviarButtonContainer = document.createElement("div");
  enviarButtonContainer.classList.add("enviarButtonContainer");

  const enviarButton = document.createElement("input");
  enviarButton.type = "submit";
  enviarButton.value = "Enviar";
  enviarButton.classList.add("enviarButton");

  enviarButtonContainer.appendChild(enviarButton);

  const cuestionarioForm = document.getElementById("cuestionarioForm");
  cuestionarioForm.appendChild(enviarButtonContainer);

  // Asignamos el evento click al botón para llamar a la función evaluarRespuestas
  enviarButton.addEventListener("click", evaluarRespuestas);
}



function evaluarRespuestas() {

  const cuestionarioForm = document.getElementById("cuestionarioForm");
  const preguntas = Array.from(cuestionarioForm.getElementsByClassName("pregunta"));
  console.log(preguntas);
  // Creamos un objeto para almacenar las respuestas seleccionadas
  const respuestasSeleccionadas = preguntas.map((pregunta, index) => {
    const respuestaSeleccionada = pregunta.querySelector(`input[name="pregunta${index + 1}"]:checked`);
    return respuestaSeleccionada ? respuestaSeleccionada.value : null;
  });

  // Validar que todas las preguntas tengan una respuesta seleccionada
  if (respuestasSeleccionadas.includes(null)) {
    alert("Por favor, responde todas las preguntas antes de enviar el cuestionario.");
    return;
  }
console.log(respuestasSeleccionadas);
 const preguntasRespondidasStrings = preguntasRespondidas.map(String);
 const responses = preguntasRespondidasStrings.reduce((obj, id, index) => {
  obj[id] = parseInt(respuestasSeleccionadas[index]);
  return obj;
}, {});

 console.log(preguntasRespondidas);
console.log(responses);
  // Realizar aquí la solicitud POST a la API para guardar las respuestas
 // Puedes utilizar fetch u otra librería para hacer la solicitud POST
  // Aquí un ejemplo de cómo sería usando fetch:

  const apiUrl = 'https://dev-api.optiaware.com/api/UserResponses';
   const jwtToken = token;
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: headers, 
    body: JSON.stringify({ Responses: responses }) // Enviamos el objeto "responses" en el body     
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
     // Si la API devuelve una respuesta JSON, puedes manejarla aqu
  })
  .then(data => {
    // Aquí puedes hacer algo con la respuesta de la API si es necesario mandarlo a la otra pagina que seria la de jorge 
    console.log('Respuestas enviadas y guardadas con éxito:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}