
const score = {
    wins: 0,
    losses: 0,
    draws: 0
}

const hands = {
    rock: '✊',
    paper: '✋',
    scissors: '✌'
}

// Button selectors
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissors-button');

// Round result container selectors
const humanHandContainer = document.querySelector('.current-round-human-hand-container');
const computerHandContainer = document.querySelector('.current-round-computer-hand-container');

// Event listeners for the 3 hand buttons
rockButton.addEventListener('click', () => {
    playGame('rock');
});

paperButton.addEventListener('click', () => {
    playGame('paper');
});

scissorsButton.addEventListener('click', () => {
    playGame('scissors');
});

const getComputerChoice = () => {
    const keys = Object.keys(hands);
    const randomIndex = Math.floor(Math.random() * 3);
    return keys[randomIndex];
}

function playGame(humanChoice) {

    const computerChoice = getComputerChoice();

    const humanWins = () => {
        score.wins++;
        updateScore();
    };

    const humanLoses = () => {
        score.losses++;
        updateScore();
    };

    const itsADraw = () => {
        score.draws++;
        updateScore();
    };

    // Display the human's and computer's hands for this round

    const showCurrentRoundHands = (humanHand,compHand) => {
        switch (humanHand) {
            case 'rock':
                humanHandContainer.innerHTML = `Human - <span class="human-hand-round-icon">${hands.rock}</span>`;
                break;
            case 'paper':
                humanHandContainer.innerHTML = `Human - <span class="human-hand-round-icon">${hands.paper}</span>`;
                break;
            case 'scissors':
                humanHandContainer.innerHTML = `Human - <span class="human-hand-round-icon">${hands.scissors}</span>`;
                break;
        }

        switch (compHand) {
            case 'rock':
                computerHandContainer.innerHTML = `<span class="comp-hand-round-icon">${hands.rock}</span> - Computer`;
                break;
            case 'paper':
                computerHandContainer.innerHTML = `<span class="comp-hand-round-icon">${hands.paper}</span> - Computer`;
                break;
            case 'scissors':
                computerHandContainer.innerHTML = `<span class="comp-hand-round-icon">${hands.scissors}</span> - Computer`;
                break;
        }
    }

    showCurrentRoundHands(humanChoice,computerChoice);
    if (humanChoice === computerChoice) {
        itsADraw();
    } else {
        if (humanChoice === 'rock') {
            if (computerChoice === 'paper') {
                humanLoses();
            } else if (computerChoice === 'scissors') {
                humanWins();
            }
        } else if (humanChoice === 'paper') {
            if (computerChoice === 'scissors') {
                humanLoses();
            } else if (computerChoice === 'rock') {
                humanWins();
            }
        } else if (humanChoice === 'scissors') {
            if (computerChoice === 'rock') {
                humanLoses();
            } else if (computerChoice === 'paper') {
                humanWins();
            }
        }
    }
}

let isAutoPlaying = false;
let intervalId;

// Update and reset score logic

function updateScore(){

    const scoreBoardContainer = document.querySelector('.score-container');

    scoreBoardContainer.innerHTML = `
        <div>Wins: <b>${score.wins}</b></div>
        <div>Losses: <b>${score.losses}</b></div>
        <div>Draws: <b>${score.draws}</b></div>
    `;

    const resetButton = document.querySelector('.reset-button');

    const resetScore = () => {
        score.wins = 0;
        score.losses = 0;
        score.draws = 0;
    }


    resetButton.addEventListener('click', () => {
        resetScore();
        humanHandContainer.textContent = 'Choose a hand to begin!';
        computerHandContainer.textContent = '';
        updateScore();
    });


}


// Auto-Play logic

const autoPlayButton = document.querySelector('.auto-play-button');
autoPlayButton.addEventListener('click', () => {
    autoPlay();
});


function autoPlay() {

    if (isAutoPlaying){
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayButton.textContent = 'AUTO-PLAY';
    } else {
        playGame(getComputerChoice())
        intervalId = setInterval(() => {
            playGame(getComputerChoice())
        },500);
        isAutoPlaying = true;
        autoPlayButton.textContent = 'STOP';
    }

}

