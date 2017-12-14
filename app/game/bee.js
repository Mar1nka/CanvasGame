(function () {
    'use strict';

    const KEY_CODES = {
        up: 38,
        down: 40,
        left: 37,
        right: 39
    }

    class Bee {
        constructor (context) {
            this.context = context;
            this.canvas = context.canvas;
            this.canvasBoundingRect = this.canvas.getBoundingClientRect();

            this.x = 0;
            this.y = 0;
            this.width = 80;
            this.height = 80;
            this.color = '#0e671d';

            this.speedPerFrame = 4;
            this.directionX = 1;
            this.directionY = 1;
            this.endX = 0;
            this.endY = 0;
            this.stepX = 0;
            this.stepY = 0;

            this.rightMovingImage = new Image();
            this.rightMovingImage.src = 'images/scene/rightMovingBee.png';

            this.leftMovingImage = new Image();
            this.leftMovingImage.src = 'images/scene/leftMovingBee.png';

            this.currentImageIndex = 0;
            this.imageFrameNumber = 3;

            this.frameCounter = 0;
            this.frameDelay = 1;

            this.croppedWidth = 389;
            this.croppedHeight = 433;

            this.rightMovingImage.addEventListener('load', () => {
            })

            this.rightKeyPressed = false;
            this.leftKeyPressed = false;
            this.upKeyPressed = false;
            this.downKeyPressed = false;

            this.clickHandler = this.clickHandler.bind(this);
            this.keyDownHandler = this.keyDownHandler.bind(this);
            this.keyUpHandler = this.keyUpHandler.bind(this);

            //TODO removeListeners in bee.destroy method
            window.addEventListener('click', this.clickHandler);
            window.addEventListener("keydown", this.keyDownHandler, false);
            window.addEventListener("keyup", this.keyUpHandler, false);

            //TODO removeListener in bee.destroy method
            window.addEventListener('resize', () => {
                this.canvasBoundingRect = this.canvas.getBoundingClientRect();
            })
        }


        get currentImage () {
            if (this.directionX === 1) {
                return this.rightMovingImage;
            } else {
                return this.leftMovingImage;
            }
        }


        draw () {
            this.frameCounter++;

            if (this.frameCounter > this.frameDelay) {
                this.frameCounter = 0;

                if (this.currentImageIndex < this.imageFrameNumber - 1) {
                    this.currentImageIndex += 1;
                } else {
                    this.currentImageIndex = 0;
                }
            }

            this.context.drawImage(
                this.currentImage,
                Math.floor(this.croppedWidth * this.currentImageIndex),
                0,
                this.croppedWidth,
                this.croppedHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }


        setPosition (x, y) {
            this.x = x;
            this.y = y;

            this.setEndPosition(x, y);
        }

        setEndPosition (x, y) {
            this.endX = x;
            this.endY = y;
        }

        determineSteps () {
            this.directionX = this.getDirection(this.endX, this.x);
            this.directionY = this.getDirection(this.endY, this.y);

            let speedsObj = this.getSpeedsRerFrame();

            this.stepX = this.directionX * speedsObj.speedPerFrameX;
            this.stepY = this.directionY * speedsObj.speedPerFrameY;
        }

        //TODO maybe create property [ get direction ()]  without parameters
        getDirection (endPos, pos) {
            let direction = 1;

            if ((endPos - pos) < 0) {
                direction = -1;
            }

            return direction;
        }

        getSpeedsRerFrame () {
            let distanceX = Math.abs(this.endX - this.x);
            let distanceY = Math.abs(this.endY - this.y);

            let maxDistance = distanceX;
            let minDistance = distanceY;

            if (distanceY > distanceX) {
                maxDistance = distanceY;
                minDistance = distanceX;
            }

            let minSpeedPerFrame = (minDistance * this.speedPerFrame) / maxDistance;
            let speedPerFrameX = this.speedPerFrame;
            let speedPerFrameY = this.speedPerFrame;

            if (minDistance === distanceX) {
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

        stopMove () {
            this.endX = this.x;
            this.endY = this.y;
        }

        normalizePosition (x, y) {
            if (x < 0) {
                x = this.canvas.x;
            } else if (x > this.canvas.width - this.width) {
                x = this.canvas.width - this.width;
            }

            if (y < 0) {
                y = this.canvas.y;
            } else if (this.y > this.canvas.height - this.height) {
                y = this.canvas.height - this.height;
            }

            return {
                'x': x,
                'y': y
            };
        }

        move () {
            if (this.rightKeyPressed || this.leftKeyPressed || this.upKeyPressed || this.downKeyPressed) {
                const step = 5;

                //Key press handler
                let x = this.endX;
                let y = this.endY;

                if (this.rightKeyPressed) {
                    x += step;
                } else if (this.leftKeyPressed) {
                    x -= step;
                }
                if (this.upKeyPressed) {
                    y -= step;
                } else if (this.downKeyPressed) {
                    y += step;
                }

                let position = this.normalizePosition(x, y);
                this.setEndPosition(position.x, position.y);

                this.determineSteps();
            }
            //Click Handler
            if ((this.directionX === 1 && this.x < this.endX) || (this.directionX === -1 && this.x > this.endX)) {
                this.x += this.stepX;
            }

            if ((this.directionY === 1 && this.y < this.endY) || (this.directionY === -1 && this.y > this.endY)) {
                this.y += this.stepY;
            }
        }


        clickHandler (event) {
            let x = event.clientX - this.canvasBoundingRect.left - this.width / 2;
            let y = event.clientY - this.canvasBoundingRect.top - this.height / 2;


            let position = this.normalizePosition(x, y);
            this.setEndPosition(position.x, position.y);
            this.determineSteps();
        }

        keyDownHandler (event) {
            if (event.keyCode === KEY_CODES.right) {
                this.rightKeyPressed = true;
            } else if (event.keyCode === KEY_CODES.left) {
                this.leftKeyPressed = true;
            } else if (event.keyCode === KEY_CODES.up) {
                this.upKeyPressed = true;
            } else if (event.keyCode === KEY_CODES.down) {
                this.downKeyPressed = true;
            }
        }

        keyUpHandler (event) {
            if (event.keyCode === KEY_CODES.right) {
                this.rightKeyPressed = false;
            } else if (event.keyCode === KEY_CODES.left) {
                this.leftKeyPressed = false;
            } else if (event.keyCode === KEY_CODES.up) {
                this.upKeyPressed = false
            } else if (event.keyCode === KEY_CODES.down) {
                this.downKeyPressed = false
            }
        }

    }

    global.Bee = Bee;
})();