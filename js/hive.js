class Hive {
    constructor(context) {
        this.context = context;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 150;
        this.color = '#634c0b';

        this.image = new Image();
        this.image.src = 'images/hive.png';
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    draw () {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

window.Hive = Hive;