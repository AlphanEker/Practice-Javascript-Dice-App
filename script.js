'use strict'; 

//selecting the elements
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
let playing = true;

//Starting conditions
function start() {
    dice.classList.add("hidden");
    score0.textContent = 0;
    score1.textContent = 0; 
    current0.textContent = 0;
    current1.textContent = 0;
    player0.classList.remove("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--active");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    playing = true;
}
start();

function switchPlayer() {
    if (player0.classList.contains("player--active")) {
        player0.classList.remove("player--active");
        player1.classList.add("player--active");
    }
    else if (player1.classList.contains("player--active")) {
        player1.classList.remove("player--active");
        player0.classList.add("player--active");
    }
}

function btnRollEnable() {
    btnRoll.disabled = false;
}

//button functionality
btnRoll.addEventListener("click" ,function(){
    if(playing){
        dice.classList.remove("hidden");
        let randomDice = Math.trunc(Math.random() * 6) + 1;

        if (player0.classList.contains("player--active")) {
            if(randomDice === 1){
                current0.textContent = 0;
                btnRoll.disabled = true;
                switchPlayer();
                setInterval(btnRollEnable,1500);
                dice.src = `dice-${randomDice}.png`;

            }
            else{
                current0.textContent = Number(current0.textContent)+randomDice;  
                dice.src = `dice-${randomDice}.png`;

            }
        }

        else if (player1.classList.contains("player--active")) {
            if(randomDice === 1){
                current1.textContent = 0;
                dice.src = `dice-${randomDice}.png`;
                btnRoll.disabled = true;
                switchPlayer();
                setInterval(btnRollEnable,1500);

            }
            else{
                current1.textContent = Number(current1.textContent)+randomDice;  
                dice.src = `dice-${randomDice}.png`;

            }
        }
    }
})

btnHold.addEventListener("click", function() {
    if (playing) {
        
        if (player0.classList.contains("player--active")) {
            score0.textContent = Number(score0.textContent) + Number(current0.textContent);
            if (Number(score0.textContent) >= 50) {
                player0.classList.add("player--winner");
                playing = false;
                score0.textContent = "WINNER";
            }
            else{
                switchPlayer();
                current0.textContent = 0;
            }
        }

        else if (player1.classList.contains("player--active")) {
            score1.textContent = Number(score1.textContent) + Number(current1.textContent);
            if (Number(score1.textContent) >= 50) {
                player1.classList.add("player--winner");
                playing = false;
                score1.textContent = "WINNER";
            }
            else{
                switchPlayer();
                current1.textContent = 0;
            }
        }
    }
})
btnNew.addEventListener("click",start);
