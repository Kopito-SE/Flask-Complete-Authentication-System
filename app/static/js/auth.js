const API = "/api/auth"

function showTab(tab){

document.querySelectorAll(".tab").forEach(t=>t.classList.add("hidden"))

document.getElementById(tab).classList.remove("hidden")

}

function message(msg){

document.getElementById("message").innerText = msg

}


async function register(){

let email = reg_email.value
let username = reg_username.value
let password = reg_password.value

let res = await fetch(`${API}/register`,{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({email,username,password})

})

let data = await res.json()

message(data.message || data.error)

}


async function verifyEmail(){

let email = verify_email.value
let code = verify_code.value

let res = await fetch(`${API}/verify-email`,{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({email,code})

})

let data = await res.json()

message(data.message || data.error)

}


async function resendCode(){

let email = verify_email.value

let res = await fetch(`${API}/resend-code`,{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({email})

})

let data = await res.json()

message(data.message || data.error)

}


async function login(){

let username = login_username.value
let password = login_password.value

let res = await fetch(`${API}/login`,{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({username,password})

})

let data = await res.json()

if(data.token){

localStorage.setItem("token",data.token)

window.location="/dashboard"

}

message(data.error || data.message)

}


async function loadProfile(){

let token = localStorage.getItem("token")

let res = await fetch(`${API}/profile`,{

headers:{

Authorization:"Bearer "+token

}

})

let data = await res.json()

profile.innerHTML = `

<p>ID: ${data.user.id}</p>
<p>Username: ${data.user.username}</p>
<p>Email: ${data.user.email}</p>

`

}


async function updateProfile(){

let token = localStorage.getItem("token")

let username = new_username.value
let email = new_email.value

let res = await fetch(`${API}/profile`,{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+token
},

body:JSON.stringify({username,email})

})

let data = await res.json()

alert(data.message || data.error)

}


async function changePassword(){

let token = localStorage.getItem("token")

let current_password = current_password.value
let new_password = new_password2.value

let res = await fetch(`${API}/change-password`,{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+token
},

body:JSON.stringify({current_password,new_password})

})

let data = await res.json()

alert(data.message || data.error)

}


async function requestReset(){

let email = reset_email.value

let res = await fetch(`${API}/request-reset-password`,{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({email})

})

let data = await res.json()

message(data.message || data.error)

showTab("reset_password")

}


async function resetPassword(){

let email = reset_email2.value
let code = reset_code.value
let new_password = new_password.value

let res = await fetch(`${API}/reset-password`,{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({email,code,new_password})

})

let data = await res.json()

message(data.message || data.error)

}


function logout(){

localStorage.removeItem("token")

window.location="/"

}