// ! =======>> Variables (Elements) =======>> //

const inputs = document.querySelectorAll('input');
const formData = document.querySelector('form');

const fNameInValid = document.getElementById('fNameInValid')
const lNameInValid = document.getElementById('lNameInValid')
const emailInValid = document.getElementById('emailInValid')
const passwordInValid = document.getElementById('passwordInValid')
const checkBox = document.getElementById('checkBox')
const ageInValid = document.getElementById('ageInValid')
let isValid = false;

const mode = document.getElementById('mode');

if (localStorage.getItem('theme') != null){
    const themeData = localStorage.getItem('theme');
    if (themeData === 'light') {
        mode.classList.replace('fa-moon', 'fa-sun')
    }else{
        mode.classList.replace('fa-sun', 'fa-moon')
    }
document.querySelector('html').setAttribute('data-theme',themeData)

}

// ? ===========>> Events ================>> //

formData.addEventListener('submit', function(e){
    e.preventDefault();
    if (isValid === true) {
        setForm();
    }
})

formData.addEventListener('input', function(){
    if(fNameValidation()&&lNameValidation()&&emailValidation()&&passwordValidation()&&ageValidation()){
        isValid = true;
    }
    else{
        isValid = false;
    }
})

inputs[3].addEventListener('input', function(){
    checkBox.classList.remove('d-none')
})

inputs[4].addEventListener('click', function () {
    let yourPasswordValue = document.getElementById("myPassword");
    if (yourPasswordValue.type === "password") {
        yourPasswordValue.type = "text";
    } else {
        yourPasswordValue.type = "password";
    }
}) 



// * ===========>> Functions =============>> //

function setForm(){
    const user = {
        first_name:inputs[0].value,
        last_name:inputs[1].value,
        email:inputs[2].value,
        password:inputs[3].value,
        age:inputs[5].value,
    }
    registerForm(user);
}


async function registerForm(userData){
    const api = await fetch ('https://movies-api.routemisr.com/signup', {
        method:'post',
        body: JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } 
    })
    const response = await api.json()


    if (response.message == 'success') {
        location.href = './index.html'
    }
    else{
        document.getElementById('message').innerHTML = response.errors?.email.message;
    }
}

// ! ===========>> Validation ============>> //

function fNameValidation(){
    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if(regexStyle.test(inputs[0].value)){
        inputs[0].classList.add('is-valid')
        inputs[0].classList.remove('is-invalid')
        fNameInValid.classList.add('d-none')
        return true;
    }
    else{
        inputs[0].classList.add('is-invalid')
        inputs[0].classList.remove('is-valid')
        fNameInValid.classList.remove('d-none')
        return false
    }
}

function lNameValidation(){
    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if(regexStyle.test(inputs[1].value)){
        inputs[1].classList.add('is-valid')
        inputs[1].classList.remove('is-invalid')
        lNameInValid.classList.add('d-none')
        return true;
    }
    else{
        inputs[1].classList.add('is-invalid')
        inputs[1].classList.remove('is-valid')
        lNameInValid.classList.remove('d-none')
        return false
    }
}

function emailValidation(){
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (regexStyle.test(inputs[2].value)) {
        inputs[2].classList.add('is-valid')
        inputs[2].classList.remove('is-invalid')
        emailInValid.classList.add('d-none')
        return true;
    }
    else{
        inputs[2].classList.add('is-invalid')
        inputs[2].classList.remove('is-valid')
        emailInValid.classList.remove('d-none')
        return false
    }
}

function passwordValidation(){
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regexStyle.test(inputs[3].value)) {
        passwordInValid.classList.add('d-none')
        return true;
    }
    else{
        passwordInValid.classList.remove('d-none')
        return false
    }
}

function ageValidation(){
    const regexStyle = /^([1-7][0-9]|80)$/;

    if (regexStyle.test(inputs[5].value)) {
        inputs[5].classList.add('is-valid')
        inputs[5].classList.remove('is-invalid')
        ageInValid.classList.add('d-none')
        return true;
    }
    else{
        inputs[5].classList.remove('is-valid')
        inputs[5].classList.add('is-invalid')
        ageInValid.classList.remove('d-none')
        return false
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

