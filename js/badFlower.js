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

window.BadFlower = BadFlower;