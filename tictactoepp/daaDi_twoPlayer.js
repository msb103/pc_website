document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restartBtn');
    const messageElement = document.getElementById('message');
    let currentPlayer = 'X';
    let moves = 0;
    let playerXCount = 0;
    let playerOCount = 0;
    let selectedCell = null;

    board.addEventListener('click', handleCellClick);
    restartBtn.addEventListener('click', restartGame);

    function handleCellClick(e) {
        const cell = e.target;
        if (!cell.classList.contains('cell')) return;

        if (moves < 6) {
            if (cell.textContent === '') {
                cell.textContent = currentPlayer;
                moves++;
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (cell.textContent === 'X') {
                    playerXCount++;
                } else {
                    playerOCount++;
                }
                checkWin(); // Check for win after initial placement
            }
        } else {
            if (selectedCell) {
                const selectedCellIndex = parseInt(selectedCell.dataset.index);
                const cellIndex = parseInt(cell.dataset.index);
                const adjacentCells = getAdjacentCells(selectedCellIndex);
                if (adjacentCells.length != 0) {
                    if (adjacentCells.includes(cellIndex) && cell.textContent === '') {
                        if (selectedCell.textContent === currentPlayer) {
                            cell.textContent = selectedCell.textContent;
                            selectedCell.textContent = '';
                            moves++;
                            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                            checkWin();
                            
                            //displayPlayerTurn(); // Display initial player's turn
                        } else {
                            cell.classList.add('invalid-move');
                            setTimeout(() => {
                                cell.classList.remove('invalid-move');
                            }, 1000);
                            
                        }
                    }
                    selectedCell.classList.remove('selected');
                    selectedCell = null;
                } else{
                    selectedCell.classList.remove('selected');
                    selectedCell = null;
                    cell.classList.add('invalid-move');
                        setTimeout(() => {
                            cell.classList.remove('invalid-move');
                            messageElement.textContent = 'this cell doesnot have any empty adjacent cells. pick another cell'
                        }, 1000);
                    
                }
            
            } else if (cell.textContent !== '') {
                if (cell.textContent === currentPlayer) {
                    selectedCell = cell;
                    cell.classList.add('selected');
                    //displayPlayerTurn(); // Display initial player's turn
                }
            }
        
        }
        
    }
    function getAdjacentCells(index) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const adjacentCells = [];
        for (let i = Math.max(0, row - 1); i <= Math.min(2, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(2, col + 1); j++) {
                const adjIndex = i * 3 + j;
                const temp = document.querySelector(`[data-index="${adjIndex}"]`);
                if (temp != null){
                    if (adjIndex !== index && temp.textContent === '' ) {
                        adjacentCells.push(adjIndex);
                    }
                }
            }
        }
        return adjacentCells;
    }

    function restartGame() {
        const cells = document.querySelectorAll('.cell');
        for (let cell of cells) {
            cell.textContent = '';
            cell.classList.remove('selected'); // Clear the 'selected' class
        }
        currentPlayer = 'X';
        moves = 0;
        playerXCount = 0;
        playerOCount = 0;
        selectedCell = null;
        messageElement.textContent = '';
        board.addEventListener('click', handleCellClick);
    }

    function checkWin() {
        const cells = document.querySelectorAll('.cell');
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                messageElement.textContent = `Player ${cells[a].textContent} wins!`;
                board.removeEventListener('click', handleCellClick);
                break;
            } else{
                displayPlayerTurn(); // Display initial player's turn
            }
        }
    }

    function displayPlayerTurn() {
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }

    
});