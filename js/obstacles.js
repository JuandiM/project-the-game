const obstacleImg = document.createElement('img');
obstacleImg.src = 'images/gratis-png-robot-sprite-mecha-juego-de-plataforma-robot-removebg-preview.png';//ADD OBSTACLE IMAGE

class Obstacle {
constructor(canvasContext, positionX, positionY, width, height, speed){
    (this.ctx = canvasContext),
    (this.image = obstacleImg),
    (this.x = positionX),
    (this.y = positionY),
    (this.width = width),
    (this.height = height),
    (this.speed = speed);
}

draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

move (){
    this.y += this.speed;
}

}