document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    const backBtn = document.getElementById('backBtn');
    const forwardBtn = document.getElementById('forwardBtn');

    let history = [];
    let currentMoveIndex = -1;

    const pieces = [
        '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
        '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
        '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
    ];

    function createBoard() {
        for (let i = 0; i < 64; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? 'white' : 'black');
            cell.dataset.index = i;
            cell.textContent = pieces[i];
            board.appendChild(cell);
            cell.addEventListener('click', handleCellClick);
        }
    }

    function handleCellClick(e) {
        const cell = e.target;
        const selectedCell = document.querySelector('.selected');
    
        if (selectedCell && cell.classList.contains('selected')) {
            clearSelection();
            return;
        }
    
        if (selectedCell) {
            const selectedPiece = selectedCell.textContent;
            const selectedPieceIndex = parseInt(selectedCell.dataset.index);
            const targetIndex = parseInt(cell.dataset.index);
    
            cell.textContent = selectedPiece;
            selectedCell.textContent = '';
            clearSelection();
            recordMove(selectedPieceIndex, targetIndex);
        } else {
            const selectedPiece = cell.textContent;
            if (!selectedPiece) return;
            clearSelection();
            cell.classList.add('selected');
        }
    }
    

    function clearSelection() {
        const selectedCell = document.querySelector('.selected');
        if (selectedCell) {
            selectedCell.classList.remove('selected');
        }
    }

    function recordMove(startIndex, endIndex) {
        history = history.slice(0, currentMoveIndex + 1);
        history.push({ start: startIndex, end: endIndex });
        currentMoveIndex++;
        updateButtons();
    }

    function undoMove() {
        if (currentMoveIndex >= 0) {
            const { start: prevStart, end: prevEnd } = history[currentMoveIndex];
            const prevStartCell = document.querySelector(`.cell[data-index="${prevStart}"]`);
            const prevEndCell = document.querySelector(`.cell[data-index="${prevEnd}"]`);
    
            const piece = prevEndCell.textContent;
            prevEndCell.textContent = prevStartCell.textContent;
            prevStartCell.textContent = piece;
    
            currentMoveIndex--;
            updateButtons();
        }
    }

    function redoMove() {
        if (currentMoveIndex < history.length - 1) {
            currentMoveIndex++;
            const { start: nextStart, end: nextEnd } = history[currentMoveIndex];
            const nextStartCell = document.querySelector(`.cell[data-index="${nextStart}"]`);
            const nextEndCell = document.querySelector(`.cell[data-index="${nextEnd}"]`);
    
            const piece = nextStartCell.textContent;
            nextStartCell.textContent = nextEndCell.textContent;
            nextEndCell.textContent = piece;
    
            updateButtons();
        }
    }

    function updateButtons() {
        undoBtn.disabled = currentMoveIndex < 0;
        redoBtn.disabled = currentMoveIndex >= history.length - 1;
        backBtn.disabled = currentMoveIndex <= 0;
        forwardBtn.disabled = currentMoveIndex >= history.length - 2;
    }

    function back() {
        if (currentMoveIndex > 0) {
            currentMoveIndex -= 2;
            redoMove();
        }
    }

    function forward() {
        if (currentMoveIndex < history.length - 2) {
            currentMoveIndex += 2;
            redoMove();
        }
    }

    createBoard();

    undoBtn.addEventListener('click', undoMove);
    redoBtn.addEventListener('click', redoMove);
    backBtn.addEventListener('click', back);
    forwardBtn.addEventListener('click', forward);
});
