class Bee {
    constructor (canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.color = '#0e671d';

        this.speedPerFrame = 4;
        this.directionX;
        this.directionY;
        this.endX = 0;
        this.endY = 0;
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    setEndPosition(x, y) {
        this.endX = x;
        this.endY = y;

        this.directionX = this.getDirection(this.endX, this.x);
        this.directionY = this.getDirection(this.endY, this.y);

        let speedsObj = this.getSpeedsRerFrame();

        this.deltaX = this.directionX * speedsObj.speedPerFrameX;
        this.deltaY = this.directionY * speedsObj.speedPerFrameY;
    }

    getDirection(endPos, pos) {
        let direction = 1;

        if((endPos - pos) < 0) {
            direction = -1;
        }

        return direction;
    }

    getSpeedsRerFrame() {
        let distanceX = Math.abs(this.endX - this.x);
        let distanceY = Math.abs(this.endY - this.y);

        let maxDistance = distanceX;
        let minDistance = distanceY;

        if(distanceY > distanceX) {
            maxDistance = distanceY;
            minDistance = distanceX;
        }

        let minSpeedPerFrame = (minDistance * this.speedPerFrame) / maxDistance;
        let speedPerFrameX = this.speedPerFrame;
        let speedPerFrameY = this.speedPerFrame;

        if(minDistance === distanceX ) {
            speedPerFrameX = minSpeedPerFrame;
        } else if (minDistance === distanceY) {
            speedPerFrameY = minSpeedPerFrame;
        }

        let speedsObj = {
            'speedPerFrameX': speedPerFrameX,
            'speedPerFrameY': speedPerFrameY
        }

        return speedsObj;
    }

    stopMove() {
        bee.endX = bee.x;
        bee.endY = bee.y;
    }

    move () {
        if ((this.directionX === 1 && this.x < this.endX) || (this.directionX === -1 && this.x > this.endX)) {
            this.x += this.deltaX;
        }

        if ((this.directionY === 1 && this.y < this.endY) || (this.directionY === -1 && this.y > this.endY)) {
            this.y += this.deltaY;
        }


        if (this.checkIntersectionObjectsBeeCanvasTop()) {
            this.endY = canvas.y;
        }

        if (this.checkIntersectionObjectsBeeCanvasRight()) {
            this.endX = canvas.width - this.width;
        }

        if (this.checkIntersectionObjectsBeeCanvasBottom()) {
            this.endY = canvas.height - this.height;
        }

        if (this.checkIntersectionObjectsBeeCanvasLeft()) {
            this.endX = canvas.x;
        }
    }

    checkIntersectionObjectsBeeCanvasTop () {
        return this.y < this.canvas.y;
    }

    checkIntersectionObjectsBeeCanvasRight () {
        return this.x + this.width > this.canvas.width;
    }

    checkIntersectionObjectsBeeCanvasBottom () {
        return this.y + this.height > this.canvas.height;
    }

    checkIntersectionObjectsBeeCanvasLeft () {
        return this.x < this.canvas.x;
    }

    draw () {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.stroke();
    }
}



class Flower {
    constructor (context) {
        this.context = context;
        this.x;
        this.y;
        this.width = 50;
        this.height = 50;
        this.color = '#ee822e';
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    draw () {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.stroke();
    }
}

class BadFlower {
    constructor (context) {
        this.context = context;
        this.x;
        this.y;
        this.width = 50;
        this.height = 50;
        this.color = '#851371';
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    draw () {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.stroke();
    }
}


class Hive {
    constructor(context) {
        this.context = context;
        this.x;
        this.y;
        this.width = 100;
        this.height = 150;
        this.color = '#634c0b';
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    draw () {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.stroke();
    }


}

class Bear {
    constructor(context) {
        this.context = context;
        this.x;
        this.y;
        this.width = 100;
        this.height = 150;
        this.color = '#904B15';

        this.speedPerFrame = 1;
        this.directionX;
        this.directionY;
        this.endX = 0;
        this.endY = 0;

        this.isChangeDirectionX = false;
        this.isChangeDirectionY = false;
        this.isIntersectionBee = false;
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    setEndPosition(x, y) {
        this.endX = x;
        this.endY = y;

        this.directionX = this.getDirection(this.endX, this.x);
        this.directionY = this.getDirection(this.endY, this.y);

        let speedsObj = this.getSpeedsRerFrame();

        this.deltaX = this.directionX * speedsObj.speedPerFrameX;
        this.deltaY = this.directionY * speedsObj.speedPerFrameY;
    }

    getDirection(endPos, pos) {
        let direction = 1;

        if((endPos - pos) < 0) {
            direction = -1;
        }

        return direction;
    }

    getSpeedsRerFrame() {
        let distanceX = Math.abs(this.endX - this.x);
        let distanceY = Math.abs(this.endY - this.y);

        let maxDistance = distanceX;
        let minDistance = distanceY;

        if(distanceY > distanceX) {
            maxDistance = distanceY;
            minDistance = distanceX;
        }

        let minSpeedPerFrame = (minDistance * this.speedPerFrame) / maxDistance;
        let speedPerFrameX = this.speedPerFrame;
        let speedPerFrameY = this.speedPerFrame;

        if(minDistance === distanceX ) {
            speedPerFrameX = minSpeedPerFrame;
        } else if (minDistance === distanceY) {
            speedPerFrameY = minSpeedPerFrame;
        }

        let speedsObj = {
            'speedPerFrameX': speedPerFrameX,
            'speedPerFrameY': speedPerFrameY
        }

        return speedsObj;
    }

    move () {

        if ((this.directionX === 1 && this.x < this.endX) || (this.directionX === -1 && this.x > this.endX)) {
            this.x += this.deltaX;
        }

        if ((this.directionY === 1 && this.y < this.endY) || (this.directionY === -1 && this.y > this.endY)) {
            this.y += this.deltaY;
        }

        // if (this.checkIntersectionObjectsBeeCanvasTop()) {
        //     this.endY = canvas.y;
        // }
        //
        // if (this.checkIntersectionObjectsBeeCanvasRight()) {
        //     this.endX = canvas.width - this.width;
        // }
        //
        // if (this.checkIntersectionObjectsBeeCanvasBottom()) {
        //     this.endY = canvas.height - this.height;
        // }
        //
        // if (this.checkIntersectionObjectsBeeCanvasLeft()) {
        //     this.endX = canvas.x;
        // }
    }

    // checkIntersectionObjectsBeeCanvasTop () {
    //     return this.y < this.canvas.y;
    // }
    //
    // checkIntersectionObjectsBeeCanvasRight () {
    //     return this.x + this.width > this.canvas.width;
    // }
    //
    // checkIntersectionObjectsBeeCanvasBottom () {
    //     return this.y + this.height > this.canvas.height;
    // }
    //
    // checkIntersectionObjectsBeeCanvasLeft () {
    //     return this.x < this.canvas.x;
    // }

    draw () {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.stroke();
    }

}


function createFlowers (flowers, n) {
    for (let i = 0; i < n; i++) {
        let flower = new Flower(context);
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
    let x = getRandomPosition(0, canvas.width - flower.width);
    let y = getRandomPosition(0, canvas.height - flower.height);
    flower.setPosition(x, y);


    if(checkIntersectionObjects(flower, hive)) {
        getPositionForFlower(flower);
    }
}

function getRandomPosition (min, max) {
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

function updateFlowers(flowers) {
    let arrIntersectionFlowers = checkIntersectionObjectsBeeFlowers(flowers);
    counterFlowers += arrIntersectionFlowers.length;
    showCounterFlowers(counterFlowers);

    if (arrIntersectionFlowers.length) {
        // bee.stopMove();
        deleteFlowers(arrIntersectionFlowers, flowers);
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

function render () {
    updateFlowers(flowers);
    updateBadFlowers(badFlowers);

    if(counterHealth === 0) {
        clearInterval(intervalAddFlowers);
        showCounterHealth('Game over');
        return ;
    } else if(counterFlowers >= 50) {
        clearInterval(intervalAddFlowers);
        showCounterHealth('You are winner');
        return ;
    }


    if(checkIntersectionObjects(bear, hive)) {
        bear.setEndPosition(canvas.x - bear.width, bear.y);
        bear.directionX = -1;
        bear.isChangeDirectionX = true;
        counterFlowers = 0;
    }

    if(checkIntersectionObjects(bear, bee)) {
        bee.stopMove();
        bear.speedPerFrame *= 1.5;

        if(!bear.isChangeDirectionX && !bear.isIntersectionBee) {
            bear.setEndPosition(canvas.x - bear.width, bear.y);
            bear.directionX = -1;
        }

    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawFlowers (flowers);
    drawFlowers (badFlowers)

    hive.draw();

    bear.move();
    bear.draw();

    bee.move();
    bee.draw();

    requestAnimationFrame(render);
}

function clickHandler (event) {

    let x = event.clientX - canvasBoundingRect.left - bee.width / 2;
    let y = event.clientY - canvasBoundingRect.top - bee.height / 2;

    bee.setEndPosition(x, y);
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

function checkIntersectionObjects (obj1, obj2) {
    return (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.height + obj1.y > obj2.y);
}

function addFlowers () {
    if (flowers.length < (maxNumberFlowers *0.8) ) {
        let numberFlowers = 1;
        createFlowers(flowers, numberFlowers);
    }
}

function moveBear() {
    bear.setPosition(canvas.x - bear.width, hive.y + hive.height - bear.height);
    bear.draw();
    bear.setEndPosition(hive.x , bear.y);

}

function showCounterFlowers(counter) {
    let element = document.querySelector('.counterFlowers');
    element.innerHTML = counter;
}

function showCounterHealth(counter) {
    let element = document.querySelector('.counterHealth');
    element.innerHTML = counter;
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

let flowers = [];
let maxNumberFlowers = 20;
createFlowers(flowers, maxNumberFlowers);
drawFlowers(flowers);

let badFlowers = [];
let maxNumberBadFlowers = (Math.floor(maxNumberFlowers * 0.2));
createBadFlowers(badFlowers, maxNumberBadFlowers);
drawFlowers(badFlowers);

let counterFlowers = 0;
let counterHealth = maxNumberBadFlowers;

showCounterFlowers(counterFlowers);
showCounterHealth(counterHealth);

let bee = new Bee(canvas, context);
bee.setPosition(canvas.width / 4 - bee.width / 2, canvas.height / 4 - bee.height / 2);
bee.draw();

let bear = new Bear(context);
// bear.setPosition(canvas.x - bear.width, hive.y + hive.height - bear.height);
// bear.draw();




let timerId = undefined;
let canvasBoundingRect = canvas.getBoundingClientRect();

timerId = requestAnimationFrame(render);

let intervalAddFlowers = setInterval(addFlowers, 500);
let intervaMoveBear = setTimeout(moveBear, 2000);

