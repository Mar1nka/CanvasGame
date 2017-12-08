class BeeEater {
    constructor (context) {
        this.context = context;
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.color = '#49619f';

        this.stepX = 2;
        this.stepY = -2;
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    checkCollisionBorderCanvas(canvasWidth, canvasHeight, canvasX, canvasY) {
    if(this.x + this.stepX > canvasWidth - this.width || this.x + this.stepX < canvasX) {
        this.stepX *= -1;
    }

    if(this.y + this.stepY > canvasHeight - this.height || this.y + this.stepY < canvasY) {
        this.stepY *= -1;
    }

    this.x += this.stepX;
    this.y += this.stepY;
}

    draw () {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.stroke();
    }
}

window.BeeEater = BeeEater;