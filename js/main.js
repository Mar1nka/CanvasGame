class Main {
    constructor () {
        this.canvas = null;
        this.context = null;
        this.hive = null;
        this.bee = null;
        this.leftBear = null;
        this.rightBear = null;
        this.beeEater = null;

        this.goodFlowers = [];
        this.maxNumberGoodFlowers = 20;

        this.badFlowers = [];
        this.maxNumberBadFlowers = (Math.floor(this.maxNumberGoodFlowers * 0.2));

        this.counterGoodFlowers = 0;
        this.counterHealth = this.maxNumberBadFlowers;


        this.requestAnimationId = undefined;

        this.intervalAddFlowers = undefined;
        this.timerMoveLeftBear = undefined;
        this.timerMoveRightBear = undefined;

        this.intervalChangePosBadFlowers = undefined;

        this.isGameOver = false;

        this.renderBind = this.render.bind(this);
        this.addFlowersBind = this.addFlowers.bind(this);
        this.moveLeftBearsCyclicallyBind = this.moveLeftBearsCyclically.bind(this);
        this.moveRightBearsCyclicallyBind = this.moveRightBearsCyclically.bind(this);

        //+
        this.changePosBadFlowersBind = this.changeBadFlowersPositions.bind(this);

        this.currentObj = [this.goodFlowers];
        this.difficultyScores = [10, 20, 30, 50];
        this.currentDifficulty = this.difficultyScores[0];

        this.init();

        window.addEventListener('resize', () => {
            this.canvas.width = document.body.offsetWidth;
            this.canvas.height = document.body.offsetHeight - 80;
        })
    }

    init () {
        this.initCanvas();
        this.initHive();
        this.initGoodFlowers();
        // this.initBadFlowers();
        this.initBee();
        // this.initBears();

        //+
        // this.initBeeEater();

        this.showGoodFlowersCcounter(this.counterGoodFlowers);
        this.showHealthCounter(this.counterHealth);

        this.requestAnimationId = requestAnimationFrame(this.renderBind);

        this.intervalAddFlowers = setInterval(this.addFlowersBind, 500);
        // this.timerMoveLeftBear = setTimeout(this.moveLeftBearsCyclicallyBind, 2000);
        // this.timerMoveRightBear = setTimeout(this.moveRightBearsCyclicallyBind, 8000);

        //+
        // this.intervalChangePosBadFlowers = setInterval(this.changePosBadFlowersBind, 5000);
    }

    initCanvas () {
        this.canvas = document.querySelector('.play-area');
        this.context = this.canvas.getContext('2d');

        this.canvas.style.background = '#7DC24B';

        this.canvas.width = document.body.offsetWidth;
        this.canvas.height = document.body.offsetHeight - 80;

        this.canvas.x = 0;
        this.canvas.y = 0;
    }


    initHive () {
        this.hive = new Hive(this.context);
        this.hive.setPosition(this.canvas.width / 2 - this.hive.width / 2, this.canvas.height / 2 - this.hive.height /
            2);
        this.hive.draw();
    }

    initGoodFlowers () {
        this.createFlowers(GoodFlower, this.goodFlowers, this.maxNumberGoodFlowers);
        this.drawFlowers(this.goodFlowers);
    }

    initBadFlowers () {
        this.createFlowers(BadFlower, this.badFlowers, this.maxNumberBadFlowers);
        this.drawFlowers(this.badFlowers);
        this.intervalChangePosBadFlowers = setInterval(this.changePosBadFlowersBind, 5000);
    }

    initBee () {
        this.bee = new Bee(this.context);
        this.bee.setPosition(this.canvas.width / 4 - this.bee.width / 2, this.canvas.height / 4 - this.bee.height / 2);
        this.bee.draw();
    }

    initBears () {
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

        this.timerMoveLeftBear = setTimeout(this.moveLeftBearsCyclicallyBind, 0);
        this.timerMoveRightBear = setTimeout(this.moveRightBearsCyclicallyBind, 0);
    }

    initBeeEater () {
        this.beeEater = new BeeEater(this.context);
        this.beeEater.setPosition(this.canvas.width / 2, this.canvas.height - this.beeEater.height);
        this.beeEater.draw();
    }


    getRandom (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    checkIntersectionObjects (obj1, obj2) {
        return (obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.height + obj1.y > obj2.y);
    }

    showGoodFlowersCcounter (counter) {
        let element = document.querySelector('.counterGoodFlowers');
        element.innerHTML = counter;
    }

    showHealthCounter (counter) {
        let element = document.querySelector('.counterHealth');
        element.innerHTML = counter;
    }

    render () {

        for(let i = 0; i < this.currentObj.length; i++) {
            this.updateObj(this.currentObj[i]);
        }

        // this.updateGoodFlowers(this.goodFlowers);
        // this.updateBadFlowers(this.badFlowers);
        //
        // this.updateBear(this.leftBear);
        // this.updateBear(this.rightBear);
        //
        // this.updateBeeEater();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //this.context.drawImage(this.rightMovingImage, 0, 0, this.canvas.width, this.canvas.height);

        for(let i = 0; i < this.currentObj.length; i++) {
            this.drawObj(this.currentObj[i]);
        }


        // this.drawFlowers(this.goodFlowers);
        // this.drawFlowers(this.badFlowers);

        this.hive.draw();

        // one function for bears

        // this.leftBear.determineSteps();
        // this.leftBear.move();
        // this.leftBear.draw();
        //
        // this.rightBear.determineSteps();
        // this.rightBear.move();
        // this.rightBear.draw();

        this.bee.move();
        this.bee.draw();

        //+
        // this.beeEater.draw();

        if(!this.isGameOver) {
            this.requestAnimationId = requestAnimationFrame(this.renderBind);
        }
    }

    updateObj(obj) {

        switch (obj) {
            case this.goodFlowers:
                this.updateGoodFlowers(this.goodFlowers);
                break;
            case this.leftBear:
                this.updateBear(this.leftBear);
                break;
            case this.rightBear:
                this.updateBear(this.rightBear);
                break;
            case this.badFlowers:
                this.updateBadFlowers(this.badFlowers);
                break;
            case this.beeEater:
                this.updateBeeEater();
                break;
        }

        // if(obj === this.goodFlowers) {
        //     this.updateGoodFlowers(this.goodFlowers);
        // }
    }
    
    drawObj(obj) {
        switch (obj) {
            case this.goodFlowers:
                this.drawFlowers(this.goodFlowers);
                break;
            case this.leftBear:
                this.leftBear.determineSteps();
                this.leftBear.move();
                this.leftBear.draw();
                break;
            case this.rightBear:
                this.rightBear.determineSteps();
                this.rightBear.move();
                this.rightBear.draw();
                break;
            case this.badFlowers:
                this.drawFlowers(this.badFlowers);
                break;
            case this.beeEater:
                this.beeEater.move();
                this.beeEater.draw();
                break;
        }
    }


    // flowers

    createFlowers (ClassFlower, flowers, n) {
        for (let i = 0; i < n; i++) {
            let flower = new ClassFlower(this.context);
            this.setFlowersPosition(flower);
            //+
            flower.blossom();
            flowers.push(flower);
        }
    }

    setFlowersPosition (flower) {
        let x = this.getRandom(0, this.canvas.width - flower.width);
        let y = this.getRandom(0, this.canvas.height - flower.height);
        flower.setPosition(x, y);

        if (this.checkIntersectionObjects(flower, this.hive)) {
            this.setFlowersPosition(flower);
        }
    }

    drawFlowers (flowers) {
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].draw();
        }
    }

    addFlowers () {
        if (this.goodFlowers.length < (this.maxNumberGoodFlowers * 0.8)) {
            let numberFlowers = 1;
            this.createFlowers(GoodFlower, this.goodFlowers, numberFlowers);
        }
    }

    changeBadFlowersPositions () {
        for (let i = 0; i < this.badFlowers.length; i++) {
            let flower = this.badFlowers[i];
            // flower.fadeAway();
            flower.blossom();
            this.setFlowersPosition(flower);
        }
    }

    updateGoodFlowers (flowers) {
        let arrIntersectionGoodFlowers = this.checkIntersectionObjectsBeeFlowers(flowers);
        this.counterGoodFlowers += arrIntersectionGoodFlowers.length;
        this.showGoodFlowersCcounter(this.counterGoodFlowers);

        if (arrIntersectionGoodFlowers.length) {
            this.checkGoodFlowers();
            this.deleteFlowers(arrIntersectionGoodFlowers, flowers);
        }
    }

    updateBadFlowers (badFlowers) {
        let arrIntersectionBadFlowers = this.checkIntersectionObjectsBeeFlowers(badFlowers);
        this.counterHealth -= arrIntersectionBadFlowers.length;
        this.showHealthCounter(this.counterHealth);

        if (arrIntersectionBadFlowers.length) {
            this.checkHealth();
            this.deleteFlowers(arrIntersectionBadFlowers, badFlowers);
        }
    }

    checkIntersectionObjectsBeeFlowers (flowers) {
        let arrIntersectionObjects = [];

        for (let i = 0; i < flowers.length; i++) {
            let flower = flowers[i];

            if (this.checkIntersectionObjects(this.bee, flower)) {
                arrIntersectionObjects.push(flower);
            }
        }

        return arrIntersectionObjects;
    }

    checkGoodFlowers () {

        if(this.counterGoodFlowers >= this.currentDifficulty) {
            let index = this.difficultyScores.indexOf(this.currentDifficulty);

            switch (index) {
                case 0:
                    this.initBadFlowers()
                    this.currentObj.push(this.badFlowers);
                    break;
                case 1:
                    this.initBears();
                    this.currentObj.push(this.leftBear);
                    this.currentObj.push(this.rightBear);
                    break;
                case 2:
                    this.initBeeEater();
                    this.currentObj.push(this.beeEater);
                    break;
                case 3:
                    this.showHealthCounter('You are winner');
                    this.destroy();
                    break;

            }

            index++;
            this.currentDifficulty = this.difficultyScores[index];
        }



        // if (this.counterGoodFlowers >= 50) {
        //     this.showHealthCounter('You are winner');
        //     this.destroy();
        // }
    }

    checkHealth () {
        if (this.counterHealth <= 0) {
            this.showHealthCounter('Game over');
            this.destroy();
        }
    }

    destroy () {
        clearInterval(this.intervalAddFlowers);
        clearTimeout(this.timerMoveRightBear);
        clearTimeout(this.timerMoveLeftBear);
        cancelAnimationFrame(this.requestAnimationId);
        this.isGameOver = true;
    }


    deleteFlowers (flowersForDelete, flowers) {
        while (flowersForDelete.length) {
            let index = flowers.indexOf(flowersForDelete[0]);
             flowersForDelete[0].fadeAway();
             flowers.splice(index, 1);
            flowersForDelete.shift();
        }
    }

    // bears

    updateBear (bear) {
        if (this.checkIntersectionObjects(bear, this.hive)) {
            bear.turnOtherWay();
            this.counterGoodFlowers = 0;
        }

        if (this.checkIntersectionObjects(bear, this.bee)) {
            this.meetBearAndBeeHandler(bear);
        }
    }

    meetBearAndBeeHandler (bear) {
        this.bee.stopMove();
        bear.meetBeeHandler();
    }

    moveLeftBearsCyclically () {
        this.leftBear.setToInitialState();

        clearTimeout(this.timerMoveLeftBear);
        let milliseconds = this.getRandom(20000, 30000);
        this.timerMoveLeftBear = setTimeout(this.moveLeftBearsCyclicallyBind, milliseconds);
    }

    moveRightBearsCyclically () {
        this.rightBear.setToInitialState();

        clearTimeout(this.timerMoveRightBear);
        let milliseconds = this.getRandom(20000, 30000);
        this.timerMoveRightBear = setTimeout(this.moveRightBearsCyclicallyBind, milliseconds);
    }

    // beeEater

    updateBeeEater () {
        this.beeEater.checkCollisionBorderCanvas(this.canvas.width, this.canvas.height, this.canvas.x, this.canvas.y);

        if (this.checkIntersectionObjects(this.beeEater, this.bee)) {
            this.bee.stopMove();
            this.counterHealth = 0;
            this.showHealthCounter(this.counterHealth);
            this.checkHealth();
        }
    }

}

let main = new Main();


