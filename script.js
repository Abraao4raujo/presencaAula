const btn = document.getElementById('btn')
const dados = document.getElementById('dados')

async function getGeolocation(){
  try{
    const response = await fetch('http://ip-api.com/json')
    const data = await response.json()

    dados.innerHTML = `<br> ${data.query} <br> ${data.as} <br> ${data.org} <br> ${data.lat} <br> ${data.lon} <br> ${data.city}`
  }catch(err){
    dados.innerHTML = `Não conseguimos pegar sua localização ${err}`
  }
}

btn.addEventListener('click', () => {
  getGeolocation()
})