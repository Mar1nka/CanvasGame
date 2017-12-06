class Flower {
    constructor (context) {
        this.context = context;
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.color = '';
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

    delete () {

    }
}

window.Flower = Flower;