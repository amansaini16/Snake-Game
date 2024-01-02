const board = document.querySelector('.gameBoard');
const insttext=document.getElementById('inst');
const logo=document.getElementById('logo');
const score=document.getElementById('score');
const highScore=document.getElementById('maxScore');
const gridSize = 20;
let snake=[{x:10,y:10}];
let food=generateFood();
let direction='right';
let highscore=0;
let gamespeedDelay=200;
let gamestarted=false;
let gameinterval;
function draw(){
board.innerHTML='';
    drawsnake();
    drawfood();
    updatescore();
}
function drawsnake(){
snake.forEach((segment)=>{
    const snakeelement=creategameelement('div','snake');
    setposition(snakeelement,segment);
    board.appendChild(snakeelement);
});
}
function creategameelement(tag,className){
    const element=document.createElement(tag);
    element.className=className;
    return element;
}
function setposition(element,position){
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}
function drawfood(){
    if(gamestarted){
    const foodelement=creategameelement('div','food');
    setposition(foodelement,food);
    board.appendChild(foodelement);}
}
function generateFood(){
const x=Math.floor(Math.random()*gridSize)+1;
const y=Math.floor(Math.random()*gridSize)+1;
return{ x, y };
}
function move(){
    const head={ ...snake[0]};
    switch(direction){
        case 'right':
            head.x++;
     break;
     case 'left':
        head.x--;
        break;
        case 'up':
        head.y--;
        break;
        case 'down':
            head.y++;  
            break;
    }
    snake.unshift(head);
    // snake.pop();
    if (head.x === food.x && head.y === food.y) {
        increasespeed();
        food=generateFood();
        clearInterval(gameinterval);
        gameinterval=setInterval(()=>{
        move();
        checkcollision();
        draw();},gamespeedDelay);
        
    }else{
        snake.pop();
    }
}
function startgame(){
gamestarted=true;
insttext.style.display='none';
logo.style.display='none';
gameinterval=setInterval(()=>{
    move();
    checkcollision();
    draw();
},gamespeedDelay);
}
function keypress(event){
    if(!gamestarted&&(event.code==='space')||
    (!gamestarted&&event.key===' ')){
        startgame();
    }
    else{
        switch(event.key){
            case 'ArrowUp':
                direction='up';
                break;
                case 'ArrowDown':
                direction='down';
                break;
                case 'ArrowLeft':
                direction='left';
                break;
                case 'ArrowRight':
                direction='right';
                break;
        }
    }
}
document.addEventListener('keydown',keypress);
function increasespeed(){
    if(gamespeedDelay>150){
        gamespeedDelay-=5;
    }
    else if(gamespeedDelay>100){
        gamespeedDelay-=3;
    }
    else if(gamespeedDelay>50){
        gamespeedDelay-=2;
    }
    else if(gamespeedDelay>25){
        gamespeedDelay-=1;
    }
}
function checkcollision(){
    const head=snake[0];
    if(head.x<1||head.x>gridSize||head.y<1||head.y>gridSize){
        resetGame();
    }
    for(let i=1; i<snake.length;i++){
        if(head.x===snake[i].x&&head.y===snake[i].y){
            resetGame();
        }
    }
}
function resetGame(){
    updatehighscore();
    stopgame();
    snake=[{x:10,y:10}];
    food=generateFood();
    direction='right';
    gamespeedDelay=200;
    updatescore();
}
function updatescore(){
    const currentscore=(snake.length-1)*5;
    score.textContent=currentscore.toString().padStart(3,'0');
}
function stopgame(){
    clearInterval(gameinterval);
    gamestarted=false;
    insttext.style.display='block';
    logo.style.display='block';
    
} 
function updatehighscore(){
    const currentscore=(snake.length-1)*5;
    if(currentscore>highscore){
        highscore=currentscore;
        highScore.textContent=highscore.toString().padStart(3,'0');
    }
    highScore.style.display='block';
    if(highScore.textContent>0){
    alert(`TRY AGAIN TO BEAT YOUR HIGHSCORE: ${highScore.textContent}`);}
}