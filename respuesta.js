// Ejemplo de preguntas obtenidas del servidor (simuladas)
const preguntas = [
    {
      id: 1,
      texto: "¿Acostumbra usar pantallas durante periodos de tiempo mayores a 6 horas?",
      respuestas: ["No", "Rara vez", "Comúnmente", "Sí"]},
      {id: 2,
      texto: "¿Acostumbra usar pantallas durante periodos de tiempo mayores a 6 horas?",
      respuestas: ["No", "Rara vez", "Comúnmente", "Sí"]},
      {id: 3,
      texto: "¿Acostumbra usar pantallas durante periodos de tiempo mayores a 6 horas?",
      respuestas: ["No", "Rara vez", "Comúnmente", "Sí"]},
      {id: 4,
      texto: "¿Acostumbra usar pantallas durante periodos de tiempo mayores a 6 horas?",
      respuestas: ["No", "Rara vez", "Comúnmente", "Sí"]},
      {id: 5,
      texto: "¿Acostumbra usar pantallas durante periodos de tiempo mayores a 6 horas?",
      respuestas: ["No", "Rara vez", "Comúnmente", "Sí"]},
      {id: 6,
      texto: "¿Acostumbra usar pantallas durante periodos de tiempo mayores a 6 horas?",
      respuestas: ["No", "Rara vez", "Comúnmente", "Sí"]},
      {id: 7,
      texto: "¿Acostumbra usar pantallas durante periodos de tiempo mayores a 6 horas?",
      respuestas: ["No", "Rara vez", "Comúnmente", "Sí"]}
    // Agrega el resto de preguntas aquí
  ];
  
  function generarPreguntas() {
    const cuestionarioForm = document.getElementById("cuestionarioForm");
  
    preguntas.forEach(pregunta => {
      const divPregunta = document.createElement("div");
      divPregunta.classList.add("pregunta");
  
      const preguntaTexto = document.createElement("span");
      preguntaTexto.innerHTML = `<strong>${pregunta.id}.- ${pregunta.texto}</strong><br>`;
      divPregunta.appendChild(preguntaTexto);
  
      pregunta.respuestas.forEach((respuesta, index) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="pregunta${pregunta.id}" value="${index}" /> ${respuesta}<br>`;
        divPregunta.appendChild(label);
      });
  
      cuestionarioForm.appendChild(divPregunta);
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
  }

  generarPreguntas();
  
  function evaluarRespuestas(event) {
    event.preventDefault(); // Prevenir el envío del formulario (no recargará la página)

    // Aquí puedes realizar cualquier evaluación de las respuestas si es necesario
    // En este caso, simplemente mostraremos el mensaje de completar el cuestionario.
  
    // Mostrar el mensaje en el elemento con id "resultadoEvaluacion"
    const resultadoElement = document.getElementById("resultadoEvaluacion");
    resultadoElement.innerHTML = "Completaste el cuestionario y este es tu resultado.";
  
    resultadoElement.style.visibility = "visible"; // Mostrar el elemento
    return false; // Evita el envío real del formulario
  }