class BadFlower extends Flower{
    constructor (context) {
        super(context);
        this.image.src = 'images/badFlower.png';
        // this.color = '#851371';
    }
}

window.BadFlower = BadFlower;