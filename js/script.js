document.addEventListener('DOMContentLoaded', function() {

  let game = {
    inProgress: true,
    score: {
      player: 0, computer: 0
    },
    winner: undefined,
    scoreToWin: 5
  }

  document.getElementById('help-menu').addEventListener('click', () => {
    document.getElementById('help').style.display = "block";
  })

  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('help').style.display = "none";
  });

  document.getElementById('new-game').onclick = () => {

    if(game.inProgress) {
      if(!window.confirm("Game in progress. Are you sure you want to start a new game?")) {
        return;
      }
    }

    resetScore();
    game = {
      ...game,
      inProgress: true,
      score: {
        player: 0, computer: 0
      },
      winner: undefined,
    }

    setStatus("New game");
    setTimeout(() => setStatus("Your Turn"), 500);
  }

  document.querySelectorAll('.options>button').forEach((button) => {

    button.addEventListener('click', (event) => {

      if(game.winner) {
        return;
      }

      let playerSelection = event.target.id;
      let computerSelection = computerPlay();
      let result = "Tie, select again";

      // Update selection for each player
      updateSelection("computer", computerSelection);
      updateSelection("player", playerSelection);

      roundResult = playRound(playerSelection, computerSelection);

      // Update scores
      if(roundResult !== "Tie") {
        game.score[roundResult] += 1;
        updateScore(roundResult, game.score[roundResult])
      }

      if (roundResult == "player") {
        result = `You Won! ${playerSelection} beats ${computerSelection}`;

      } else if ((roundResult == "computer")) {
        result = `You Lose! ${computerSelection} beats ${playerSelection}`;

      }

      setStatus(result);

      if(game.score.player == game.scoreToWin || game.score.computer == game.scoreToWin) {
        game.winner = roundResult;
        game.inProgress = false;
        setStatus(`${roundResult} won the game`.toUpperCase())
        document.getElementById('status').classList.add('finished');
      }

    });

  });

});

// Helpers
const OPTIONS = ["rock", "scissors", "paper"];

function computerPlay() {
  return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
}

function playRound(playerSelection, computerSelection) {
  let winner = "Tie";

  if (playerSelection !== computerSelection) {

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

  return winner;
}

function resetScore() {
  document.getElementById('player-score').textContent = "0";
  document.getElementById('computer-score').textContent = "0";
  document.getElementById('status').classList.remove('finished');
}

function setStatus(message) {
  node = document.getElementById('status');
  node.textContent = message; 
  node.classList.toggle('animate-fadeInOut');
  setTimeout(() => node.classList.remove('animate-fadeInOut'), 500);
}

function updateScore(player, score) {
  document.getElementById(`${player}-score`).textContent = score;
}

function updateSelection(player, selection) {

  const node = document.getElementById(`${player}-selection`);
  document.getElementById(`${player}-selection-text`).textContent = selection.toUpperCase();

  node.innerHTML = `<i class="far fa-hand-${selection}"></i>`;

  node.classList.add('animate-fadeInOut');
  setTimeout(() => node.classList.remove('animate-fadeInOut'), 500);

}
