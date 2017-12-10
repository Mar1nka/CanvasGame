

class GoodFlower extends Flower{
    constructor (context) {
        super(context);

        this.image.src = 'images/goodFlower.png';
        // this.color = '#ee822e';
    }
}

window.GoodFlower = GoodFlower;