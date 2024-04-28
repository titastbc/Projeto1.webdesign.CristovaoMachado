var userid = sessionStorage.getItem('user');
if (!userid) {
    window.location.href = 'Solutions.html';
}
var url = 'http://localhost:3000/users/' + userid;
var user = getUserData().then(user => { showUserData(user); });
function getUserData() {
    return fetch(url)
        .then(response => response.json())
        .then(user => {
            return user;
        })
        .catch(error => {
            console.error('Erro ao obter os dados do usuário:', error);
        });
}

function showUserData(user) {
    var perfilInfo = document.getElementById('perfil-info');
    perfilInfo.innerHTML = `
        <p>Nome: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <p>Morada: ${user.adress}</p>
        <p>Código Postal: ${user.cpf}</p>
        <p>País: ${user.country}</p>
    `;
}

// Event listener para o botão "Alterar"
var alterarbut = document.getElementById("alterar");
alterarbut.addEventListener("click", function() {
    var perfilinf = document.getElementById("perfilinf");
    perfilinf.style.display = "none";
    var alterarperfil = document.querySelector(".editinfo");
    alterarperfil.style.display = "block";

    // Buscar e preencher os dados do usuário nos campos de edição
    getUserData().then(user => {
        document.getElementById("nome").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("morada").value = user.adress;
        document.getElementById("codigopostal").value = user.cpf;
        document.getElementById("pais").value = user.country;
    });
});

// Event listener para o botão "Guardar Alterações"
var GuardarAlteracoes = document.getElementById("guardar");
GuardarAlteracoes.addEventListener("click", function() {
    savechanges();
});

// Função para salvar as alterações do usuário
function savechanges() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var morada = document.getElementById("morada").value;
    var codigopostal = document.getElementById("codigopostal").value;
    var pais = document.getElementById("pais").value;

    // Verificar se os campos obrigatórios estão preenchidos
    if (!nome || !email) {
        console.error('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Construir o objeto com os dados a serem atualizados
    var novoUsuario = {
        email: email,
        name: nome,
        adress: morada,
        cpf: codigopostal,
        country: pais
    };

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(response => response.json())
    .then(data => {
        alert('Alterações salvas com sucesso!');
        setTimeout(function() {
            window.location.reload(); 
        }, 2000); 
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}



