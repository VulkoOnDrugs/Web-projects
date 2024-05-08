const cardsArray = [
    {name: 'card1',img: 'images/bot1.png'},
    {name: 'card1',img: 'images/bot1.png'},
    {name: 'card2',img: 'images/bot2.png'},
    {name: 'card2',img: 'images/bot2.png'},
    {name: 'card3',img: 'images/bot3.png'},
    {name: 'card3',img: 'images/bot3.png'},
    {name: 'card4',img: 'images/bot4.png'},
    {name: 'card4',img: 'images/bot4.png'},
    {name: 'card5',img: 'images/bot5.png'},
    {name: 'card5',img: 'images/bot5.png'},
    {name: 'card6',img: 'images/bot6.png'},
    {name: 'card6',img: 'images/bot6.png'}

]

cardsArray.sort(() => 0.5 - Math.random())

const bestScoreKey = 'memoryGameBestscore'
let bestScore = localStorage.getItem(bestScoreKey) || Infinity
const grid = document.querySelector('.gameGrid');
const backSide = 'images/sparkbackround.png';
const flipCount = document.getElementById('flips')
var flips = 0;
const score = document.querySelector('#score');
const message = document.querySelector('#message');
var cardChosen = []
var cardChosenId = []
var firstCardId = null
var isFlipping = false
var cardWon = []

function createBoard(){
    flips = 0;
    flipCount.textContent = flips;
    score.textContent = 0;
    message.textContent = 'Let\'s Go'
    for ( let i=0; i < cardsArray.length; i++){
        var card = document.createElement('img')
        card.setAttribute('src',backSide)
        card.setAttribute('data-id',i)
        card.addEventListener('click',flipcard)
        grid.appendChild(card)
    }
    startTimer()
}

createBoard()

function flipcard(){
    if(isFlipping){
        return;
    }
    var cardId = this.getAttribute('data-id')
    if (cardChosenId.includes(cardId)){
        return
    }
    flips++
    flipCount.textContent = flips;
    cardChosen.push(cardsArray[cardId].name)
    cardChosenId.push(cardId)
    this.setAttribute('src',cardsArray[cardId].img)
    if (cardChosen.length === 1){
        firstCardId = cardId;
    } else if(cardChosen.length === 2) {
        isFlipping = true;
        setTimeout(checkMath,500)
    }
}

function checkMath(){
    var cards = document.querySelectorAll('img')
    const firstChosenId = cardChosenId[0]
    const secondChosenId = cardChosenId[1]
    if(cardChosen[0] === cardChosen[1]){
        message.textContent = 'You found a match'
        cardWon.push(cardChosen)
        isFlipping = false;
    } else {
        setTimeout(()=>{
            cards[firstChosenId].setAttribute('src',backSide)
            cards[secondChosenId].setAttribute('src',backSide)
            isFlipping = false
            message.textContent = '...opss no match'
        },500)
    }

    cardChosen = []
    cardChosenId = []
    score.textContent = cardWon.length
    if (cardWon.length === cardsArray.length / 2){
        endGame();
    } else {
        setTimeout(()=>(message.textContent = 'move on, there\s no time'),2500)
    }
    firstCardId = null
}


var timer = 60;
var timeInterval;

function startTimer(){
    timeInterval = setInterval(function(){
        timer--;
        if (timer <= 0){
            clearInterval(timeInterval)
            endGame();
        }
        updateTimerDisplay()
    }, 1000)
}

function updateTimerDisplay(){
    document.getElementById('timer').textContent = timer + ' s'
}

function endGame(){
    clearInterval(timeInterval);
    isFlipping = true;
    message.textContent = 'Game over'
    if(flips < bestScore){
        bestScore = flips;
        localStorage.setItem(bestScoreKey,bestScore)
        alert('New Best Score ' + bestScore)
    }
}