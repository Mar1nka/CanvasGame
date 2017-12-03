class Flower {
    constructor (context) {
        this.context = context;
        this.x;
        this.y;
        this.width = 50;
        this.height = 50;
        this.color = '#ca110e';
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

class Bee {
    constructor (context) {
        this.context = context;
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.color = '#0e671d';

        this. speedPerFrame = 2;
        this.directionX = 1;
        this.directionY = 1;
        this.endX = 0;
        this.endY = 0;
    }

    setPosition (x, y) {
        this.directionX = 1;
        this.directionY = 1;
        this.endX = x;
        this.endY = y;

        if ((this.endX - bee.x) < 0) {
            this.directionX = -1;
        }

        if ((this.endY - bee.y) < 0) {
            this.directionY = -1;
        }

        this.deltaX = this.directionX * this.speedPerFrame;
        this.deltaY = this.directionY * this.speedPerFrame;
    }

    move () {
        if ((this.directionX === 1 && this.x < this.endX) || (this.directionX === -1 && this.x > this.endX)) {
            this.x += this.deltaX;
        }

        if ((this.directionY === 1 && this.y < this.endY) || (this.directionY === -1 && this.y > this.endY)) {
            this.y += this.deltaY;
        }


        if (checkIntersectionObjectsBeeCanvasTop()) {
            bee.endY = canvas.y;
        }

        if (checkIntersectionObjectsBeeCanvasRight()) {
            bee.endX = canvas.width - bee.width;
        }

        if (checkIntersectionObjectsBeeCanvasBottom()) {
            bee.endY = canvas.height - bee.height;
        }

        if (checkIntersectionObjectsBeeCanvasLeft()) {
            bee.endX = canvas.x;
        }
    }

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
        let x = getRandomPosition(0, canvas.width - flower.width);
        let y = getRandomPosition(0, canvas.height - flower.height);
        flower.setPosition(x, y);
        flowers.push(flower);
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

function deleteFlowers (arrIntersectionObjects) {
    while (arrIntersectionObjects.length) {
        let index = flowers.indexOf(arrIntersectionObjects[0]);
        flowers.splice(index, 1);
        arrIntersectionObjects.shift();
    }
}



function render () {
    let arrIntersectionObjects = checkIntersectionObjectsBeeFlowers();

    if (arrIntersectionObjects.length) {
        deleteFlowers(arrIntersectionObjects);
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < flowers.length; i++) {
        flowers[i].draw();
    }

    bee.move();
    bee.draw();

    requestAnimationFrame(render);
}

function clickHandler (event) {

    let x = event.clientX - canvasBoundingRect.left - bee.width / 2;
    let y = event.clientY - canvasBoundingRect.top - bee.height / 2;

    bee.setPosition(x, y);
}


function checkIntersectionObjectsBeeFlowers () {
    let arrIntersectionObjects = []

    for (let i = 0; i < flowers.length; i++) {
        let flower = flowers[i];

        if (checkIntersectionObjects(bee, flower)) {
            arrIntersectionObjects.push(flower);
        }
    }

    return arrIntersectionObjects;
}

function checkIntersectionObjects (obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.height + obj1.y > obj2.y;
}

function checkIntersectionObjectsBeeCanvasTop () {
    return bee.y < canvas.y;
}

function checkIntersectionObjectsBeeCanvasRight () {
    return bee.x + bee.width > canvas.width;
}

function checkIntersectionObjectsBeeCanvasBottom () {
    return bee.y + bee.height > canvas.height;
}

function checkIntersectionObjectsBeeCanvasLeft () {
    return bee.x < canvas.x;
}

function addFlowers () {
    if (flowers.length < maxNumberFlowers / 2) {
        let numberFlowers = maxNumberFlowers / 3;
        createFlowers(flowers, numberFlowers);
    }
}


let canvas = document.querySelector('.play-area');
canvas.style.background = 'lightgrey';
canvas.width = 1000;
canvas.height = 800;
canvas.x = 0;
canvas.y = 0;

canvas.addEventListener('click', clickHandler);

let lastX = canvas.width / 2;
let lastY = canvas.height / 2;

let context = canvas.getContext('2d');

let flowers = [];
let maxNumberFlowers = 20;
createFlowers(flowers, maxNumberFlowers);
drawFlowers(flowers);

let bee = new Bee(context);
bee.setPosition(lastX - bee.width / 2, lastY - bee.height / 2);
bee.draw();


let timerId = undefined;
let canvasBoundingRect = canvas.getBoundingClientRect();


timerId = requestAnimationFrame(render);

let intervalAddFlowers = setInterval(addFlowers, 1000);

