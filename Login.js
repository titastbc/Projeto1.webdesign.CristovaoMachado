
var icon = document.getElementById("login");
var regicon = document.getElementById("registo");
var perfil = document.getElementById("perfil");
var logout = document.getElementById("logout");
var login = document.querySelector(".modal");
var message = document.getElementById("message");
var gear = document.getElementById("gear");
icon.addEventListener("click", function() {
  login = document.querySelector(".modal");
  login.style.display = "block";
});

regicon.addEventListener("click", function() {
    window.location.href = "Registo.html";
    });

var close = document.querySelector(".close");

close.addEventListener("click", function() {
    login = document.querySelector(".modal");
    login.style.display = "none";
    });


    var loginForm = document.getElementById("Login"); 
    var email = document.getElementById("email");
    var password = document.getElementById("Password");
    var error = document.getElementById("error");


    loginForm.addEventListener("submit", function(event) { 
        event.preventDefault();
        if(email.value === "" || password.value === "") {
            error.style.color = "red";
            error.innerHTML = "<p>Por favor, preencha todos os campos</p>";
        } else if (!validarEmail(email.value)) {
            error.style.color = "red";
            error.innerHTML = "<p>Por favor, insira um e-mail válido</p>";
        } else {
            error.innerHTML = "";
        }
        fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            var user;
            let userFound = false;
            for(let us of users){
                if(us.email === email.value && us.password === password.value){
                    userFound = true;
                    user = us;
                    break;
                }
            }
            if (userFound) {
                if (user.active === false) {
                    error.style.color = "red";
                    error.innerHTML = "<p>Utilizador inativo!</p>";
                    return;
                }
                login.style.display = "none";
                alert("Bem vindo!");
                icon.style.display = "none";
                regicon.style.display = "none";
                perfil.style.display = "block";
                logout.style.display = "block";
                message.textContent = "Bem vindo, "  + user.name + "!";
                if(user.role === "Admin"){
                    gear.style.display = "block";
                }
                sessionStorage.setItem("user", user.id);
            } else {
                error.style.color = "red";
                error.innerHTML = "<p>Utilizador inexistente!</p>";
            }
        })
    });

    gear.addEventListener("click", function() {
        window.location.href = "Admin_utilizadores.html";
    });




    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    logout.addEventListener("click", function() {
        alert("Até à próxima!");
        icon.style.display = "block";
        regicon.style.display = "block";
        perfil.style.display = "none";
        logout.style.display = "none";
        message.textContent = "";
        gear.style.display = "none";
        sessionStorage.removeItem("user");
    });