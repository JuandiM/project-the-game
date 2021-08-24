const bulletImg = document.createElement('img');
bulletImg.src = 'images/city.png';//ADD BULLET IMAGE

class Bullet {
constructor(canvasContext, positionX, positionY){
    (this.ctx = canvasContext),
    (this.image = bulletImg),
    (this.x = positionX),
    (this.y = positionY),
    (this.width = 10),
    (this.height = 10),
    (this.speed = 5);
}

draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

move (){
    this.y -= this.speed;
}

}