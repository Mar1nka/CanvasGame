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

window.Hive = Hive;