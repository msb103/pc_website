document.addEventListener('DOMContentLoaded', () => {
    // Pre-populate input fields with default values
    document.getElementById('size').value = 7;
    document.getElementById('numberOfPieces').value = 3;
    // Create grid when the page loads
    createBoard();

    let currentPlayer = 1;
    restartBtn.addEventListener('click', createBoard());

    // Event listener for cell click
    function handleCellClick(e) {
        const cell = e.target;
        const targetIndex = parseInt(cell.dataset.index);
        const selecter = e.target.parentElement.parentElement;
        const size = parseInt(document.getElementById('size').value);

        for (let i = 1; i <= size; i++) {
            const targetCell = selecter.querySelector(`[id="${i}"]`);
            if (targetCell) {
                if (i === targetIndex) {
                    targetCell.classList.add('selected');
                } else {
                    targetCell.classList.remove('selected');
                }
            }
        }

        markCell(currentPlayer, targetIndex);
        togglePlayer();
    }

    // Function to toggle between players
    function togglePlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    // Function to mark a cell in the grid
    function markCell(player, index) {
        const cellValue = calculateCellValue(player, index);
        // Mark the cell in the grid with the calculated value
        const cell = document.getElementById(index.toString());
        cell.textContent = cellValue;
    }

    // Function to calculate the cell value based on the current player and index
    function calculateCellValue(player, index) {
        const selecter1 = document.getElementById('selecter1');
        const selecter2 = document.getElementById('selecter2');
        const selecter3 = document.getElementById('selecter3');

        const a = parseInt(getSelectedNumber(selecter1));
        const b = parseInt(getSelectedNumber(selecter2));
        const c = parseInt(getSelectedNumber(selecter3));

        if (player === 1) {
            return a * c + b;
        } else {
            return b * c + a;
        }
    }

    // Function to get the selected number from a selecter
    function getSelectedNumber(selecter) {
        const selectedNumber = selecter.querySelector('.selected');
        return selectedNumber ? selectedNumber.textContent : null;
    }

});

// Function to create the square grid board
function createBoard() {
    const size = parseInt(document.getElementById('size').value);
    const gridContainer = document.getElementById('board');

    // Clear previous grid
    gridContainer.innerHTML = '';

    // Create and fill the grid
    const grid = document.createElement('div');
    grid.classList.add('grid');
    for (let i = 1; i <= size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = 'i';
        cell.textContent = i;
        grid.appendChild(cell);
    }
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // Set the number of columns
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // Set the number of rows

    // Add grid to container
    gridContainer.appendChild(grid);

    // Create selecters
    createSelecter(document.getElementById('selecter1'), 'col');
    createSelecter(document.getElementById('selecter2'), 'col');
    createSelecter(document.getElementById('selecter3'), 'row');
}

// Function to create a selecter
function createSelecter(selecter, gridStyle) {
    const size = parseInt(document.getElementById('size').value);

    // Clear previous grid
    selecter.innerHTML = '';

    // Create and fill the grid
    const grid = document.createElement('div');
    grid.classList.add('grid');
    for (let i = 1; i <= size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = i;
        cell.id = i;
        cell.dataset.index = i;
        grid.appendChild(cell);
        cell.addEventListener('click', handleCellClick);
    }

    // Set grid style based on gridStyle parameter
    if (gridStyle == 'col') {
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // Set the number of columns 
    }
    if (gridStyle == 'row'){
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // Set the number of rows
    }

    // Add grid to selecter container
    selecter.appendChild(grid);
}
