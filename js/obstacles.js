const obstacleImg = document.createElement('img');
obstacleImg.src = 'images/67-675339_33-night-king-from-game-of-thrones-game-removebg-preview.png';//ADD OBSTACLE IMAGE

class Obstacle {
constructor(canvasContext, positionX, positionY, width, height, speed){
    this.ctx = canvasContext,
    this.x = positionX,
    this.y = positionY,
    this.width = width,
    this.height = height,
    this.speed = speed;
}

draw() {
    this.ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
}

move (){
    this.y += this.speed;
}

}