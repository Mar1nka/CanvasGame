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
        this.directionX  = 1;
        this.directionY = 1;
        this.endX = 0;
        this.endY = 0;
        this.stepX = 0;
        this.stepY = 0;
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    setEndPosition(x, y) {
        this.endX = x;
        this.endY = y;

        this.determineSteps();
    }

    determineSteps() {
        this.directionX = this.getDirection(this.endX, this.x);
        this.directionY = this.getDirection(this.endY, this.y);

        let speedsObj = this.getSpeedsRerFrame();

        this.stepX = this.directionX * speedsObj.speedPerFrameX;
        this.stepY = this.directionY * speedsObj.speedPerFrameY;
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
            this.x += this.stepX;
        }

        if ((this.directionY === 1 && this.y < this.endY) || (this.directionY === -1 && this.y > this.endY)) {
            this.y += this.stepY;
        }
    }

    draw () {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.stroke();
    }
}

window.Bee = Bee;

