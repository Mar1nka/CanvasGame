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
        this.x;
        this.y;
        this.width = 50;
        this.height = 50;
        this.color = '#0e671d';
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    draw (x, y) {
        // this.x = x;
        // this.y = y;
        this.setPosition(x, y);

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

function drowFlowers (flowers) {
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


let canvas = document.querySelector('.play-area');
canvas.style.background = 'lightgrey';
canvas.width = 1000;
canvas.height = 800;
canvas.x = 0;
canvas.y = 0;

let lastX = canvas.width / 2;
let lastY = canvas.height / 2;

let context = canvas.getContext('2d');

let flowers = [];
let maxNumberFlowers = 20;
createFlowers(flowers, maxNumberFlowers);
drowFlowers(flowers);

let bee = new Bee(context);
bee.draw(lastX - bee.width / 2, lastY - bee.height / 2);
// bee.draw(940, 400);


let timerId = undefined;
let canvasBoundingRect = canvas.getBoundingClientRect();

function drawSquare (x, y) {
    let arrIntersectionObjects = checkIntersectionObjectsBeeFlowers();

    if (arrIntersectionObjects.length) {
        deleteFlowers(arrIntersectionObjects);
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < flowers.length; i++) {
        flowers[i].draw();
    }

    bee.setPosition(x, y);

    if (checkIntersectionObjectsBeeCanvasTop()) {
        y = canvas.x;
    }

    if (checkIntersectionObjectsBeeCanvasRight()) {
        x = canvas.width - bee.width;
    }

    if (checkIntersectionObjectsBeeCanvasBottom()) {
        y = canvas.height - bee.height;
    }

    if (checkIntersectionObjectsBeeCanvasLeft()) {
        x = canvas.x;
    }

    bee.draw(x, y);
    context.stroke();
}

function clickHandler (event) {
    let speedPerFrame = 1;
    let fps = 40;

    let x = event.clientX - canvasBoundingRect.left - bee.width / 2;
    let y = event.clientY - canvasBoundingRect.top - bee.height / 2;
    let deltaX = (x - bee.x) / fps * speedPerFrame;
    let deltaY = (y - bee.y) / fps * speedPerFrame;
    let currentX = bee.x;
    let currentY = bee.y;


    //TODO decrease amount of functions to one or two (уменьшить кол-во функций до  одной или двух)
    // TODO Reason : too much duplicated code (Причина: слишком много повторяющегося кода)
    function moveObject () {
        if (x > bee.x && y < bee.y) {
            requestAnimationFrame(moveObjectRightUp);
        } else if (x > bee.x && y > bee.y) {
            requestAnimationFrame(moveObjectRightDown);
        } else if (x < bee.x && y > bee.y) {
            requestAnimationFrame(moveObjectLeftDown);
        } else if (x < bee.x && y < bee.y) {
            requestAnimationFrame(moveObjectLeftUp);
        }


        function moveObjectRightUp () {
            if (currentX < x && currentY > y) {
                moveObjectStep();
                requestAnimationFrame(moveObjectRightUp);
            } else {
                moveObjectEnd();
            }
        }

        function moveObjectRightDown () {
            if (currentX < x && currentY < y) {
                moveObjectStep();
                requestAnimationFrame(moveObjectRightDown);
            } else {
                moveObjectEnd();
            }
        }


        function moveObjectLeftDown () {
            if (currentX > x && currentY < y) {
                moveObjectStep();
                requestAnimationFrame(moveObjectLeftDown);
            } else {
                moveObjectEnd();
            }
        }

        function moveObjectLeftUp () {
            if (currentX > x && currentY > y) {
                moveObjectStep();
                requestAnimationFrame(moveObjectLeftUp);
            } else {
                moveObjectEnd();
            }
        }

        function moveObjectStep () {
            currentX += deltaX;
            currentY += deltaY;
            drawSquare(currentX, currentY);

            bee.x = currentX;
            bee.y = currentY;
        }

        function moveObjectEnd () {
            bee.x = x;
            bee.y = y;
            cancelAnimationFrame(timerId);
        }

    }


    timerId = requestAnimationFrame(moveObject);
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
    if (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.height + obj1.y > obj2.y) {
        return true;
    }

    return false;
}

function checkIntersectionObjectsBeeCanvasTop () {
    if (bee.y  < canvas.y) {
        return true;
    }

    return false;
}

function checkIntersectionObjectsBeeCanvasRight () {
    if (bee.x + bee.width > canvas.width) {
        return true;
    }

    return false;
}

function checkIntersectionObjectsBeeCanvasBottom () {
    if (bee.y + bee.height > canvas.height) {
        return true;
    }

    return false;
}

function checkIntersectionObjectsBeeCanvasLeft () {
    if (bee.x < canvas.x) {
        return true;
    }

    return false;
}


canvas.addEventListener('click', clickHandler);

context.stroke();

let intervalAddFlowers= setInterval(addFlowers, 1000);

function addFlowers() {
    if(flowers.length < maxNumberFlowers / 2) {
        let numberFlowers = maxNumberFlowers / 3;
        createFlowers(flowers, numberFlowers);
    }
}