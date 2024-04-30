document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const restartBtn = document.querySelector('.restart-btn');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

        if (gameState[cellIndex] !== '' || !gameActive) return;

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            status.textContent = 'It\'s a draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const checkDraw = () => {
        return gameState.every(cell => {
            return cell !== '';
        });
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);
});
