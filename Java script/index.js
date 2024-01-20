// ! =======>> Variables (Elements) =======>> //

const inputs = document.querySelectorAll('input');
const formData = document.querySelector('form');
const emailInValid = document.getElementById('emailInValid')
const passwordInValid = document.getElementById('passwordInValid')
let isValid = false;
const mode = document.getElementById("mode");

if (localStorage.getItem('theme') != null){
    const themeData = localStorage.getItem('theme');
    if (themeData === 'light') {
        mode.classList.replace('fa-sun', 'fa-moon')
    }else{
        mode.classList.replace('fa-moon', 'fa-sun')
    }
    document.querySelector('html').setAttribute('data-theme',themeData)

}

// ! ===========>> Events ================>> //

formData.addEventListener('submit', function(e){
    e.preventDefault();
    if (isValid === true) {
        setForm();
    }
})

formData.addEventListener('input', function(){
    if(emailValidation()&&passwordValidation()){
        isValid = true;
    }
    else{
        isValid = false;
    }
})

inputs[1].addEventListener('input', function(){
    checkBox.classList.remove('d-none')
})

inputs[2].addEventListener('click', function () {
    let yourPasswordValue = document.getElementById("yourPassword");
    if (yourPasswordValue.type === "password") {
        yourPasswordValue.type = "text";
    } else {
        yourPasswordValue.type = "password";
    }
}) 


// ! ===========>> Functions =============>> //

function setForm(){
    const user = {
        email:inputs[0].value,
        password:inputs[1].value,
    }
    loginForm(user);
}


async function loginForm(userData){
    const api = await fetch ('https://movies-api.routemisr.com/signin', {
        method:'post',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } 
    })
    const response = await api.json()


    if (response.message == 'success') {
        localStorage.setItem('uToken', response.token)
        location.href = './home.html'
    }
    else{
        document.getElementById('message').innerHTML = response.message;
    }
}


function myMode(){
    if (mode.classList.contains("fa-sun")) {
        document.querySelector("html").setAttribute("data-theme", "light");
        mode.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    } 
    else {
        mode.classList.replace("fa-moon", "fa-sun");
        document.querySelector("html").setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}






// ! ===========>> Validation ============>> //


function emailValidation(){
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (regexStyle.test(inputs[0].value)) {
        inputs[0].classList.add('is-valid')
        inputs[0].classList.remove('is-invalid')
        emailInValid.classList.add('d-none')
        return true;
    }
    else{
        inputs[0].classList.add('is-invalid')
        inputs[0].classList.remove('is-valid')
        emailInValid.classList.remove('d-none')
        return false
    }
}

function passwordValidation(){
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regexStyle.test(inputs[1].value)) {
        passwordInValid.classList.add('d-none')
        return true;
    }
    else{
        passwordInValid.classList.remove('d-none')
        return false
    }
}


