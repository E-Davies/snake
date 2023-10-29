import {onSnake, expandSnake} from './snake.js'
import { randomGridPosition } from './grid.js';

let food = getRandomFoodPosition()
const expansionRate = 1; //makes the snake grow by 1 segment each time it eats piece of food

export function update(){
    if (onSnake(food)) {//if our snake body is on top of the food is true then... 
        expandSnake(expansionRate)
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition
    while(newFoodPosition == null || onSnake (newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

