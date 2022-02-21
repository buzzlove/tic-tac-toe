const btnPlay = document.querySelectorAll('.btnPlay');
const btnRules = document.querySelector('.btnRules');
const btnAbout = document.querySelector('.btnAbout');
const btnReset = document.querySelector('.btnReset');
const btnMenu = document.querySelectorAll('.btnMenu');
const pageGame = document.querySelector('.game');
const pageMenu = document.querySelector('.menu');
const pageRules = document.querySelector('.rules');
const pageAbout = document.querySelector('.about');
const pageResult = document.querySelector('.result');
const grid = document.querySelectorAll('.grid');
const winnerTitle = document.querySelector('.result__title');
const gamerName = document.querySelector('.game__gamer-name');
const beap = new Audio('/assets/audio/beap.mp3');
const fanfare = new Audio('./assets/audio/win.mp3');
const standart = new Audio('./assets/audio/btn.mp3');
let click = 1;
let playerOne = [];
let playerTwo = [];
const win = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
]

btnPlay.forEach(item => item.addEventListener('click', (event)=>page(event.target.textContent)));
btnRules.addEventListener('click', (event)=>page(event.target.textContent));
btnAbout.addEventListener('click', (event)=>page(event.target.textContent));
btnMenu.forEach((item,index) => item.addEventListener('click', ()=>page('MENU')));
grid.forEach((item,index)=> item.addEventListener('click', position));
btnReset.addEventListener('click', clearGame);

function page(page){
    standart.play();
    switch(page){
        case 'PLAY':
            clearGame();
            addClassDisplayBlock([pageMenu, pageAbout, pageRules, pageResult]);
            pageGame.classList.remove('displayNone');
            break;    
        case 'MENU':
            addClassDisplayBlock([pageGame, pageAbout, pageRules,pageResult]);
            pageMenu.classList.remove('displayNone');
            break;    
        case 'ABOUT':
            addClassDisplayBlock([pageGame, pageMenu, pageRules,pageResult]);
            pageAbout.classList.remove('displayNone');
            break; 
        case 'RULES':
            addClassDisplayBlock([pageGame, pageMenu, pageAbout,pageResult]);
            pageRules.classList.remove('displayNone');
            break;     
        case 'WIN':
            addClassDisplayBlock([pageGame, pageMenu, pageAbout,pageRules]);
            pageResult.classList.remove('displayNone');
            break;                
    }
}

function position(event){
    beap.pause();
    beap.play();
    let position = event.target;
    if(click===9){
        resultTitle('Draw! NO winner!');
    } else {gamerMove(position)}   
}
function gamerMove(position){
    if(!position.classList.contains('cross') && !position.classList.contains('round')){
        (click%2 !== 0) ? gamerSetGrid('cross',playerOne, position, 'Player Two') : gamerSetGrid('round',playerTwo, position, 'Player One');
    }
}

function gamerSetGrid(form, player,position, nextGamer){
    position.classList.add(form);
    click++;
    player.push(position.getAttribute('data'));
    winnerLuser(player);
    gamerName.textContent = nextGamer;
}

function clearGame(){
    click = 1;
    playerOne = [];
    playerTwo = [];
    grid.forEach((item)=> {
        item.classList.remove('round');
        item.classList.remove('cross');  
    })
}

function addClassDisplayBlock(data) {
    data.forEach(item => item.classList.add('displayNone'));
}

function winnerLuser(player){
    win.map(item => threeWinElements(item, player));
}

function threeWinElements(winArr, checkArr) {
    let sum = 0;
    checkArr.forEach(num => (winArr.indexOf(Number(num)) > -1) ? sum++ : '' )
    if(sum === 3){
        resultTitle(((click%2) === 0 ? 'Player One' : 'Player Two') + ' Win!');
    }
}

function resultTitle(text){
    beap.pause();
    page('WIN');
    winnerTitle.textContent = text;
    fanfare.play();
}
/*
function virtualGamer(){
    const min = 1;
    const max = 9;
    let i = Math.random();
}
*/