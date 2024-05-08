const gameboard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');

infoDisplay.textContent = 'Circle goes first';
let go = 'circle'
let gameEnd = false

const startSells = ['','','','','','','','','']

function createBoard(){
    startSells.forEach((cell,index) =>{
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click',addGo);
        gameboard.append(cellElement);
    })
}

createBoard()

function addGo(e){
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === 'circle' ? 'cross' : 'circle';
    infoDisplay.textContent = 'it\'s now ' +go+' turn'
    // if (go === 'circle') {
    //     go = 'cross'
    // } else{
    //     go = 'circle'
    // }
    e.target.removeEventListener('click',addGo)
    checkScore();
}

function checkScore(){
    const allSquares = document.querySelectorAll('.square')
    const winComb = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

winComb.forEach (array =>{
    const circleWins = array.every(cell =>
        allSquares[cell].firstChild?.classList.contains('circle'))
        if (circleWins) {
            infoDisplay.textContent = 'Circle Wins'
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            gameEnd = true;
            return
        }
})

winComb.forEach (array =>{
    const circleWins =array.every(cell =>
        allSquares[cell].firstChild?.classList.contains('cross'))
        if (circleWins) {
            infoDisplay.textContent = 'Cross Wins'
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            gameEnd = true;
            return
        }
})

if (!gameEnd && Array.from(allSquares).every(square=> square.firstChild)){
    infoDisplay.textContent = "It's a draw"
    gameEnd = true;
}
}

function resetGame(){
    location.reload()
}