document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const messageElement = document.getElementById('message');
    const m = 3; // number of rows
    const n = 3; // number of columns
    const dots = (m + 1) * (n + 1);
    let currentPlayer = 'Player 1';
    let lines = new Array(dots).fill(0).map(() => new Array(dots).fill(0)); // 2D array to track lines
    let boxes = new Array(m).fill(0).map(() => new Array(n).fill(false)); // 2D array to track boxes
    let player1Score = 0;
    let player2Score = 0;
    let selectedDot = null;

    // Create the board
    createBoard();

    // Function to create the board
    function createBoard() {
        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.dataset.row = i;
                dot.dataset.col = j;
                board.appendChild(dot);
                dot.addEventListener('click', handleDotClick);
            }
        }
    }

    // Function to handle dot clicks
    function handleDotClick() {
        const row = parseInt(this.dataset.row);
        const col = parseInt(this.dataset.col);
        const dotIndex = row * (n + 1) + col;

        if (selectedDot !== null && isValidMove(selectedDot, dotIndex)) {
            drawLine(selectedDot, dotIndex);
            checkForBoxes(dotIndex);
            switchPlayer();
            displayPlayerTurn();
            selectedDot = null;
        } else {
            selectedDot = dotIndex;
        }
    }

    // Function to check if the move is valid
    function isValidMove(dotIndex1, dotIndex2) {
        const row1 = Math.floor(dotIndex1 / (n + 1));
        const col1 = dotIndex1 % (n + 1);
        const row2 = Math.floor(dotIndex2 / (n + 1));
        const col2 = dotIndex2 % (n + 1);

        // Check if dots are adjacent horizontally or vertically
        if ((Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2)) {
            // Check if the line is already drawn
            if (lines[dotIndex1][dotIndex2] || lines[dotIndex2][dotIndex1]) {
                return false;
            }
            return true;
        }
        return false;
    }

    // Function to draw a line
    function drawLine(dotIndex1, dotIndex2) {
        lines[dotIndex1][dotIndex2] = 1;
        lines[dotIndex2][dotIndex1] = 1;
        const dots = document.querySelectorAll('.dot');
        const row1 = Math.floor(dotIndex1 / (n + 1));
        const col1 = dotIndex1 % (n + 1);
        const row2 = Math.floor(dotIndex2 / (n + 1));
        const col2 = dotIndex2 % (n + 1);
        // Determine the direction of the line (horizontal or vertical)
        if (row1 === row2) {
            // Horizontal line
            dots[dotIndex1].classList.add('line-horizontal');
        } else if (col1 === col2) {
            // Vertical line
            dots[dotIndex1].classList.add('line-vertical');
    }
    }

    // Function to check for boxes
    function checkForBoxes(dotIndex) {
        const row = Math.floor(dotIndex / (n + 1));
        const col = dotIndex % (n + 1);
        let boxClosed = false;

        if (lines[dotIndex][dotIndex - 1] && lines[dotIndex][dotIndex + 1] && lines[dotIndex][dotIndex - (n + 1)]) {
            if (!boxes[row - 1][col - 1]) {
                boxes[row - 1][col - 1] = true;
                boxClosed = true;
            }
        }
        if (lines[dotIndex][dotIndex - 1] && lines[dotIndex][dotIndex + 1] && lines[dotIndex][dotIndex + (n + 1)]) {
            if (!boxes[row][col - 1]) {
                boxes[row][col - 1] = true;
                boxClosed = true;
            }
        }
        if (lines[dotIndex][dotIndex + 1] && lines[dotIndex][dotIndex - (n + 1)] && lines[dotIndex][dotIndex + (n + 1)]) {
            if (!boxes[row - 1][col]) {
                boxes[row - 1][col] = true;
                boxClosed = true;
            }
        }
        if (lines[dotIndex][dotIndex - 1] && lines[dotIndex][dotIndex - (n + 1)] && lines[dotIndex][dotIndex + (n + 1)]) {
            if (!boxes[row - 1][col - 1]) {
                boxes[row - 1][col - 1] = true;
                boxClosed = true;
            }
        }

        if (boxClosed) {
            if (currentPlayer === 'Player 1') {
                player1Score++;
            } else {
                player2Score++;
            }
            displayScores();
        }
    }

    // Function to switch player
    function switchPlayer() {
        currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    }

    // Function to display current player's turn
    function displayPlayerTurn() {
        messageElement.textContent = `${currentPlayer}'s turn`;
    }

    // Function to display scores
    function displayScores() {
        messageElement.textContent = `Player 1: ${player1Score} - Player 2: ${player2Score}`;
    }
});
