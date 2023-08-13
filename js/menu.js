window.addEventListener('DOMContentLoaded', function() {
    
    if(localStorage.getItem("token"))
    {


        let logoutButton = document.getElementById("logoutItem");

        fetch("https://dev-api.optiaware.com/api/Users",{
            method: 'GET',
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            if(!response.ok){
                localStorage.removeItem('token');
                console.log('NO AUTHORIZADO');

                logoutButton.style.display = 'none';
               
                
                return;
            }
            else{
                logoutButton.style.display = 'inline-block';
            }

        }).catch(error=>{
            console.error(error);
        })
    }
    else{
        let logoutButton = document.getElementById("logoutItem");
        logoutButton.style.display = 'none';
    }
});
function logout(){
    localStorage.removeItem('token');
    window.location.href = 'ingresar.html?fromLogout=true';
}