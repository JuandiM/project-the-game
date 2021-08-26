const backgroundImg = document.createElement('img');
backgroundImg.src = 'images/leigh-kellogg-sanctum-sanctorum.jpeg';//ADD BACKGROUND IMAGE


class Background {
    constructor(canvasContext) {
        this.ctx=canvasContext;
        this.x = 0;
        this.y = 0;
        this.width = 500;
        this.height = 700;
    }

    draw() {
        this.ctx.drawImage(backgroundImg, this.x, this.y, this.width, this.height);
    }
}