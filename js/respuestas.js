
//Esta función hace que comience todo.

 let score;
 calculateScore().then(result=>{
    score=result;
    fillUserInformation(score);
});


function  calculateScore() {
    return getUserResponses().then(responses => {
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
        return score;
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

function fillUserInformation(score){
    getUserData().then(userData=>{

        let name = userData["Name"]+ " " + userData["LastName"];
        let date=String(userData["CreatedOn"]).substring(0,9).replace("-","/").replace("-","/");
        let msg= "-";
        console.log(score);
        if(parseInt(score) <=25){
            msg ="Presenta múltiples síntomas de fatiga visual, recomendamos acudir a una valoración profesional";
        }
        else if(parseInt(score) >25 && parseInt(score) <=50){
            msg ="Presenta varios síntomas de fatiga visual, recomendamos acudir a una valoración profesional. ";
        }
        else if(parseInt(score) > 50 && parseInt(score) <=75){
            msg ="Presenta algunos síntomas de fatiga visual, recomendamos realizar los ejercicios recomendados para reducir la fatiga visual. Podría considerar acudir a una revisión profesional.  ";
        }
        else if(parseInt(score) > 75 && parseInt(score) <100){
            msg ="Presenta indicios de fatiga visual, considere poner en práctica los ejercicios recomendados para reducir la fatiga visual. ";
        }
        else if(parseInt(score) ==100){
            msg ="No presenta síntomas de fatiga visual.";
        }
        
        document.getElementById("resultValue").innerText= msg;
        document.getElementById("nameValue").innerText= name;
        document.getElementById("dateValue").innerText= date; 

        
    });
}
function getUserData(){
    return fetch("https://dev-api.optiaware.com/api/Users/",{
        method:"GET",
        headers: getJwtHeaders()
    }).then(response=>{
        if(!response.ok){
            throw Error('Error en la solicitud');
      
        }
        return response.json();
    }).then(data=>{return data;}).catch(error=>{
        console.error(error);
    });

}






function setBar(text, value) {
    const bar = document.getElementById("statusBar");
    bar.className = '';
    bar.className = `c100 p${parseInt(value)} big`;

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

