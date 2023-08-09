
//Esta función hace que comience todo.
calculateScore();

function calculateScore() {
    getUserResponses().then(responses => {
        console.log("RESPOMSES");
        console.log(responses);
    
        let sum=0;
        let qtyQuestions = Object.keys(responses).length;
        let score;
        let maxScore = qtyQuestions * 10;
        for(const key in responses){
            value = responses[key];
            sum+=getValueByResponse(value);

        }
        score = sum/(maxScore/100);
        setBar(score,score);
    });
}

function getUserResponses() {
    return fetch("https://dev-api.optiaware.com/api/UserResponses", {
        method: 'GET',
        headers: getJwtHeaders()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function setBar(text, value) {
    const bar = document.getElementById("statusBar");
    bar.className = '';
    bar.className = `c100 p${value} big`;

    const span = document.getElementById("statusSpan");

    span.textContent = String(text) + "%";
}

function getValueByResponse(id) {
    switch (id) {
        case 0:
            return 10;
            break;
        case 1:
            return 7.5;
            break;
        case 2:
            return 5;
            break;
        case 3:
            return 2.5;
            break;
        case 4:
            return 0;
            break;
            

    }
}
function getJwtHeaders() {
    return {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
}

document.getElementById("responder").addEventListener("click", async function (event) {
    event.preventDefault();

    localStorage.setItem("botonPresionado", "true");
    window.location.href = 'preguntas.html';

});

