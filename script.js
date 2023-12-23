let randNum = parseInt((Math.random()*100+1))

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver= document.querySelector('.resultParas');

const p= document.createElement('p')

let prevGuess=[]
let numGuesses=1 

let playGame = true 

if(playGame){

    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess)
    })
}

function validateGuess(guess){

    if(isNaN(guess)){
        alert('please enter a valid number')
    }else if(guess<1){
        alert('number shoul be between 1 and 100')
    }else if(guess>100){
        alert('number shoul be between 1 and 100')
    }
    else{
        prevGuess.push(guess)
        if(numGuesses===11){
            displayGuess(guess)
            displayMessage(`Game over.Random number was ${randNum}`)
            endGame()
        }else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }

}

function checkGuess(guess){
    if(guess === randNum){
        displayMessage("Congratulations! You got it right.")
        endGame()
    }else if(guess<randNum){
        displayMessage("Number is too low")
    }else{
        displayMessage("Number is too high")

    }

}

/*function displayMessage(guess){

}
*/
function displayMessage(message){
    lowOrHi.innerHTML=`<h2>${message}</h2>`;
    
}

function displayGuess(guess){
    userInput.value=''
    guessSlot.innerHTML += `${guess} , `
    numGuesses++;
    remaining.innerHTML=`${11-numGuesses}`


}

function newGame(){
    const newGameButton=document.querySelector('#newGame')
    newGameButton.addEventListener('click',function(e){
        randNum = parseInt(Math.random()*100+1);
        prevGuess=[]
        numGuesses=1
        guessSlot.innerHTML=''
        remaining.innerHTML=`${11-numGuesses}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame=true
    })
}

function endGame(){
    userInput.value=''
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML=`<h2 id='newGame'>Start New Game</h2>`
    startOver.appendChild(p)
    playGame=false
    newGame()
}