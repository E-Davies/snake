import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

const gameOverScreen = document.getElementById('game-over');
const playAgainBtn = document.getElementById('play');
const finishBtn = document.getElementById('finish');
let finished = false;

playAgainBtn.addEventListener('click', play);
document.addEventListener('keypress', enterPressed);

function play(){
    gameOverScreen.style.display = "none";
    window.location.assign('https://e-davies.github.io/snake/');
}

function enterPressed(event){
    if(event.key === "Enter"){
        if (gameOverScreen.style.display === "flex" && !finished){
            gameOverScreen.style.display = "none";
            window.location.assign('https://e-davies.github.io/snake/');
        }
    }else{
        return 
    }
};

finishBtn.addEventListener('click', function (){
    document.getElementById('btn-container').style.display = "none";
    document.getElementById('pscore').style.display = "none";
    document.getElementById('h1').innerHTML = "Bye!";
    document.getElementById('p1').style.display = "none";
    document.getElementById('p2').innerHTML = "Come back and play again soon";
    finished = true;
});

function main(currentTime){
    if (gameOver){
        gameOverScreen.style.display = "flex";     
       return
    }
    
    window.requestAnimationFrame(main);
    const SecondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (SecondsSinceLastRender < 1 / snakeSpeed) return
    
    lastRenderTime = currentTime;

    update()
    draw()
}

window.requestAnimationFrame(main);

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = "";
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
