window.addEventListener('DOMContentLoaded', function() {
    
    if(localStorage.getItem("token"))
    {

        let headerButtons = document.getElementById("headerRegNav");
        let logoutButton = document.getElementById("logoutButton");
        headerButtons.style.display = 'none';
        fetch("https://dev-api.optiaware.com/api/Users",{
            method: 'GET',
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            if(!response.ok){
                localStorage.removeItem('token');
                console.log('NO AUTHORIZADO');
                headerButtons.style.display = 'inline-block';
                logoutButton.style.display = 'none';
                window.location.href = 'ingresar.html';
                
                return;
            }
            else{
                logoutButton.style.display = 'inline-block';
                headerButtons.style.display = 'none';
            }

        }).catch(error=>{
            console.error(error);
        })
    }
    else{
        let logoutButton = document.getElementById("logoutButton");
        logoutButton.style.display = 'none';
    }
});

function logout(){
    localStorage.removeItem('token');
    window.location.href = 'ingresar.html?fromLogout=true';
}