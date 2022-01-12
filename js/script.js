// Rock beats scissors, scissors beats paper, paper beats rock

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('new-game').onclick = resetGame;

});

const OPTIONS = ["rock", "scissors", "paper"];

function computerPlay() {
    return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
}

function playRound(playerSelection, computerSelection) {
    let winner;
    let result;

    playerSelection = playerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        result = "Tie";
    } else {

        switch (playerSelection) {
            case "rock":
                computerSelection === "scissors" ? winner = "player" : winner = "computer";
                break;

            case "scissors":
                computerSelection === "paper" ? winner = "player" : winner = "computer";
                break;

            case "paper":
                computerSelection === "rock" ? winner = "player" : winner = "computer";
                break;

        }
    }

    if (winner == "player") {
        result = `You Won! ${playerSelection} beats ${computerSelection}`;

    } else if ((winner == "computer")) {
        result = `You Lose! ${computerSelection} beats ${playerSelection}`;

    }

    return result;
}


function game() {

    let computerScore = 0;
    let playerScore = 0;

    // Game to 5 rounds
    for (let i = 0; i < 5; i++) {

        let playerSelection = "";
        let result = "";
        let valid = true;

        while (valid) {
            playerSelection = prompt("Choose your weapon {Rock, Paper, Scissors}: ").toLowerCase();
            valid = !(OPTIONS.includes(playerSelection));

        }

        result = playRound(playerSelection, computerPlay());
       
        if (result != "Tie") {

            result.includes("Won") ? playerScore++ : computerScore++;

        }

    }

    if (playerScore > computerScore) {
        console.info('Congratulations You Won!!!');
    } else if (computerScore > playerScore) {
        console.info('Sorry, you Lose the game');
    } else {
        console.info('Tie');
    }

}

// Helpers
function resetGame() {

  document.getElementById('player-score').textContent = "0";
  document.getElementById('cpu-score').textContent = "0";
  
}

