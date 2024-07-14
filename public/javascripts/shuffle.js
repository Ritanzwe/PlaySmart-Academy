let words = [];
let scrambledWord, originalWord, attemptCount;
const maxAttempts = 3;

function fetchWords() {
    fetch('https://random-word-api.herokuapp.com/word?number=10')
        .then(res => res.json())
        .then(data => {
            words = data.map(word => word.toUpperCase());
            startGame();
        })
        .catch(error => console.log(error));
}

function startGame() {
    if (words.length === 0) {
        fetchWords();
    } else {
        originalWord = words[Math.floor(Math.random() * words.length)];
        scrambledWord = scrambleWord(originalWord);
        document.getElementById("scrambleWord").textContent = scrambledWord;
        attemptCount = 0;
        document.getElementById("inputWord").value = '';
        document.getElementById("playButton").innerText = "Check";
        document.getElementById("playButton").classList.remove("btn-success", "btn-danger");
        document.getElementById("replayButton").style.display = "none";
        document.getElementById("result").innerText = "";
    }
}

function scrambleWord(word) {
    let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    if (scrambled === word) {
        return scrambleWord(word);
    }
    return scrambled;
}

function checkWord() {
    attemptCount++;
    let guessedWord = document.getElementById("inputWord").value.toUpperCase();
    if (attemptCount <= maxAttempts) {
        if (guessedWord === originalWord) {
            document.getElementById("result").innerText = `You guessed it right! The word was ${originalWord}`;
            document.getElementById("playButton").innerText = "Replay";
            document.getElementById("playButton").classList.add("btn-success");
            document.getElementById("replayButton").style.display = "block";
        } else {
            document.getElementById("result").innerText = `Try again (${maxAttempts - attemptCount} attempts left)`;
            if (attemptCount === maxAttempts) {
                document.getElementById("result").innerText = `You lost. The word was ${originalWord}`;
                document.getElementById("playButton").innerText = "Replay";
                document.getElementById("playButton").classList.add("btn-danger");
                document.getElementById("replayButton").style.display = "block";
            }
        }
    }
}

function resetGame() {
    startGame();
}

// Initial game start
fetchWords();
