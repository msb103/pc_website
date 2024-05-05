const gameStats = {
    currentPlayer : 1,
    moves : 0,
    player1Score: 0,
    player2Score: 0,
    validMove:0,
    lastMove : [0,0,0]
} 

const size = 7;

document.addEventListener('DOMContentLoaded', () => {
    // Pre-populate input fields with default values
    //document.getElementById('size').value = 7;
    //document.getElementById('numberOfPieces').value = 3;
    const messageElement = document.getElementById('message');
    const player1ScoreElement = document.getElementById('player1Score');
    const player2ScoreElement = document.getElementById('player2Score');
    
    messageElement.classList.add('player1');
    messageElement.textContent = `Player ${gameStats.currentPlayer}'s turn`;
    player1ScoreElement.textContent = `Player 1 Score : ${gameStats.player1Score} `;
    player2ScoreElement.textContent = `Player 2 Score : ${gameStats.player2Score} `;
    // Create grid when the page loads
    //const gridTop = document.getElementById('gridTop');
   

    createBoard(size);

    function createBoard(size) {
        //const size = parseInt(document.getElementById('size').value);
        //const size = 7;
        const gridContainer = document.getElementById('board');
    
        // Clear previous grid
        gridContainer.innerHTML = '';
    
        // Check if inputs are valid
        if (isNaN(size) || size < 2 || size > 10) {
            alert('Please enter a valid size between 2 and 10.');
            return;
        }
    
        // Create and fill the grid
        const grid = document.createElement('div');
        grid.classList.add('grid');
        for (let i = 1; i <= size * size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = 'b'+i;
            cell.textContent = i;
            grid.appendChild(cell);
        }
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // Set the number of columns
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // Set the number of rows
    
        // Add grid to container
        gridContainer.appendChild(grid);
        //adjustSliderWidths();
        //const selecter = document.getElementById('selecter1');
        createSelecter(document.getElementById('selecter1'),'col');
        createSelecter(document.getElementById('selecter2'),'col');
        createSelecter(document.getElementById('selecter3'),'row');
        updateOps(gameStats.currentPlayer);

        
    }

    function updateOps(currentPlayer) {

        if (currentPlayer == 1) {
            var cell = document.getElementById('opera1');
            var img = document.createElement('img');
            img.src = './arithmo/multiplyp1.png';
            img.alt = 'Description of the image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover'; 
            if(gameStats.moves>0) {
                cell.removeChild(cell.firstChild);
            }
            cell.appendChild(img);

            var cell = document.getElementById('opera2');
            var img = document.createElement('img');
            img.src = './arithmo/addp1.png';
            img.alt = 'Description of the image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover'; 
            if(gameStats.moves>0) {
                cell.removeChild(cell.firstChild);
            }
            //cell.removeChild(cell.firstChild);
            cell.appendChild(img);
        } else{
            var cell = document.getElementById('opera1');
            var img = document.createElement('img');
            img.src = './arithmo/addp2.png';
            img.alt = 'Description of the image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover'; 
            if(gameStats.moves>0) {
                cell.removeChild(cell.firstChild);
            }
            //cell.removeChild(cell.firstChild);
            cell.appendChild(img);

            var cell = document.getElementById('opera2');
            var img = document.createElement('img');
            img.src = './arithmo/multiplyp2.png';
            img.alt = 'Description of the image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover'; 
            if(gameStats.moves>0) {
                cell.removeChild(cell.firstChild);
            }
            //cell.removeChild(cell.firstChild);
            cell.appendChild(img);

        }
          

    };
    
    function createSelecter(selecter, gridStyle) {
        //const size = parseInt(document.getElementById('size').value);
    
        //const selecter1 = document.getElementById('selecter1');
        //console.log('Selecter1:', selecter1);
    
        // Clear previous grid
        selecter.innerHTML = '';
        // Check if inputs are valid
        if (isNaN(size) || size < 2 || size > 10) {
            alert('Please enter a valid size between 2 and 10.');
            return;
        }
    
        // Create and fill the grid
        const grid = document.createElement('div');
        grid.classList.add('grid');
        
    
        if (gridStyle == 'col') {
            grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // Set the number of columns 
            for (let i = 1; i <= size; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = i;
                cell.id = 's'+ i;
                cell.dataset.index = i;
                grid.appendChild(cell);
                cell.addEventListener('click', (e) => handleCellClick(e, gameStats.currentPlayer));
            }
        }
        if (gridStyle == 'row'){
            grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // Set the number of rows
            for (let i = 1; i <= size; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = i-1;
                cell.id = 's'+ i;
                cell.dataset.index = i;
                grid.appendChild(cell);
                cell.addEventListener('click', (e) => handleCellClick(e, gameStats.currentPlayer));
            }
        }
    
        // Add grid to container
        selecter.appendChild(grid);
        //selecter.textContent = selecter.id;
        
    }
    
    function handleCellClick(e, currentPlayer) {
        //selecter = e.
        //clearSelection();
        const targetCell = e.target;
        //targetCell.classList.add('selected');
        const targetIndex = parseInt(targetCell.dataset.index);
        const targetSelecter = e.target.parentElement.parentElement;
        const selectedCell = targetSelecter.querySelector('.selected');
        //const size = parseInt(document.getElementById('size').value);
        console.log('cell:', size);
    
        //console.log('event status:', selectedCell.parentElement);
    
        if (validMove(gameStats, targetSelecter)>0){
            
            for (let i = 1;  i <=size ; i++) {
                
                const cell = targetSelecter.querySelector(`[id="s${i}"]`);
                console.log('target index:', targetIndex);
                if (cell) {

                cell.classList.remove('selected-player1', 'selected-player2', 'selected');
                
                
                    if(i == targetIndex){
                        if (targetSelecter.id === 'selecter'+1){
                            cell.classList.add('selected-player1'); // Apply 'selected' class to highlight the cell
                        } 
                        if(targetSelecter.id === 'selecter'+2){
                            cell.classList.add('selected-player2'); // Apply 'selected' class to highlight the cell
                        } 
                        if(targetSelecter.id === 'selecter'+3 && gameStats.moves > 2){
                            cell.classList.add('selected'); // Apply 'selected' class to highlight the cell
                        } else {
                            cell.classList.remove('selected');
                        }

                        console.log('target cell :', targetCell);
                    }
                    

                }
                
            }
            markCell(gameStats);
            
    
        }
        updateMessages(gameStats);
    
        
        console.log('selecter:', targetSelecter);
    }
        
    // Function to mark a cell in the grid

    function validMove(gameStats, selecter) {
        const selecter1 = document.getElementById('selecter1');
        const selecter2 = document.getElementById('selecter2');
        const selecter3 = document.getElementById('selecter3');
    
        const a = parseInt(getSelectedNumber(selecter1));
        const b = parseInt(getSelectedNumber(selecter2));
        const c = parseInt(getSelectedNumber(selecter3));
        //thisMove = [a,b,c];

        if(gameStats.moves<2){
        
            if (gameStats.currentPlayer === 1 && (selecter.id === 'selecter'+1)){
                gameStats.moves++;
                gameStats.validMove = 1;
                
                return 1;
            }
            if (gameStats.currentPlayer === 2 && (selecter.id === 'selecter'+2)){
                gameStats.moves++;
                gameStats.validMove = 1;
                
                return 2;
                
            } else {
                gameStats.validMove = 0;
                return 0;
            }
        } else{

            
                if (gameStats.currentPlayer === 1 && (selecter.id === 'selecter'+1 || selecter.id === 'selecter'+3) ){
                    gameStats.moves++;
                    gameStats.validMove = 1;
                    
                    return 1;
                }
                if (gameStats.currentPlayer === 2 && (selecter.id === 'selecter'+2 || selecter.id === 'selecter'+3) ){
                    gameStats.moves++;
                    gameStats.validMove = 1;
                    
                    return 2;
                    gameStats.moves = gameStats.moves+1;
                } else {
                    gameStats.validMove = 0;
                    return 0;
                }
            if (gameStats.lastMove === thisMove) {
            }
            else {
                return -1;
            }
        }


    }

    function markCell(gameStats) {
        const cellValue = calculateNewMark(gameStats.currentPlayer);
        // Mark the cell in the grid with the calculated value
        const brd = document.getElementById('board');
        const cell = brd.querySelector(`#b${cellValue}`);
        //const cell = document.getElementById('board').querySelector(`#i${cellValue}`);
        if (cell !== null) {
            if (gameStats.currentPlayer === 1) {
                if (cell.classList.contains('selected-player2')){
                    cell.classList.remove('selected-player2');
                    player1ScoreElement.textContent = `Player 1 Score : ${gameStats.player1Score} `;
                    setTimeout(() => {
                        //cell.classList.remove('invalid-move');
                        console.log('timeout')
                    }, 1000);
                    gameStats.player1Score++;
                } 
                cell.classList.add('selected-player1');
            } else if (gameStats.currentPlayer === 2) {
                if (cell.classList.contains('selected-player1')){
                    cell.classList.remove('selected-player1');
                    player2ScoreElement.textContent = `Player 2 Score : ${gameStats.player2Score} `;
                    
                    setTimeout(() => {
                        //cell.classList.remove('invalid-move');
                        console.log('timeout')
                    }, 1000);
                    gameStats.player2Score++;
                } 
                cell.classList.add('selected-player2');
            }
        }
    }
    
    // Function to updated messages
    function updateMessages(gameStats) {
        
        if(gameStats.validMove>0){
            gameStats.currentPlayer = gameStats.currentPlayer === 1 ? 2 : 1;
            messageElement.classList.remove('player1', 'player2');
            if (gameStats.currentPlayer === 1) {
                messageElement.classList.add('player1');
                messageElement.textContent = `Player ${gameStats.currentPlayer}'s turn`;
            } else {
                messageElement.classList.add('player2');
                messageElement.textContent = `Player ${gameStats.currentPlayer}'s turn`;
            }
            //messageElement.textContent = `Player ${gameStats.currentPlayer}'s turn`;
            //player1ScoreElement.textContent = 'Player 1 Score';
            player1ScoreElement.textContent = `Player 1 Score : ${gameStats.player1Score} `;
            player2ScoreElement.textContent = `Player 2 Score : ${gameStats.player2Score} `;
            updateOps(gameStats.currentPlayer);
        }
        if(gameStats.validMove==0){
            messageElement.classList.remove('player1', 'player2');
            if (gameStats.currentPlayer === 1) {
                messageElement.classList.add('player1');
                messageElement.textContent = `Please Select from the Player ${gameStats.currentPlayer}'s grid`;
            } else {
                messageElement.classList.add('player2');
                messageElement.textContent = `Please Select from the Player ${gameStats.currentPlayer}'s grid`;
            }

        }
        if(gameStats.validMove==-1){
            messageElement.classList.remove('player1', 'player2');
            if (gameStats.currentPlayer === 1) {
                messageElement.classList.add('player1');
                messageElement.textContent = `Please select a new value`;
            } else {
                messageElement.classList.add('player2');
                messageElement.textContent = `Please select a new value`;
            }

        }
        
    }
    
    // Function to calculate the cell value based on the current player and index
    function calculateNewMark(player) {
        const selecter1 = document.getElementById('selecter1');
        const selecter2 = document.getElementById('selecter2');
        const selecter3 = document.getElementById('selecter3');
    
        const a = parseInt(getSelectedNumber(selecter1));
        const b = parseInt(getSelectedNumber(selecter2));
        const c = parseInt(getSelectedNumber(selecter3));
    
        if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
            //gameStats.lastMove = [a,b,c];
            if (player === 1) {
                return a * c + b;
                
            } else {
                return b * c + a;
            }
            
        } else {
            messageElement.classList.remove('player1', 'player2');
            if (player === 1) {
                messageElement.classList.add('player1');
                messageElement.textContent = `Player ${player}'s turn`;
            } else {
                messageElement.classList.add('player2');
                messageElement.textContent = `Player ${player}'s turn`;
            }
            
        }
    
    }
    
    // Function to get the selected number from a selecter
    function getSelectedNumber(selecter) {
        if (selecter.id === 'selecter'+1) {
            const selectedNumber = selecter.querySelector('.selected-player1');
            return selectedNumber ? selectedNumber.textContent : null;
        }
        if (selecter.id === 'selecter'+2) {
            const selectedNumber = selecter.querySelector('.selected-player2');
            return selectedNumber ? selectedNumber.textContent : null;
        }
        if (selecter.id === 'selecter'+3) {
            const selectedNumber = selecter.querySelector('.selected');
            return selectedNumber ? selectedNumber.textContent : null;
        }
    }
    
    function clearSelection(selecter) {
        const selectedCell = selecter.querySelector('.selected');
        if (selectedCell) {
            selectedCell.classList.remove('selected');
        }
    }
    
    
});




