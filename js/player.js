const dragonImg = document.createElement('img');
dragonImg.src = 'images/ironman-fly--removebg-preview.png';//ADD DRAGON IMAGE

class Dragon {
    constructor(canvasContext, positionX, positionY){
this.ctx = canvasContext
this.image = dragonImg,
this.x = positionX,
this.y = positionY,
this.width = 50,
this.height = 100
    }

    draw() {
        this.ctx.drawImage(dragonImg, this.x, this.y, this.width, this.height);
    }
};

