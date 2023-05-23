function confirmCode(event) {
  event.preventDefault()
  const codigo = document.getElementById('enter-code').value

  fetch('/confirm-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo })
  })
    .then(response => {
      if (response.ok) {
        alert('Presença confirmada.');
      } else {
        alert('Código incorreto. Por favor, tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro ao confirmar código:', error)
    })
}

const btnConfirm = document.getElementById('btnConfirmarCodigo')

btnConfirm.addEventListener('click', confirmCode)