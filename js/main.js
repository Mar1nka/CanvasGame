// function createFlowers(ClassFlower, flowers, n) {
//     for (let i = 0; i < n; i++) {
//         let flower = new ClassFlower(context);
//         setPositionForFlower(flower);
//         flowers.push(flower);
//     }
// }
//
// function setPositionForFlower(flower) {
//     let x = getRandom(0, canvas.width - flower.width);
//     let y = getRandom(0, canvas.height - flower.height);
//     flower.setPosition(x, y);
//
//     if (checkIntersectionObjects(flower, hive)) {
//         setPositionForFlower(flower);
//     }
// }
//
// function getRandom(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
//
// function drawFlowers(flowers) {
//     for (let i = 0; i < flowers.length; i++) {
//         flowers[i].draw();
//     }
// }
//
//
// function updateGoodFlowers(flowers) {
//     let arrIntersectionGoodFlowers = checkIntersectionObjectsBeeFlowers(flowers);
//     counterGoodFlowers += arrIntersectionGoodFlowers.length;
//     showCounterGoodFlowers(counterGoodFlowers);
//
//     if (arrIntersectionGoodFlowers.length) {
//         checkGoodFlowers();
//         deleteFlowers(arrIntersectionGoodFlowers, flowers);
//     }
// }
//
// function updateBadFlowers(badFlowers) {
//     let arrIntersectionBadFlowers = checkIntersectionObjectsBeeFlowers(badFlowers);
//     counterHealth -= arrIntersectionBadFlowers.length;
//     showCounterHealth(counterHealth);
//
//     if (arrIntersectionBadFlowers.length) {
//         checkHealth();
//         deleteFlowers(arrIntersectionBadFlowers, badFlowers);
//     }
// }
//
// function checkIntersectionObjectsBeeFlowers(flowers) {
//     let arrIntersectionObjects = [];
//
//     for (let i = 0; i < flowers.length; i++) {
//         let flower = flowers[i];
//
//         if (checkIntersectionObjects(bee, flower)) {
//             arrIntersectionObjects.push(flower);
//         }
//     }
//
//     return arrIntersectionObjects;
// }
//
// function checkGoodFlowers() {
//     if (counterGoodFlowers >= 50) {
//         showCounterHealth('You are winner');
//         destroy();
//     }
// }
//
// function checkHealth() {
//     if (counterHealth === 0) {
//         showCounterHealth('Game over');
//         destroy();
//     }
// }
//
// function destroy() {
//     clearInterval(intervalAddFlowers);
//     clearTimeout(timerMoveRightBear);
//     clearTimeout(timerMoveLeftBear);
//     timerId = null;
//     isGameOver = true;
// }
//
// function deleteFlowers(flowersForDelete, flowers) {
//     while (flowersForDelete.length) {
//         let index = flowers.indexOf(flowersForDelete[0]);
//         flowersForDelete[0].delete();
//         flowers.splice(index, 1);
//         flowersForDelete.shift();
//     }
// }
//
//
// function addFlowers() {
//     if (goodFlowers.length < (maxNumberGoodFlowers * 0.8)) {
//         let numberFlowers = 1;
//         createFlowers(GoodFlower, goodFlowers, numberFlowers);
//     }
// }
//
//
// function showCounterGoodFlowers(counter) {
//     let element = document.querySelector('.counterGoodFlowers');
//     element.innerHTML = counter;
// }
//
// function showCounterHealth(counter) {
//     let element = document.querySelector('.counterHealth');
//     element.innerHTML = counter;
// }
//
//
// function render() {
//     updateGoodFlowers(goodFlowers);
//     updateBadFlowers(badFlowers);
//
//     updateBear(leftBear);
//     updateBear(rightBear);
//
//     context.clearRect(0, 0, canvas.width, canvas.height);
//
//     drawFlowers(goodFlowers);
//     drawFlowers(badFlowers)
//
//     hive.draw();
//
//     // one function for bears
//
//     leftBear.determineSteps();
//     leftBear.move();
//     leftBear.draw();
//
//     rightBear.determineSteps();
//     rightBear.move();
//     rightBear.draw();
//
//     bee.move();
//     bee.draw();
//
//     if (!isGameOver) {
//         requestAnimationFrame(render);
//     }
// }
//
// function clickHandler(event) {
//
//     let x = event.clientX - canvasBoundingRect.left - bee.width / 2;
//     let y = event.clientY - canvasBoundingRect.top - bee.height / 2;
//
//     if (x < bee.width / 2) {
//         x = canvas.x;
//     } else if (x > canvas.width - bee.width) {
//         x = canvas.width - bee.width;
//     }
//
//     if (y < bee.height / 2) {
//         y = canvas.y;
//     } else if (y > canvas.height - bee.height) {
//         y = canvas.height - bee.height;
//     }
//
//     bee.setEndPosition(x, y);
// }
//
// function checkIntersectionObjects(obj1, obj2) {
//     return (obj1.x < obj2.x + obj2.width &&
//         obj1.x + obj1.width > obj2.x &&
//         obj1.y < obj2.y + obj2.height &&
//         obj1.height + obj1.y > obj2.y);
// }
//
//
// function updateBear(bear) {
//     if (checkIntersectionObjects(bear, hive)) {
//         bear.turnOtherWay();
//         counterGoodFlowers = 0;
//     }
//
//     if (checkIntersectionObjects(bear, bee)) {
//         meetBearAndBee(bear);
//     }
// }
//
// function meetBearAndBee(bear) {
//     bee.stopMove();
//     bear.meetBee();
// }
//
// function moveLeftBearsCyclically() {
//     leftBear.setToInitialState();
//
//     clearTimeout(timerMoveLeftBear);
//     let milliseconds = getRandom(20000, 30000);
//     timerMoveLeftBear = setTimeout(moveLeftBearsCyclically, milliseconds);
// }
//
// function moveRightBearsCyclically() {
//     rightBear.setToInitialState();
//
//     clearTimeout(timerMoveRightBear);
//     let milliseconds = getRandom(20000, 30000);
//     timerMoveRightBear = setTimeout(moveRightBearsCyclically, milliseconds);
// }
//
//
// //TODO make Main class and move all functions from above to methods of Main class
//
//
// //TODO move all logic from below to init() method of Main Class
//
// let canvas = document.querySelector('.play-area');
// canvas.style.background = 'lightgrey';
//
// canvas.width = 1000;
// canvas.height = 800;
//
// canvas.x = 0;
// canvas.y = 0;
//
// canvas.addEventListener('click', clickHandler);
//
// let context = canvas.getContext('2d');
//
// let hive = new Hive(context);
// hive.setPosition(canvas.width / 2 - hive.width / 2, canvas.height / 2 - hive.height / 2);
// hive.draw();
//
// let goodFlowers = [];
// let maxNumberGoodFlowers = 20;
// createFlowers(GoodFlower, goodFlowers, maxNumberGoodFlowers);
// drawFlowers(goodFlowers);
//
// let badFlowers = [];
// let maxNumberBadFlowers = (Math.floor(maxNumberGoodFlowers * 0.2));
// createFlowers(BadFlower, badFlowers, maxNumberBadFlowers);
// drawFlowers(badFlowers);
//
// let counterGoodFlowers = 0;
// let counterHealth = maxNumberBadFlowers;
//
// showCounterGoodFlowers(counterGoodFlowers);
// showCounterHealth(counterHealth);
//
// let bee = new Bee(context);
// bee.setPosition(canvas.width / 4 - bee.width / 2, canvas.height / 4 - bee.height / 2);
// bee.draw();
//
// let leftBear = new Bear(context);
// leftBear.setConstPos(
//     {
//         'startPosX': canvas.x - leftBear.width,
//         'startPosY': hive.y + hive.height - leftBear.height,
//         'goalPosX': hive.x,
//         'goalPosY': hive.y + hive.height - leftBear.height,
//         'finishPosX': canvas.x - 1.5 * leftBear.width,
//         'finishPosY': hive.y + hive.height - leftBear.height
//     });
//
// let rightBear = new Bear(context);
// rightBear.setConstPos(
//     {
//         'startPosX': canvas.width + rightBear.width,
//         'startPosY': hive.y + hive.height - rightBear.height,
//         'goalPosX': hive.x,
//         'goalPosY': hive.y + hive.height - rightBear.height,
//         'finishPosX': canvas.width + 1.5 * rightBear.width,
//         'finishPosY': hive.y + hive.height - rightBear.height
//     });
//
//
// let timerId = undefined;
// let canvasBoundingRect = canvas.getBoundingClientRect();
//
// timerId = requestAnimationFrame(render);
//
// let intervalAddFlowers = setInterval(addFlowers, 500);
// let timerMoveLeftBear = setTimeout(moveLeftBearsCyclically, 2000);
// let timerMoveRightBear = setTimeout(moveRightBearsCyclically, 8000);
//
// let isGameOver = false;



class Main {
    constructor() {
        this.canvas;
        this.context;
        this.hive;

        this.goodFlowers = [];
        this.maxNumberGoodFlowers = 20;

        this.badFlowers = [];
        this.maxNumberBadFlowers = (Math.floor(this.maxNumberGoodFlowers * 0.2));

        this.counterGoodFlowers = 0;
        this.counterHealth = this.maxNumberBadFlowers;

        this.bee;
        this.leftBear;
        this.rightBear;

        //+
        this.beeEater;

        this.timerId = undefined;
        this.canvasBoundingRect;

        this.intervalAddFlowers;
        this.timerMoveLeftBear;
        this.timerMoveRightBear;

        //+
        this.intervalChangePosBadFlowers;

        this.isGameOver = false;

        this.renderBind = this.render.bind(this);
        this.addFlowersBind = this.addFlowers.bind(this);
        this.moveLeftBearsCyclicallyBind = this.moveLeftBearsCyclically.bind(this);
        this.moveRightBearsCyclicallyBind = this.moveRightBearsCyclically.bind(this);
        this.clickHandlerBind = this.clickHandler.bind(this);

        //+
        this.changePosBadFlowersBind = this.changePosBadFlowers.bind(this);

        this.init();
    }

    init() {
        this.initCanvas();
        this.canvasBoundingRect = this.canvas.getBoundingClientRect();
        this.context = this.canvas.getContext('2d');
        this.initHive();
        this.initFlowers();
        this.initBee();
        this.initBears();

        //+
        this.initBeeEater();

        this.showCounterGoodFlowers(this.counterGoodFlowers);
        this.showCounterHealth(this.counterHealth);

        this.timerId = requestAnimationFrame(this.renderBind);

        this.intervalAddFlowers = setInterval(this.addFlowersBind, 500);
        this.timerMoveLeftBear = setTimeout(this.moveLeftBearsCyclicallyBind, 2000);
        this.timerMoveRightBear = setTimeout(this.moveRightBearsCyclicallyBind, 8000);

        //+
        this.intervalChangePosBadFlowers = setInterval(this.changePosBadFlowersBind, 5000);


    }

    initCanvas() {
        this.canvas = document.querySelector('.play-area');
        this.canvas.style.background = 'lightgrey';

        this.canvas.width = 1000;
        this.canvas.height = 800;

        this.canvas.x = 0;
        this.canvas.y = 0;

        this.canvas.addEventListener('click', this.clickHandlerBind);
    }

    initHive() {
        this.hive = new Hive(this.context);
        this.hive.setPosition(this.canvas.width / 2 - this.hive.width / 2, this.canvas.height / 2 - this.hive.height / 2);
        this.hive.draw();
    }

    initFlowers() {
        this.createFlowers(GoodFlower, this.goodFlowers, this.maxNumberGoodFlowers);
        this.drawFlowers(this.goodFlowers);

        this.createFlowers(BadFlower, this.badFlowers, this.maxNumberBadFlowers);
        this.drawFlowers(this.badFlowers);
    }

    initBee() {
        this.bee = new Bee(this.context);
        this.bee.setPosition(this.canvas.width / 4 - this.bee.width / 2, this.canvas.height / 4 - this.bee.height / 2);
        this.bee.draw();
    }

    initBears() {
        this.leftBear = new Bear(this.context);
        this.leftBear.setConstPos(
            {
                'startPosX': this.canvas.x - this.leftBear.width,
                'startPosY': this.hive.y + this.hive.height - this.leftBear.height,
                'goalPosX': this.hive.x,
                'goalPosY': this.hive.y + this.hive.height - this.leftBear.height,
                'finishPosX': this.canvas.x - 1.5 * this.leftBear.width,
                'finishPosY': this.hive.y + this.hive.height - this.leftBear.height
            });

        this.rightBear = new Bear(this.context);
        this.rightBear.setConstPos(
            {
                'startPosX': this.canvas.width + this.rightBear.width,
                'startPosY': this.hive.y + this.hive.height - this.rightBear.height,
                'goalPosX': this.hive.x,
                'goalPosY': this.hive.y + this.hive.height - this.rightBear.height,
                'finishPosX': this.canvas.width + 1.5 * this.rightBear.width,
                'finishPosY': this.hive.y + this.hive.height - this.rightBear.height
            });
    }

    initBeeEater() {
        this.beeEater = new BeeEater(this.context);
        this.beeEater.setPosition(this.canvas.width / 2 , this.canvas.height  - this.beeEater.height );
        this.beeEater.draw();
    }




    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    checkIntersectionObjects(obj1, obj2) {
        return (obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.height + obj1.y > obj2.y);
    }

    showCounterGoodFlowers(counter) {
        let element = document.querySelector('.counterGoodFlowers');
        element.innerHTML = counter;
    }

    showCounterHealth(counter) {
        let element = document.querySelector('.counterHealth');
        element.innerHTML = counter;
    }


    clickHandler(event) {

        let x = event.clientX - this.canvasBoundingRect.left - this.bee.width / 2;
        let y = event.clientY - this.canvasBoundingRect.top - this.bee.height / 2;

        if (x < this.bee.width / 2) {
            x = this.canvas.x;
        } else if (x > this.canvas.width - this.bee.width) {
            x = this.canvas.width - this.bee.width;
        }

        if (y < this.bee.height / 2) {
            y = this.canvas.y;
        } else if (y > this.canvas.height - this.bee.height) {
            y = this.canvas.height - this.bee.height;
        }

        this.bee.setEndPosition(x, y);
    }

    render() {
        this.updateGoodFlowers(this.goodFlowers);
        this.updateBadFlowers(this.badFlowers);

        this.updateBear(this.leftBear);
        this.updateBear(this.rightBear);

        this.updateBeeEater();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawFlowers(this.goodFlowers);
        this.drawFlowers(this.badFlowers);

        this.hive.draw();

        // one function for bears

        this.leftBear.determineSteps();
        this.leftBear.move();
        this.leftBear.draw();

        this.rightBear.determineSteps();
        this.rightBear.move();
        this.rightBear.draw();

        this.bee.move();
        this.bee.draw();

        //+
        this.beeEater.draw();


        if (!this.isGameOver) {
            requestAnimationFrame(this.renderBind);
        }
    }


    // flowers

    createFlowers(ClassFlower, flowers, n) {
        for (let i = 0; i < n; i++) {
            let flower = new ClassFlower(this.context);
            this.setPositionForFlower(flower);
            flowers.push(flower);
        }
    }

    setPositionForFlower(flower) {
        let x = this.getRandom(0, this.canvas.width - flower.width);
        let y = this.getRandom(0, this.canvas.height - flower.height);
        flower.setPosition(x, y);

        if (this.checkIntersectionObjects(flower, this.hive)) {
            this.setPositionForFlower(flower);
        }
    }

    drawFlowers(flowers) {
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].draw();
        }
    }

    addFlowers() {
        if (this.goodFlowers.length < (this.maxNumberGoodFlowers * 0.8)) {
            let numberFlowers = 1;
            this.createFlowers(GoodFlower, this.goodFlowers, numberFlowers);
        }
    }

    changePosBadFlowers() {
        for(let i = 0; i < this.badFlowers.length; i++) {
            let flower = this.badFlowers[i];
            this.setPositionForFlower(flower);
        }
    }

    updateGoodFlowers(flowers) {
        let arrIntersectionGoodFlowers = this.checkIntersectionObjectsBeeFlowers(flowers);
        this.counterGoodFlowers += arrIntersectionGoodFlowers.length;
        this.showCounterGoodFlowers(this.counterGoodFlowers);

        if (arrIntersectionGoodFlowers.length) {
            this.checkGoodFlowers();
            this.deleteFlowers(arrIntersectionGoodFlowers, flowers);
        }
    }

    updateBadFlowers(badFlowers) {
        let arrIntersectionBadFlowers = this.checkIntersectionObjectsBeeFlowers(badFlowers);
        this.counterHealth -= arrIntersectionBadFlowers.length;
        this.showCounterHealth(this.counterHealth);

        if (arrIntersectionBadFlowers.length) {
            this.checkHealth();
            this.deleteFlowers(arrIntersectionBadFlowers, badFlowers);
        }
    }

    checkIntersectionObjectsBeeFlowers(flowers) {
        let arrIntersectionObjects = [];

        for (let i = 0; i < flowers.length; i++) {
            let flower = flowers[i];

            if (this.checkIntersectionObjects(this.bee, flower)) {
                arrIntersectionObjects.push(flower);
            }
        }

        return arrIntersectionObjects;
    }

    checkGoodFlowers() {
        if (this.counterGoodFlowers >= 50) {
            this.showCounterHealth('You are winner');
            this.destroy();
        }
    }

    checkHealth() {
        if (this.counterHealth === 0) {
            this.showCounterHealth('Game over');
            this.destroy();
        }
    }

    destroy() {
        clearInterval(this.intervalAddFlowers);
        clearTimeout(this.timerMoveRightBear);
        clearTimeout(this.timerMoveLeftBear);
        this.timerId = null;
        this.isGameOver = true;
    }

    deleteFlowers(flowersForDelete, flowers) {
        while (flowersForDelete.length) {
            let index = flowers.indexOf(flowersForDelete[0]);
            flowersForDelete[0].delete();
            flowers.splice(index, 1);
            flowersForDelete.shift();
        }
    }


    // bears

    updateBear(bear) {
        if (this.checkIntersectionObjects(bear, this.hive)) {
            bear.turnOtherWay();
            this.counterGoodFlowers = 0;
        }

        if (this.checkIntersectionObjects(bear, this.bee)) {
            this. meetBearAndBee(bear);
        }
    }

    meetBearAndBee(bear) {
        this.bee.stopMove();
        bear.meetBee();
    }

    moveLeftBearsCyclically() {
        this.leftBear.setToInitialState();

        clearTimeout(this.timerMoveLeftBear);
        let milliseconds = this.getRandom(20000, 30000);
        this.timerMoveLeftBear = setTimeout(this.moveLeftBearsCyclicallyBind, milliseconds);
    }

    moveRightBearsCyclically() {
        this.rightBear.setToInitialState();

        clearTimeout(this.timerMoveRightBear);
        let milliseconds = this.getRandom(20000, 30000);
        this.timerMoveRightBear = setTimeout(this.moveRightBearsCyclicallyBind, milliseconds);
    }

    // beeEater

    updateBeeEater() {
        this.beeEater.checkCollisionBorderCanvas(this.canvas.width, this.canvas.height, this.canvas.x, this.canvas.y );

        if(this.checkIntersectionObjects(this.beeEater, this.bee)) {
            this.bee.stopMove();
            this.counterHealth -= 1;
            this.showCounterHealth(this.counterHealth);
            this.checkHealth();
        }
    }

}

let main  = new Main();


