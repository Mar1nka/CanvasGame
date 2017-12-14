'use strict';

(function () {
    const PlayGround = global.PlayGround;
    const TIME_OVER_MS = 300500;


    function Game() {
        this.timeOverTimerId = undefined;
        this.timeOverHandlerBind = this.timeOverHandler.bind(this);

        this.messageElement = null;

        this.showGameWinMessageBind = this.showGameWinMessage.bind(this);
        this.showGameOverMessageBind = this.showGameOverMessage.bind(this);
        this.destroyBind = this.destroy.bind(this);

        this.playGround = undefined;

        EventObserver.addEventListener('gameOver', this.showGameOverMessageBind);
        EventObserver.addEventListener('winning', this.showGameWinMessageBind);
    }

    Game.prototype.start = function start() {
        this.playGround = new PlayGround();
        this.playGround.start();

        this.scheduleTimeOver();

        window.addEventListener('hashchange', this.destroyBind);
    }

    Game.prototype.restart = function restart() {
        this.playGround.start();
        this.scheduleTimeOver();
    }

    Game.prototype.scheduleTimeOver = function scheduleTimeOver() {
        this.timeOverTimerId = setTimeout(this.timeOverHandlerBind, TIME_OVER_MS);
    }


    Game.prototype.timeOverHandler = function timeOverHandler() {
        this.stop();
        this.showGameOverMessage();
    }

    Game.prototype.showGameWinMessage = function () {

        this.showMessage('You are a winner!!!');
    }

    Game.prototype.showGameOverMessage = function () {
        this.playGround.destroy();
        this.showMessage('Game over');
    }


    Game.prototype.removeMessage = function removeMessage() {
        if (this.messageElement) {
            this.messageElement.parentNode.removeChild(this.messageElement);
        }
    }

    Game.prototype.showMessage = function showMessage(message) {
        let _this = this;

        let messageTextElement = document.createElement('p');
        messageTextElement.innerText = message;

        let messageTextWrapperElement = document.createElement('div');
        messageTextWrapperElement.classList.add('game-message__text');
        messageTextWrapperElement.appendChild(messageTextElement);


        let messageMenuButtonElement = document.createElement('a');
        messageMenuButtonElement.classList.add('game-message__button');
        messageMenuButtonElement.innerText = 'menu';
        messageMenuButtonElement.href = '#main-menu';


        let messageAgainButtonElement = messageMenuButtonElement.cloneNode(true);
        messageAgainButtonElement.innerText = 'Play again';
        messageAgainButtonElement.href = '#game';

        messageAgainButtonElement.addEventListener('click', function () {
            _this.removeMessage();
            _this.restart();
        })

        let messageButtonWrapperElement = document.createElement('div');
        messageButtonWrapperElement.classList.add('game-message__button-wrapper');
        messageButtonWrapperElement.appendChild(messageMenuButtonElement);
        messageButtonWrapperElement.appendChild(messageAgainButtonElement);

        let messageElement = document.createElement('div');
        messageElement.classList.add('game-message');
        messageElement.appendChild(messageTextWrapperElement);
        messageElement.appendChild(messageButtonWrapperElement);

        document.body.appendChild(messageElement);

        this.messageElement = messageElement;
    }

    Game.prototype.stop = function () {
        clearTimeout(this.timeOverTimerId);
    }

    Game.prototype.destroy = function () {
        this.stop();
        this.playGround.destroy();
        this.removeMessage();
        window.removeEventListener('hashchange', this.destroyBind);

    }

    global.Game = Game;
})();
