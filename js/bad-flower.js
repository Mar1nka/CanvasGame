class BadFlower extends Flower{
    constructor (context) {
        super(context);
        this.image.src = 'images/badFlower.png';
    }
}

window.BadFlower = BadFlower;