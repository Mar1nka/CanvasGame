
class Bear {
    constructor(context) {
        this.context = context;
        this.x;
        this.y;
        this.width = 100;
        this.height = 150;
        this.color = '#904B15';

        this.originalSpeedPerFrame = 1;
        this.speedPerFrame = 1;
        this.directionX;
        this.directionY;
        this.endX = 0;
        this.endY = 0;
        this.stepX;
        this.stepY;

        this.isChangeDirectionX = false;
        this.isChangeDirectionY = false;
        this.isIntersectionBee = false;

        this.startPosX;
        this.startPosY;
        this.goalPosX;
        this.goalPosY;
        this.finishPosX;
        this.finishPosY;
    }

    setConstPos(objPos) {
        this.startPosX = objPos.startPosX;
        this.startPosY = objPos.startPosY;
        this.goalPosX = objPos.goalPosX;
        this.goalPosY = objPos.goalPosY;
        this.finishPosX = objPos.finishPosX;
        this.finishPosY = objPos.finishPosY;

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

    move () {

        if ((this.directionX === 1 && this.x < this.endX) || (this.directionX === -1 && this.x > this.endX)) {
            this.x += this.stepX;
        }

        if ((this.directionY === 1 && this.y < this.endY) || (this.directionY === -1 && this.y > this.endY)) {
            this.y += this.stepY;
        }
    }


    turnOtherWay() {
        this.setEndPosition(this.finishPosX, this.finishPosY);
        this.directionX *= -1;
        this.isChangeDirectionX = true;
    }

    meetBee() {
        this.speedPerFrame += 0.5 ;

        if(!this.isChangeDirectionX && !this.isIntersectionBee) {
            this.setEndPosition(this.finishPosX, this.finishPosY);
            this.directionX *= -1;
            this.isChangeDirectionX = true;
        }

        this.isIntersectionBee = true;
    }

    setToInitialState() {
        this.setPosition(this.startPosX, this.startPosY);
        this.speedPerFrame = this.originalSpeedPerFrame;
        this.isChangeDirectionX  = false;
        this.isIntersectionBee = false;
        this.draw();
        this.setEndPosition(this.goalPosX, this.goalPosY);
    }



    draw () {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.stroke();
    }
}

window.Bear = Bear;
