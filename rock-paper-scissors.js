let score =JSON.parse(localStorage.getItem('score')) || 
{
    wins : 0,
    losses : 0,
    ties : 0
  };


updateScoreElement();

function pickComputerMove() {
let randomNumber = Math.random();
if(randomNumber < 1/3){
return 'Rock';}
else if(randomNumber >= 1/3 && randomNumber < 2/3){
return 'Paper';}
else{
return 'Scissors';}
}

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//}
function autoPlay(){
  if(!isAutoPlaying){
  intervalId = setInterval(() => {
  const playerMove = pickComputerMove();
playGame(playerMove);
}, 1000);
  
  isAutoPlaying = true;
  }else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  });
document.querySelector('.js-scissors-button')
  .addEventListener('click', () =>{
    playGame ('Scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('Rock');
  }else if(event.key === 'p'){
    playGame('Paper');
  }else if(event.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove){
computerMove = pickComputerMove();
let result = '';

if(playerMove === 'Scissors'){
  if (computerMove === 'Rock') {result = 'You Lose';}
  else if (computerMove === 'Paper') {result = 'You Win';}
  else if(playerMove === 'Scissors'){result = 'Tie';}
          
}else if(playerMove === 'Paper'){
  if (computerMove === 'Rock') {result = 'You Win';}
  else if (computerMove === 'Paper') {result = 'Tie';}
  else if(computerMove === 'Scissors'){result = 'You Lose';}

}else if(playerMove === 'Rock'){
  if (computerMove === 'Rock') {result = 'Tie';}
  else if (computerMove === 'Paper') {result = 'You Lose';}
  else if(computerMove === 'Scissors'){result = 'You Win';} 
}

if(result === 'You Win'){score.wins += 1;}
else if(result === 'You Lose'){score.losses += 1;}
else if(result === 'Tie'){score.ties += 1;}

localStorage.setItem('score',JSON.stringify( score));

updateScoreElement();

document.querySelector('.js-result')
.innerHTML = result;

document.querySelector('.js-moves').innerHTML = `  You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer</p>`;
}

function updateScoreElement(){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;         
}
