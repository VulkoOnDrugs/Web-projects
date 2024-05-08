var playerRed = 'R'
var playerYellow = 'Y'
var currPlayer = playerRed;

var tilesOnBoard = 0;
var gameOver = false;
var board;
var rows = 6;
var colums = 7;
var currColums = [];

const message = document.querySelector('.message')
const Winner = document.getElementById('winner')
const newGame = document.querySelector('.new-game')

message.textContent = 'Red Start First'
message.style.color = 'red'

function restartGame(){
    location.reload()
}

setGame()

function setGame(){
    board = [];
    currColums = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++){
        let row = [];
        for( let c = 0; c < colums; c++){
            row.push(' ')
            let tile = document.createElement("div")
            tile.classList.add('tile')
            tile.id = r.toString() +  '-' + c.toString()
            tile.addEventListener('click',setPiece);
            document.getElementById('board').appendChild(tile)
        }
        board.push(row)
    }
}

function setPiece(){
    if(gameOver){
        return;
    }

    let coords = this.id.split('-')
    let r = parseInt(coords[0])
    let c= parseInt(coords[1])
    
    r = currColums[c]
    if (r < 0){
        return
    }

    if (currPlayer == playerRed){
        message.textContent = 'it\'s Reds Turn'
        message.style.backgroundColor = 'red'
        message.style.color = 'red'
    }else {
        message.textContent = 'it\'s Yellows turn'
        message.style.backgroundColor = 'gold'
        message.style.color = 'red'
    }

    tilesOnBoard++
    document.querySelector('.display').textContent = 'Tiles on board: ' + tilesOnBoard

    board[r][c] = currPlayer
    let tile = document.getElementById(r.toString() + '-' + c.toString())

    if(currPlayer == playerRed){
        tile.classList.add('red-piece')
        currPlayer = playerYellow
    }else {
        tile.classList.add('yellow-piece')
        currPlayer = playerRed
    }

   r-= 1;
   currColums[c] = r
    checkWinner();
}

function checkWinner(){
    //horizontal

    for(let r = 0; r < rows; r++){
        for (let c = 0; c < colums - 3; c++){
            if (board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r,c)
                    return;
                }
            }
        }
    }
    //vertical
    for(let c = 0; c < colums; c++){
        for(let r = 0; r < rows - 3; r++){
            if (board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r,c)
                    return;
                }
            }
        }
    }
    //anti diagonal

    for(let r = 0; r < rows -3; r++){
        for(let c = 0; c < colums - 3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r,c)
                    return;
                }
            }
        }
    }
    for(let r = 3; r < rows; r++){
        for(c = 0; c < colums - 3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r,c)
                    return;
                }
            }
        }
    }
    if (tilesOnBoard == (rows * colums)){
        setDraw()
    }
}

function setWinner(r,c){
    const winner = document.querySelector('.board-text')
    document.querySelector('.winWinner').style.display = 'block'
    if(board[r][c] == playerRed){
        message.textContent = 'Red Won'
        message.style.backgroundColor = 'red'
        message.style.color = 'white'
        winner.textContent = 'Red Won'
        winner.style.color = 'red'
    } else {
        message.textContent = 'Yellow Won'
        message.style.backgroundColor = 'gold'
        message.style.color = 'grey'
        winner.textContent = 'yellow Won'
        winner.style.color = 'gold'
    }

    gameOver = true
}

function setDraw(){
    const winner = document.querySelector('board-text')
    document.querySelector('.winWinner').style.display = 'block'
    message.textContent = 'Draw'
    message.style.backgroundColor = 'grey'
    message.style.color = 'orange'
    winner.textContent = 'Draw'
    winner.style.color = 'orange'
    gameOver = true
}