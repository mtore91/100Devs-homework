//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase()
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        data.abilities.forEach(element => document.querySelector('ul').innerHTML+=`<li>${element.ability.name}</li>`)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}