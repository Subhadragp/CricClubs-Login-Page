document.getElementById("login").addEventListener("submit",function(event){
  event.preventDefault();

  let username= document.getElementById("usName").value.trim();
  let password= document.getElementById("pass").value.trim();

  let userror= document.getElementById("usError");
  let passerror= document.getElementById("passError");

  userror.style.display="none";
  passerror.style.display="none";
  wrong.style.display-"none";

  let isValid=true;

  if(username === "") {
    userror.style.display="inline";
    isValid=false;
  }

  if(password === "") {
    passerror.style.display="inline";
    isValid=false;
  }

  if(!isValid) return;

  loginApi(username,password)
  .then(response => {
    if(response.token){
      setTimeout(() =>{
        window.location.href = "email.html";
      }, 2000);
    }
    else{
      wrong.style.display="inline";
    }
  })
  .catch(error => console.error(error));
});


const API_URL= 'https://reqres.in/api/login'

function loginApi(username,password){
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type" : "application/json",
    },
    body: JSON.stringify({ email:username, password:password})
  })
  .then(async response => {
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || "Invalid login credentials");
    }

    return data;
})
.catch(error => {
    console.error("Login failed:", error.message);
    return { error: error.message };
});
}
