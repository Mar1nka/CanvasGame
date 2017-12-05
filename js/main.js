


function createGoodFlowers (flowers, n) {
    for (let i = 0; i < n; i++) {
        let flower = new GoodFlower(context);
        getPositionForFlower(flower);
        flowers.push(flower);
    }
}

function createBadFlowers (flowers, n) {
    for (let i = 0; i < n; i++) {
        let badFlower = new BadFlower(context);
        getPositionForFlower(badFlower);
        flowers.push(badFlower);
    }
}

function getPositionForFlower(flower) {
    let x = getRandom(0, canvas.width - flower.width);
    let y = getRandom(0, canvas.height - flower.height);
    flower.setPosition(x, y);


    if(checkIntersectionObjects(flower, hive)) {
        getPositionForFlower(flower);
    }
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawFlowers (flowers) {
    for (let i = 0; i < flowers.length; i++) {
        flowers[i].draw();
    }
}

function deleteFlowers (arrIntersectionObjects, flowers) {
    while (arrIntersectionObjects.length) {
        let index = flowers.indexOf(arrIntersectionObjects[0]);
        flowers.splice(index, 1);
        arrIntersectionObjects.shift();
    }
}

function updateGoodFlowers(flowers) {
    let arrIntersectionGoodFlowers = checkIntersectionObjectsBeeFlowers(flowers);
    counterGoodFlowers += arrIntersectionGoodFlowers.length;
    showCounterGoodFlowers(counterGoodFlowers);

    if (arrIntersectionGoodFlowers.length) {
        // bee.stopMove();
        deleteFlowers(arrIntersectionGoodFlowers, flowers);
    }
}

function updateBadFlowers(badFlowers) {
    let arrIntersectionBadFlowers = checkIntersectionObjectsBeeFlowers(badFlowers);
    counterHealth -= arrIntersectionBadFlowers.length;
    showCounterHealth(counterHealth);

    if (arrIntersectionBadFlowers.length) {
        deleteFlowers(arrIntersectionBadFlowers, badFlowers);
    }
}

function checkIntersectionObjectsBeeFlowers (flowers) {
    let arrIntersectionObjects = [];

    for (let i = 0; i < flowers.length; i++) {
        let flower = flowers[i];

        if (checkIntersectionObjects(bee, flower)) {
            arrIntersectionObjects.push(flower);
        }
    }

    return arrIntersectionObjects;
}

function addFlowers () {
    if (goodFlowers.length < (maxNumberGoodFlowers *0.8) ) {
        let numberFlowers = 1;
        createGoodFlowers(goodFlowers, numberFlowers);
    }
}



function updateCounter() {
    if(counterHealth === 0) {
        clearInterval(intervalAddFlowers);
        clearTimeout(timerMoveRightBear);
        showCounterHealth('Game over');
        timerId = null;
        isGameOver = true;
        return ;
    } else if(counterGoodFlowers >= 50) {
        clearInterval(intervalAddFlowers);
        clearTimeout(timerMoveLeftBear);
        showCounterHealth('You are winner');
        timerId = null;
        isGameOver = true;
        return ;
    }
}

function showCounterGoodFlowers(counter) {
    let element = document.querySelector('.counterGoodFlowers');
    element.innerHTML = counter;
}

function showCounterHealth(counter) {
    let element = document.querySelector('.counterHealth');
    element.innerHTML = counter;
}



function render () {

    updateGoodFlowers(goodFlowers);
    updateBadFlowers(badFlowers);

    updateCounter();

    updateBear(leftBear);
    updateBear(rightBear);

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawFlowers(goodFlowers);
    drawFlowers(badFlowers)

    hive.draw();

    leftBear.determineSteps();
    leftBear.move();
    leftBear.draw();

    rightBear.determineSteps();
    rightBear.move();
    rightBear.draw();

    bee.move();
    bee.draw();

    if(!isGameOver) {
        requestAnimationFrame(render);
    }

}

function clickHandler (event) {

    let x = event.clientX - canvasBoundingRect.left - bee.width / 2;
    let y = event.clientY - canvasBoundingRect.top - bee.height / 2;

    if(x < bee.width / 2) {
        x = canvas.x;
    } else if(x > canvas.width - bee.width ) {
        x = canvas.width - bee.width;
    }

    if(y < bee.height / 2) {
        y = canvas.y;
    } else if(y > canvas.height - bee.height) {
        y = canvas.height - bee.height;
    }

    bee.setEndPosition(x, y);
}

function checkIntersectionObjects (obj1, obj2) {
    return (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.height + obj1.y > obj2.y);
}



function updateBear(bear) {
    if(checkIntersectionObjects(bear, hive)) {
        turnOtherWayBear(bear);
    }

    if(checkIntersectionObjects(bear, bee)) {
        metBearAndBee(bear);
    }
}

function turnOtherWayBear(bear) {
    bear.setEndPosition(bear.finishPosX, bear.finishPosY);
    bear.directionX *= -1;
    bear.isChangeDirectionX = true;
    counterGoodFlowers = 0;
}

function moveBear(bear) {
    bear.setPosition(bear.startPosX, bear.startPosY);
    bear.speedPerFrame = bear.originalSpeedPerFrame;
    bear.isChangeDirectionX  = false;
    bear.isIntersectionBee = false;
    bear.draw();
    bear.setEndPosition(bear.goalPosX, bear.goalPosY);
}

function metBearAndBee(bear) {
    bee.stopMove();
    bear.speedPerFrame += 0.5 ;

    if(!bear.isChangeDirectionX && !bear.isIntersectionBee) {
        bear.setEndPosition(bear.finishPosX, bear.finishPosY);
        bear.directionX *= -1;
        bear.isChangeDirectionX = true;
    }

    bear.isIntersectionBee = true;
}

function moveLeftBear() {
    moveBear(leftBear);

    clearTimeout(timerMoveLeftBear);
    let milliseconds = getRandom(20000, 30000);
    timerMoveLeftBear = setTimeout(moveLeftBear, milliseconds);
}

function moveRightBear() {
    moveBear(rightBear);

    clearTimeout(timerMoveRightBear);
    let milliseconds = getRandom(20000, 30000);
    timerMoveRightBear = setTimeout(moveRightBear, milliseconds);
}



let canvas = document.querySelector('.play-area');
canvas.style.background = 'lightgrey';

canvas.width = 1000;
canvas.height = 800;

canvas.x = 0;
canvas.y = 0;

canvas.addEventListener('click', clickHandler);

let context = canvas.getContext('2d');

let hive = new Hive(context);
hive.setPosition(canvas.width / 2 - hive.width / 2, canvas.height / 2 - hive.height / 2);
hive.draw();

let goodFlowers = [];
let maxNumberGoodFlowers = 20;
createGoodFlowers(goodFlowers, maxNumberGoodFlowers);
drawFlowers(goodFlowers);

let badFlowers = [];
let maxNumberBadFlowers = (Math.floor(maxNumberGoodFlowers * 0.2));
createBadFlowers(badFlowers, maxNumberBadFlowers);
drawFlowers(badFlowers);

let counterGoodFlowers = 0;
let counterHealth = maxNumberBadFlowers;

showCounterGoodFlowers(counterGoodFlowers);
showCounterHealth(counterHealth);

let bee = new Bee(canvas, context);
bee.setPosition(canvas.width / 4 - bee.width / 2, canvas.height / 4 - bee.height / 2);
bee.draw();

let leftBear = new Bear(context);
leftBear.setConstPos(
    {
        'startPosX': canvas.x - leftBear.width,
        'startPosY': hive.y + hive.height - leftBear.height,
        'goalPosX' : hive.x,
        'goalPosY' : hive.y + hive.height - leftBear.height,
        'finishPosX': canvas.x - 1.5 * leftBear.width,
        'finishPosY': hive.y + hive.height - leftBear.height
    });

let rightBear = new Bear(context);
rightBear.setConstPos(
    {
        'startPosX': canvas.width + rightBear.width ,
        'startPosY': hive.y + hive.height - rightBear.height,
        'goalPosX' : hive.x,
        'goalPosY' : hive.y + hive.height - rightBear.height,
        'finishPosX': canvas.width + 1.5 * rightBear.width ,
        'finishPosY': hive.y + hive.height - rightBear.height
    });



let timerId = undefined;
let canvasBoundingRect = canvas.getBoundingClientRect();

timerId = requestAnimationFrame(render);

let intervalAddFlowers = setInterval(addFlowers, 500);
let timerMoveLeftBear = setTimeout(moveLeftBear, 2000);
let timerMoveRightBear = setTimeout(moveRightBear, 8000);

let isGameOver = false;

