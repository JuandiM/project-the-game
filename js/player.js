
class Player {
    constructor(canvasContext, positionX, positionY){
        this.playerImg = document.createElement('img');
        this.playerImg.src = 'images/ironman360.png';//ADD IMAGE
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = 100; 
        this.height = 150;

        this.scaledWidth = this.width * this.scale;
        this.scaledHeight = this.height * this.scale;
        this.pictureSide = 1;
        this.scale = 1;
    }

    draw() {

        this.ctx.drawImage(
            this.playerImg,
            this.pictureSide * 370,0,
            370, 472,
            this.x, this.y,
            370/4, 472/4
            ); 
    /*     this.ctx.drawImage(
        this.playerImg,
        this.pictureSide * this.width, this.height,
        this.width, this.height,
        this.x, this.y,
        this.scaledWidth, this.scaledHeight); */
    }
};

