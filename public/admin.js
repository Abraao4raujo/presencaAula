function generateCode() {
  fetch('/generate-code', {method: 'POST'})
  .then(response => response.text())
  .then(code => {
    alert(`Codigo gerado: ${code}`)
  })
  .catch(error => {
    console.log('Erro ao gerar o codigo: ', error)
  })
}

const codeButton = document.getElementById('code-button')

codeButton.addEventListener('click', generateCode)
