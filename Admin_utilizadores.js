var users = [];

fetch('http://localhost:3000/users')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(users => {
    displayUsers(users);
})


function displayUsers(users) {
  var tableBody = document.getElementById('usersTableBody');

  users.forEach(user => {
    var row = document.createElement('tr');
    var ative = user.active ? 'Ativo' : 'Desativado';
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.email}</td>
      <td>${user.name}</td>
      <td>${user.adress}</td>
      <td>${user.cpf}</td>
      <td>${user.country}</td>
      <td>${user.role}</td>
      <td>${ative}</td>
        <td>
            <button class="ChangeActive button">Mudar o estado do utilizador</button>
        </td>
        
    `;
    tableBody.appendChild(row);
    var button = row.querySelector('.ChangeActive');
    button.addEventListener('click', function() {
        user.active = !user.active;
        fetch('http://localhost:3000/users/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            alert("Estado de ativação alterado com sucesso!");
            console.log('Sucesso:', data);
            window.location.href = "Admin_utilizadores.html";
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Ocorreu um erro ao processar a alteração de estado de ativação. Por favor, tente novamente.");
        });
    });
  });
}
  

