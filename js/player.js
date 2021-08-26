const playerImg = document.createElement('img');
playerImg.src = 'images/Mobile - Marvel Avengers Alliance - Iron Man Mark 5 Armor.png';//ADD IMAGE

class Player {
    constructor(canvasContext, positionX, positionY){
        this.ctx = canvasContext;
        this.image = playerImg;
        this.x = positionX;
        this.y = positionY;
        this.width = 100;
        this.height = 150;
    }

    draw() {
        this.ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
    }
};

