let deckId = ''

sessionStorage.setItem('player1Score', 0)

let player1Score = Number(sessionStorage.getItem('player1Score'))

sessionStorage.setItem('player2Score', 0)

let player2Score = Number(sessionStorage.getItem('player2Score'))

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  const warURL = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image 
        document.querySelector('#player2').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if (data.remaining === 0){
          declareWinner()
        }else{
        if(player1Val > player2Val){
          document.querySelector('h3').innerText = 'Player 1 Wins'
          sessionStorage.setItem('player1Score', player1Score +=2)
          document.querySelector('#p1Score').innerText = player1Score
        }else if(player1Val < player2Val){
          document.querySelector('h3').innerText = 'Player 2 Wins'
          sessionStorage.setItem('player2Score', player2Score +=2)
          document.querySelector('#p2Score').innerText = player2Score
        }else{
          document.querySelector('h3').innerText = 'Time for War!'
          fetch(warURL)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            console.log(data)
            document.querySelector('#player1').src = data.cards[6].image 
            document.querySelector('#player2').src = data.cards[7].image
            let player1WarVal = convertToNum(data.cards[6].value)
            let player2WarVal = convertToNum(data.cards[7].value) 
            if(player1WarVal > player2WarVal){
              document.querySelector('h3').innerText = 'Player 1 Wins'
              sessionStorage.setItem('player1Score', player1Score +=8)
              document.querySelector('#p1Score').innerText = player1Score
            }else if(player1WarVal < player2WarVal){
              document.querySelector('h3').innerText = 'Player 2 Wins'
              sessionStorage.setItem('player2Score', player2Score +=8)
              document.querySelector('#p2Score').innerText = player2Score
          }
         })

          .catch(err => {
              console.log(`error ${err}`)
          });
        }
        
        
      }})
      .catch(err => {
          console.log(`error ${err}`)
      });
      
}

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}
function declareWinner(){
  if (player1Score>player2Score){
    document.querySelector('h3').innerText = 'Player 1 has won the game!'
   } else {document.querySelector('h3').innerText = 'Player 2 has won the game!'
  }
}
