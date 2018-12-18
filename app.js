/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Games values
let min = 1, 
    max = 10, 
    winningNum = getRandomNum(min, max), 
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      
// Assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', e => {
  if (e.target.classList.contains('play-again')) {
    // reload page
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', () => {
  // Convert input from string to int
  let guess = parseInt(guessInput.value);
  console.log(guess);
  
  // Validate input. Note:- you can use isNaN(guess) instead of !guess.
  if (!guess || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  // Check if won
  if (guess === winningNum) {
    // Game over - won

    gameOver(true, `${winningNum} is correct, YOU WIN!`)
  } else {
    // Wrong number
    guessesLeft--;

    if (guessesLeft === 0) {
      // Game over - lost  
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// Game Over
function gameOver(won, msg) {
  // Disable input
  guessInput.disabled = true;
  // Change border color
  let color = won ? 'green' : 'red'
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.classList.add('play-again');
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}