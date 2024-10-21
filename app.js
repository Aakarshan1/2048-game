const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const boardContainer = document.querySelector(".board");

function display() {
    let elem = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                boardContainer.children[elem].style.color = "";
                boardContainer.children[elem].innerText = "";
                boardContainer.children[elem].style.backgroundColor = "";
            } else {
                if (board[row][col] >= 128) {
                    boardContainer.children[elem].style.color = "white";
                }
                boardContainer.children[elem].innerText = board[row][col];
                boardContainer.children[elem].style.backgroundColor = changeColor(row, col);
            }
            elem++;
        }
    }
}

function assignRandom() {
    let emptyTiles = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyTiles.push([row, col]);
            }
        }
    }
    
    if (emptyTiles.length === 0) {
        console.log("Game Over");
        return;
    }

    let [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[row][col] = Math.random() > 0.9 ? 4 : 2;
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = board[row].filter(value => value !== 0);
        let missing = 4 - newRow.length;
        let zeros = Array(missing).fill(0);
        newRow = newRow.concat(zeros);

        for (let col = 0; col < 3; col++) {
            if (newRow[col] === newRow[col + 1] && newRow[col] !== 0) {
                newRow[col] *= 2;
                newRow[col + 1] = 0;
            }
        }

        newRow = newRow.filter(value => value !== 0);
        missing = 4 - newRow.length;
        zeros = Array(missing).fill(0);
        newRow = newRow.concat(zeros);

        board[row] = newRow;
    }
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        let newRow = board[row].filter(value => value !== 0).reverse();
        let missing = 4 - newRow.length;
        let zeros = Array(missing).fill(0);
        newRow = zeros.concat(newRow);

        for (let col = 3; col > 0; col--) {
            if (newRow[col] === newRow[col - 1] && newRow[col] !== 0) {
                newRow[col] *= 2;
                newRow[col - 1] = 0;
            }
        }

        newRow = newRow.filter(value => value !== 0);
        missing = 4 - newRow.length;
        zeros = Array(missing).fill(0);
        newRow = zeros.concat(newRow);

        board[row] = newRow.reverse();
    }
}

function moveUp() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (board[row][col] !== 0) newCol.push(board[row][col]);
        }

        for (let row = 0; row < newCol.length - 1; row++) {
            if (newCol[row] === newCol[row + 1]) {
                newCol[row] *= 2;
                newCol[row + 1] = 0;
            }
        }

        newCol = newCol.filter(value => value !== 0);
        while (newCol.length < 4) newCol.push(0);
        
        for (let row = 0; row < 4; row++) {
            board[row][col] = newCol[row];
        }
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 3; row >= 0; row--) {
            if (board[row][col] !== 0) newCol.push(board[row][col]);
        }

        for (let row = 0; row < newCol.length - 1; row++) {
            if (newCol[row] === newCol[row + 1]) {
                newCol[row] *= 2;
                newCol[row + 1] = 0;
            }
        }

        newCol = newCol.filter(value => value !== 0);
        while (newCol.length < 4) newCol.unshift(0);
        
        for (let row = 0; row < 4; row++) {
            board[row][col] = newCol[row];
        }
    }
}

function changeColor(row, col) {
    let value = board[row][col];
    return `hsla(220, ${(100/12)*(Math.log2(value))}%, ${100-Math.log2(value)*12}%,${100-Math.log2(value)/12}%)`;
}

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        default:
            return;
    }
    display();
    assignRandom();
    display();
});

assignRandom();
assignRandom();
display();
