let firstNameInput = document.getElementById("firstName");
let middleNameInput = document.getElementById("middleName");
let lastNameInput = document.getElementById("lastName");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let form = document.getElementById("singUp");
let singupBtn = document.getElementById("singupButton");
let checkBtn = document.getElementById("term");

const firstName = firstNameInput.value;
const middleName = middleNameInput.value;
const lastName = lastNameInput.value;
const email = emailInput.value;
const password = passwordInput.value;
const confirmPassword = confirmPasswordInput.value;

checkBtn.addEventListener("change", function(){
    if(checkBtn.checked){
        singupBtn.style.background = "white";
        singupBtn.style.color = "pink";
        singupBtn.style.transition = "0.5s";
        singupBtn.disabled = false;
    }else{
        singupBtn.style.background = "white";
        singupBtn.style.color = "pink";
        singupBtn.disabled = true;
    }
});

form.addEventListener("submit",function(event){
    event.preventDefault();

    const emailInput = event.target[2];
    const passInput = event.target[3];
    const confirmPassInput = event.target[4];

    const emailValue = emailInput.value;
    const passValue = passInput.value;
    const confirmPassValue = confirmPassInput.value;

    const emailValidate = emailChecker(emailValue);
    const passLengthValidate = passwordLengthChecker(passValue);
    const passUpperCaseValidate = passwordUpperCaseChecker(passValue);
    const passNumberValidate = passwordNumberChecker(passValue);
    const confirmPassValidate = confirmPassChecker(passValue,confirmPassValue);

    let validateArray =[
        {
          isValidate: emailValidate,
          node: emailInput,
          value: emailValue,
          msg: "Email is Wrong",
        },
        {
          isValidate: passLengthValidate,
          node: passInput,
          value: passValue,
          msg: "Password should be at least 6 charactors",
        },
        {
          isValidate: passUpperCaseValidate,
          node: passInput,
          value: passValue,
          msg: "Password should contain at least 1 uppercase letter",
        },
        {
          isValidate: passNumberValidate,
          node: passInput,
          value: passValue,
          msg: "Password should contain at least 1 number",
        },
        {
          isValidate: confirmPassValidate,
          node: confirmPassInput,
          value: confirmPassValue,
          msg: "Confirm password is Wrong",
        },
    ];

    if(validateArray.every((item) => item.isValidate === true)){
        alert("You have successfully submitted the form!");
    }else{
        for (let val of validateArray){
            if(!val.isValidate){
                const parentNode = val.node.parentNode;
                parentNode.removeChild(parentNode.lastChild);
                parentNode.innerHTML += errorTmp(val.msg);
            }
        }
    }
});

function emailChecker(sample){
    return new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(sample);
};

function passwordLengthChecker(pass){
    let lengths = (pass.length >= 6);
    return lengths;
};

function passwordUpperCaseChecker(pass){
    let upperCaseLetters = pass.match(/[A-Z]/g);
    let result = false;
    if(upperCaseLetters == null){
        result = false;
    }else if(upperCaseLetters.length > 0){
        result = true;
    };
    return result;
};

function passwordNumberChecker(pass){
    let numbers = pass.match(/[0-9]/g);
    let result = false;
    if(numbers == null){
        result = false;
    }else if(numbers.length > 0){
        result = true;
    };
    return result;
};

function confirmPassChecker(pass,confirmPass){
    return pass === confirmPass;
};

function errorTmp(msg){
    return `<span class="text-red-600 text-sm text-thin">${msg}</span>`;
};