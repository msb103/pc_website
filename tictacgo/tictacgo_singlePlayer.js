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
        const board = document.getElementById('board');
        if (!cell.classList.contains('cell')) return;
        if (currentPlayer === 'X') {
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
                /*
                if (currentPlayer === 'O') {
                    const emptyCells = document.querySelectorAll('.cell:not(.selected)');
                    const randomIndex = Math.floor(Math.random() * emptyCells.length);
                    const selectedCell = emptyCells[randomIndex];
                    selectedCell.textContent = currentPlayer;
                    moves++;
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    checkWin();
                }*/

                
                if (selectedCell) {
                    const selectedCellIndex = parseInt(selectedCell.dataset.index);
                    const cellIndex = parseInt(cell.dataset.index);
                    const adjacentCells = getAdjacentCells(selectedCellIndex);
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
                } else if (cell.textContent !== '') {
                    if (cell.textContent === currentPlayer) {
                        selectedCell = cell;
                        cell.classList.add('selected');
                        //displayPlayerTurn(); // Display initial player's turn
                    }
                } 
            }
            
        }
        board.removeEventListener('click', handleCellClick);
        playO(board);
        
    }

    function playO(board) {
        //const board = document.getElementById('board');
        const emptyCells = getEmptyCells();
        
        if (moves < 6 && emptyCells.length != 0 ) {
            let newMarkIndex = Math.floor(Math.random() * emptyCells.length);
            newCellIndex = emptyCells[newMarkIndex];
            const cell = board.querySelector(`#c${newCellIndex}`);
            cell.textContent = 'O';                moves++;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (cell.textContent === 'X') {
                playerXCount++;
            } else {
                playerOCount++;
            }
            checkWin(); 
        }

        if (moves > 6 && emptyCells.length !=0 ){
            const moveOptions = [];
            for(let i = 1; i<= emptyCells.length ; i++){
                const cells = board.querySelectorAll('.cell');
                cells.forEach(cell => {
                    // Check if the textContent of the cell matches the value you're searching for
                    if (cell.textContent.trim() === 'O') {
                        const cellIndex = parseInt(cell.dataset.index);
                        adjCells = getAdjacentCells(cellIndex);
                        for (j = 1; j <= adjCells.length(); j++){
                            moveOptions.push([cellIndex,adjCells[i]]);
                        }

                    }
                });
            }
            
            // fill code to pick newCellIndex
            let newOption = Math.floor(Math.random() * moveOptions.length) + 1;
            fromCell = moveOptions[newOption];

            const cell = board.querySelector(`#c${newCellIndex}`);
            cell.textContent = 'O';                moves++;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (cell.textContent === 'X') {
                playerXCount++;
            } else {
                playerOCount++;
            }
            checkWin(); 


        }
        board.addEventListener('click', handleCellClick);
    }

    function getAdjacentCells(index) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const adjacentCells = [];
        for (let i = Math.max(0, row - 1); i <= Math.min(2, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(2, col + 1); j++) {
                const adjIndex = i * 3 + j;
                //const temp = document.querySelector(`[data-index="${adjIndex}"]`);
                const temp = document.querySelector(`#c${adjIndex}`);
                if (adjIndex !== index && temp.textContent === '' ) {
                    adjacentCells.push(adjIndex);
                }
            }
        }
        return adjacentCells;
    }

    function getEmptyCells() {
        const board = document.getElementById('board');
        const emptyCells = [];
        for (let i = 1 ; i <=9 ; i++) {
            const cell = board.querySelector(`#c${i}`);
            if (cell.textContent === "") {
                emptyCells.push(i);
            }
            

        }
        return emptyCells;
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