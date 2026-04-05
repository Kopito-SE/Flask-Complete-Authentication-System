const API = "http://127.0.0.1:5000/api/auth";

function showForm(id){

document.querySelectorAll(".form").forEach(f=>{
f.classList.add("hidden")
})

document.getElementById(id).classList.remove("hidden")
}


function showResult(data){
document.getElementById("result").innerText =
JSON.stringify(data,null,2)
}


// REGISTER
async function register(){

let email = document.getElementById("reg_email").value
let username = document.getElementById("reg_username").value
let password = document.getElementById("reg_password").value

let res = await fetch(`${API}/register`,{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,username,password})

})

let data = await res.json()

showResult(data)

}


// LOGIN
async function login(){

let username = document.getElementById("login_username").value
let password = document.getElementById("login_password").value

let res = await fetch(`${API}/login`,{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})

})

let data = await res.json()

if(data.token){
localStorage.setItem("token",data.token)
}

showResult(data)

}


// VERIFY EMAIL
async function verifyEmail(){

let email = document.getElementById("verify_email").value
let code = document.getElementById("verify_code").value

let res = await fetch(`${API}/verify-email`,{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,code})

})

let data = await res.json()

showResult(data)

}


// RESET PASSWORD
async function resetPassword(){

let email = document.getElementById("reset_email").value
let code = document.getElementById("reset_code").value
let new_password = document.getElementById("new_password").value

let res = await fetch(`${API}/reset-password`,{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,code,new_password})

})

let data = await res.json()

showResult(data)

}