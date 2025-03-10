// checks the credentials only when the inputs are not empty and siaplays the error when inputs are empty
document.getElementById("login").addEventListener("submit",function(event){
  event.preventDefault();

  let username= document.getElementById("usName").value.trim();
  let password= document.getElementById("pass").value.trim();

  let userror= document.getElementById("usError");
  let passerror= document.getElementById("passError");

  userror.style.display="none";
  passerror.style.display="none";
  wrong.style.display="none";

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

  // API calling
  loginApi(username,password)
  .then(response => {
    if(response.accessToken){
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

// to erase the error msgs when we start typing something in the username
document.getElementById("usName").addEventListener("input", () => {
  document.getElementById("usError").style.display="none";
  document.getElementById("wrong").style.display="none";
});

// to erase the error msgs when we start typing something in the password
document.getElementById("pass").addEventListener("input",() => {
  document.getElementById("passError").style.display="none";
  document.getElementById("wrong").style.display="none";
});


const API_URL= "https://dummyjson.com/auth/login"

// valid dummy credentials
// "username": "emilys",
// "password": "emilyspass"


// defining the REST API- POST
function loginApi(username,password){
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type" : "application/json",
    },
    body: JSON.stringify({ username:username, password:password }),
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
