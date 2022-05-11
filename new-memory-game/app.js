const cards = document.querySelectorAll('.memory-card');
const resultDisplay = document.querySelector("#result")
const arr = Array.from(cards);
const againEl = document.querySelector("#again");
// console.log(arr);
// let playAgain = document.querySelector(".playAgain"); //dev .to
// let popup = document.querySelector(".popup"); //dev .to

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; 
let cardsWon = []; //ana code //
let cardsChosen = [];//ana
// let cardsWon = [] //ana




function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;
    //this.classList.toggle("flip"); //toggle means if the class is there. remove it if not add. // we are replacing toggle with add. /
    this.classList.add("flip");

    if(!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this; //"this" keyword is what fired the event. In this case its the memory card. 

        return;
    }
        
    // }else {
    // // second click 
    hasFlippedCard = false;
    secondCard = this;
    
    checkforMatch();

    }
    // function newGame (){
    //     if 
    // }


    // function startGame(){
    //     // isAlive = true;
    //     // let firstCard = getRandomCard()
    //     // let secondCard = getRandomCard()
    //     // cards = [firstCard, secondCard]
    //     // sum = firstCard + secondCard//


    //     //reset moves//
    //     moves = 0;
    //     counter.innerHTML = moves;

    //     checkforMatch();

    // }
    function checkforMatch(){
        let isMatch = firstCard.dataset.artist === 
            secondCard.dataset.artist;
            // cardsWon.push(cardsChosen)
            // cardsWon +=1;
            // scoreBoard.innerHTML = cardsWon;?
            isMatch ? disableCards () : unflipCards();
            
        
        // if(isMatch) {
        //     disableCards();
        //     cardsWon.push(cardsChosen)
        // } else {
        //     //if not a match//
        //     unflipCards();
        // 
        }
        // cardsChosen = []
        // resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === arr.length/2){
        resultDisplay.textContent = "Congratulations! play another!"
        resetGame();
        }
    
    function disableCards(){
            //its a match//
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
            // console.log("function was executed")
        resetBoard ();
    }
    function unflipCards(){
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

           resetBoard();
        }, 1000);
    
     }

     againEl.addEventListener("click", resetGame);
     
     function resetGame(){
         
     }

     

        
    

        // console.log({firstCard, secondCard}); //only fires after the second card is clicked //
        //console.log(firstCard.dataset.artist); //can access the name of the cards using the dataset property.name we chose/
        // console.log(secondCard.dataset.artist);
    
        // console.log({hasFlippedCard, firstCard});
    
    // console.log("clicked");
    // console.log(this); //" this" keyword represents the element that fired the event.


function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor( Math.random() * 12)
        card.style.order = randomPos;
    });
})(); // wrapping this in parantheses makes it an immediately invoked function expression //

 
// cards.forEach(card => card.addEventListener("click", flipCard))
arr.forEach(arr => arr.addEventListener("click", flipCard))





