const btn = document.getElementById('btn')


// function getGeoLocation(event) {

//   event.preventDefault()
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       // do_something(position.coords.latitude, position.coords.longitude);
//       console.log(position)
//     });
//   } else {
//     alert("I'm sorry, but geolocation services are not supported by your browser.");
//   }
// }

function login(event) {
  event.preventDefault()

  const nomeAluno = document.getElementById('username').value
  const matricula = document.getElementById('matricula').value
  const form = document.getElementById('formulario')

  if (nomeAluno == 'admin' && matricula == 'admin') {
    window.location.href = './admin.html'
  } else {
    const data = { nome: nomeAluno, matricula: matricula }
    fetch('./usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log('Usuário cadastrado com sucesso!')
        window.location.href = './aluno.html'
      })
      .catch(error => {
        console.error('Erro ao cadastrar o usuário:', error);
      })
  }

}

btn.addEventListener('click', login)