document.addEventListener('DOMContentLoaded', () => {
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');
    const gameMessage = document.getElementById('game-message');
    const resetBtn = document.getElementById('reset-btn');
    const choiceButtons = document.querySelectorAll('.choice-btn');

    let scores = {
        player1: 0,
        player2: 0
    };

    let player1Choice = null;
    let player2Choice = null;

    // Function to determine the winner
    function determineWinner(choice1, choice2) {
        if (choice1 === choice2) return 'draw';

        const winningCombinations = {
            stone: 'scissors',
            paper: 'stone',
            scissors: 'paper'
        };

        if (winningCombinations[choice1] === choice2) {
            return 'player1';
        } else {
            return 'player2';
        }
    }

    // Function to update the game message
    function updateGameMessage(winner) {
        if (winner === 'draw') {
            gameMessage.textContent = "It's a draw!";
        } else {
            gameMessage.textContent = `${winner === 'player1' ? 'Player 1' : 'Player 2'} wins!`;
        }
    }

    // Function to update scores
    function updateScores(winner) {
        if (winner !== 'draw') {
            scores[winner]++;
            document.getElementById(`${winner}-score`).textContent = scores[winner];
        }
    }

    // Function to reset the game
    function resetGame() {
        scores = {
            player1: 0,
            player2: 0
        };
        player1Choice = null;
        player2Choice = null;
        player1Score.textContent = '0';
        player2Score.textContent = '0';
        gameMessage.textContent = 'Choose your moves!';
        choiceButtons.forEach(btn => {
            btn.disabled = false;
        });
    }

    // Add click event listeners to choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const player = button.closest('.player-area').querySelector('h2').textContent;
            const choice = button.getAttribute('data-choice');

            if (player === 'Player 1') {
                player1Choice = choice;
            } else {
                player2Choice = choice;
            }

            // Disable the clicked button
            button.disabled = true;

            // If both players have made their choices
            if (player1Choice && player2Choice) {
                const winner = determineWinner(player1Choice, player2Choice);
                updateGameMessage(winner);
                updateScores(winner);

                // Reset choices for next round
                player1Choice = null;
                player2Choice = null;

                // Re-enable all buttons after a short delay
                setTimeout(() => {
                    choiceButtons.forEach(btn => {
                        btn.disabled = false;
                    });
                }, 1000);
            }
        });
    });

    // Add click event listener to reset button
    resetBtn.addEventListener('click', resetGame);
}); 