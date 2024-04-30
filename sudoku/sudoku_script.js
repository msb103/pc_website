document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const solveBtn = document.querySelector('.solve-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const newGameBtn = document.querySelector('.new-game-btn');
    const message = document.querySelector('.message');

    let sudokuGrid = [];

    function initializeGrid() {
        sudokuGrid = [];
        for (let i = 0; i < 9; i++) {
            sudokuGrid[i] = [];
            for (let j = 0; j < 9; j++) {
                sudokuGrid[i][j] = 0;
            }
        }
    }

    function generateSudoku() {
        initializeGrid();
        // Generate a valid Sudoku puzzle
        // This is a placeholder, you can use any algorithm to generate Sudoku puzzles
        // For simplicity, here's an example of a predefined puzzle
        sudokuGrid = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
        renderGrid();
    }

    function renderGrid() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (sudokuGrid[i][j] !== 0) {
                    cell.textContent = sudokuGrid[i][j];
                    cell.classList.add('initial');
                } else {
                    cell.contentEditable = true;
                    cell.addEventListener('input', () => {
                        updateGrid(i, j, parseInt(cell.textContent) || 0);
                    });
                }
                board.appendChild(cell);
            }
        }
    }

    function updateGrid(row, col, value) {
        sudokuGrid[row][col] = value;
        if (!isValidPlacement(row, col, value)) {
            sudokuGrid[row][col] = 0;
            message.textContent = 'Invalid placement!';
            setTimeout(() => {
                message.textContent = '';
            }, 2000);
        }
    }

    function isValidPlacement(row, col, value) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (sudokuGrid[i][col] === value && i !== row) {
                return false;
            }
        }
        // Check column
        for (let j = 0; j < 9; j++) {
            if (sudokuGrid[row][j] === value && j !== col) {
                return false;
            }
        }
        // Check 3x3 grid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (sudokuGrid[i][j] === value && (i !== row || j !== col)) {
                    return false;
                }
            }
        }
        return true;
    }

    function solveSudoku() {
        // Solve the Sudoku puzzle
        // This is a placeholder, you can use any algorithm to solve Sudoku puzzles
        // For simplicity, just copying the initial puzzle for demonstration purposes
        sudokuGrid = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
        renderGrid();
    }

    function clearGrid() {
        initializeGrid();
        renderGrid();
    }

    newGameBtn.addEventListener('click', generateSudoku);
    solveBtn.addEventListener('click', solveSudoku);
    clearBtn.addEventListener('click', clearGrid);

    // Generate initial Sudoku puzzle when the page loads
    generateSudoku();
});
