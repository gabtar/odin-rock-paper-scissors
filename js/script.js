// Rock beats scissors, scissors beats paper, paper beats rock

const OPTIONS = ["rock", "scissors", "paper"];

function computerPlay() {

    return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];

}

function round(playerSelection, computerSelection) {

    playerSelection = playerSelection.toLowerCase();

    let winner;
    let result;

    console.log(`Player ${playerSelection}`);
    console.log(`Computer ${computerSelection}`);

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

        result = round(playerSelection, computerPlay());
        console.log(`ROUND ${i}`);
        console.log(result);
        console.log('-----------------------');


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

    console.log(`FINAL RESULT: Player: ${playerScore} / Computer: ${computerScore}`);

}


game();
