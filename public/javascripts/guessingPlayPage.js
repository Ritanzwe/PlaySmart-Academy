let max = 20;
let text = document.getElementById("text");
let playButton = document.getElementById("playbutton");
let replayButton = document.getElementById("replayButton");
let message = document.getElementById("message");
let randomNumber = Math.floor(Math.random() * (max + 1));
let attempts = 0;
const maxAttempts = 3;

replayButton.style.display = "none";

function NUM() {
    if (playButton.innerHTML === "Replay") {
        resetGame();
        return;
    }

    attempts++;
    let numberValue = parseInt(document.getElementById("inputNumber").value);

    if (numberValue > 20 || numberValue < 0 || isNaN(numberValue)) {
        text.textContent = "You are out of bounds. Please enter a number between 1 and 20.";
        return;
    }

    if (attempts <= maxAttempts) {
        if (randomNumber < numberValue) {
            message.textContent = "Guess lower";
        } else if (randomNumber > numberValue) {
            message.textContent = "Guess higher";
        } else {
            message.textContent = `You won! The number was ${randomNumber}`;
            playButton.style.display = "none";
            replayButton.style.display = "block";
        }
    }

    if (attempts >= maxAttempts && randomNumber !== numberValue) {
        message.textContent = `You lost. The correct number was ${randomNumber}`;
        playButton.style.display = "none";
        replayButton.style.display = "block";
    }
}

function resetGame() {
    attempts = 0;
    randomNumber = Math.floor(Math.random() * (max + 1));
    text.textContent = 'Enter a number between 0 - 20';
    document.getElementById("inputNumber").value = '';
    message.textContent = '';
    playButton.style.display = "block";
    replayButton.style.display = "none";
}
