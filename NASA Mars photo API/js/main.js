//Gets random photo from Mars on date chosen and displays photo and which rover took the photo


document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)

  const url = ` https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${choice}&api_key=eGEs6RfZbUnmoyR8If0zsOr4COzDBQZowUnoWzTk`
 
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        let randomNum = Math.random().ceil
        document.querySelector('img').src = data.photos[Math.ceil(Math.random() * Number(data.photos.length))].img_src
       document.querySelector('h3').innerText = data.photos[1].rover.name
 
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

