
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

// Handles game logic
rockButton.addEventListener('click', () => {
    playGame('rock');
});

paperButton.addEventListener('click', () => {
    playGame('paper');
});

scissorsButton.addEventListener('click', () => {
    playGame('scissors');
});


function playGame(humanChoice) {

    const possibleHands = ['rock', 'paper', 'scissors'];
    const getComputerChoice = () => possibleHands[Math.floor(Math.random() * 3)];
    // const getComputerChoice = () => hands.keys[Math.floor(Math.random() * 3)];


    const computerChoice = getComputerChoice();

    function humanWins() {
        score.wins++;
        updateScore();
    };

    function humanLoses() {
        score.losses++;
        updateScore();
    };

    function itsADraw() {
        score.draws++;
        updateScore();
    };


    function showCurrentRoundHumanHand(hand) {
        switch (hand) {
            case 'rock':
                humanHandContainer.innerHTML = `Human: <span class="human-hand-round-icon">${hands.rock}</span>`;
                break;
            case 'paper':
                humanHandContainer.innerHTML = `Human: <span class="human-hand-round-icon">${hands.paper}</span>`;
                break;
            case 'scissors':
                humanHandContainer.innerHTML = `Human: <span class="human-hand-round-icon">${hands.scissors}</span>`;
                break;
        }
    }
    

    function showCurrentRoundComputerHand(compHand) {
        switch (compHand) {
            case 'rock':
                computerHandContainer.innerHTML = `<span class="comp-hand-round-icon">${hands.rock}</span> :Computer`;
                break;
            case 'paper':
                computerHandContainer.innerHTML = `<span class="comp-hand-round-icon">${hands.paper}</span> :Computer`;
                break;
            case 'scissors':
                computerHandContainer.innerHTML = `<span class="comp-hand-round-icon">${hands.scissors}</span> :Computer`;
                break;
        }
    }


    showCurrentRoundHumanHand(humanChoice);
    showCurrentRoundComputerHand(computerChoice);
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


function updateScore(){

    const scoreBoardContainer = document.querySelector('.score-container');

    scoreBoardContainer.innerHTML = `Score:
    Wins: ${score.wins} Losses: ${score.losses} Draws: ${score.draws}
    `;

    const resetButton = document.querySelector('.reset-button');

    resetButton.addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.draws = 0;
        humanHandContainer.innerHTML = '';
        computerHandContainer.innerHTML = '';
        updateScore();
    });


}
