const GameGrid = document.querySelector('.grid')
const mole = document.querySelector('.mole')
const timeleft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const message = document.querySelector('#message')
const dim = 600

var holes = 25
var holeDim = dim / Math.sqrt(holes)
var result = 0
var TimerId = null
var currentTime = 60

function createBoard(){
    for (i = 1; i < (holes + 1);i++){
        var square = document.createElement('div')
        square.classList.add('square')
        square.setAttribute('id',i)
        square.style.height = holeDim + 'px'
        square.style.width = holeDim + 'px'
        GameGrid.appendChild(square)
    }
}

createBoard()

const squares = document.querySelectorAll('.square')

function randomSquare(){
    squares.forEach(square => {
        square.classList.remove('mole')
    })
    var randomSquare = squares[Math.floor(Math.random() * holes)]
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id
}
squares.forEach(square =>{
    square.addEventListener('mousedown',()=>{
        if(square.id == hitPosition){
            result++
            score.textContent = result
            hitPosition = null
            square.classList.remove('mole')
        }
    })
})

function moveMole(){
    TimerId = setInterval(randomSquare, 1000)
}

moveMole()

function countDown(){
    currentTime--
    timeleft.textContent = currentTime+ 's'
    if(currentTime < 10){
        timeleft.style.color = 'red'
        message.textContent = 'Hurry up, there\'s no time'
    }
    if (currentTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(TimerId)
        message.textContent = 'GAME OVER!!! Your finale score' + result
    }
}

let countDownTimerId = setInterval(countDown,1000)