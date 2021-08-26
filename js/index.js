window.onload = () => {
//Create the canvas and its context

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let audio = document.querySelector('audio');
    audio.volume = 0.5;

    let frameId = null;
    let obstacleId = null;
    let bulletsArray = [];
    
    


//Paint in the canvas from the constructors

    const background = new Background(ctx);
    const player = new Player (ctx, canvas.width / 2 - 100, canvas.height - 150); //this is an example, MUST BE FIXED

//Create audio

function bulletAudio() {
    audio.volume = 0.5;
    audio.src = 'sounds/lazer7.mp3';
    audio.play();
  }

  function enemiesDied() {
    audio.volume = 0.20;
    audio.src = 'sounds/Explosion+1.mp3';
    audio.play();
  }
 

  function gameOverAudio() {
    audio.src = 'sounds/mixkit-retro-arcade-game-over-470.wav';
    audio.play();
  }

//Create the score

const score = {
    points: 0,
    draw: function (){
       ctx.font = '30px Orbitron'; //this is an example, MUST BE FIXED
       ctx.fillStyle = 'gold'; //this is an example, MUST BE FIXED
       ctx.fillText('Score: ' + this.points, 200, 50);
       }
   };

//Create the array to store the enemies

   const obstaclesArray = [];

//create an interval to add enemies into the Obstacles Array

    obstacleId = setInterval (function (){
        let obstacle = new Obstacle (
        ctx, 
        Math.abs(Math.ceil(Math.random() * canvas.width - obstacleImg.width)), //position X (example, MUST BE FIXED)
        0, //position Y
        Math.random() * 250 + 150, //width, example MUST BE FIXED
        Math.random() * 100 + 100, //height, example MUST BE FIXED
        Math.ceil(Math.random() * 0.5) //speed, example, MUST BE FIXED
    );

    score.points +=5;

    obstaclesArray.push(obstacle);

        }, 2000); //time, example MUST BE FIXED

//Determine when the collision happens

    function checkCollisions(player, obstacle){
        let collision = 
        
            player.x <= obstacle.x + obstacle.width &&
            player.x + player.width >= obstacle.x &&
            player.y <= obstacle.y + obstacle.height &&
            player.y + player.height >= obstacle.y;

        if (collision){
            cancelAnimationFrame(frameId);
            clearInterval(obstacleId);
            ctx.font='25px Orbitron';
            ctx.fillStyle = 'red';
            ctx.fillText('GAME OVER! Your score: ' + score.points, 80, 300);
            ctx.textAlign = "center";
            //alert('GAME OVER!')
            window.setTimeout(function(){location.reload()}, 4000);
             }
        }
        

        //Determine when a bullet kill an enemy

   
        function killEnemy(){
            let hit = false
            console.log("obstacleImg: ", obstacleImg);
        for(let i=0;i<obstaclesArray.length;i++){
             for(let j=0;j<bulletsArray.length;j++){
     
                 if(!obstaclesArray[i]) continue;
                 
                 const bullet = bulletsArray[j]
                 const obstacle = obstaclesArray[i]
                 hit = (
                     (
                         bullet.y <= obstacle.y + obstacle.height &&
                         bullet.y >= obstacle.y
                     )
                     &&
                     (
                         bullet.y + bullet.height >= obstacle.y &&
                         bullet.y + bullet.height <= obstacle.y + obstacle.height
                     )
                     &&
                     (
                         bullet.x <= obstacle.x + obstacle.width &&
                         bullet.x + bullet.width >= obstacle.x
                     )
                     &&
                     (
                         bullet.x + bullet.width <= obstacle.x + obstacle.width &&
                         bullet.x + bullet.width >= obstacle.x 
                     )
                 )
                     if(hit){
                         score.points +=10;
                         obstaclesArray.splice(i, 1);
                         enemiesDied();
                         bulletsArray.splice(j, 1);
                     }
                 }
             }
         }


//Scores points

    function updateScore () {
        numObstaclesTotal = obstaclesArray.length;

        obstaclesArray = obstaclesArray.filter((eachObstacle) => {
        eachObstacle.y < canvas.height;
        });

        bulletsArray = bulletsArray.filter((eachBullet) => {
            eachBullet.y < 0;
            });

        numObstaclesOnScreen = obstaclesArray.length;

        score.points += numObstaclesTotal - numObstaclesOnScreen;

    }

//Player shooting

function makeBullet (){
    let bullet = new Bullet (
        ctx, 
        player.x + player.width/1.35 - 10/2,   //position X (example, MUST BE FIXED)
        player.y, //position Y
        
    ); 

    bulletsArray.push(bullet);
    
}

//THE GAME LOGIC

    function gameLoop (){
//create loop to animate the game

    frameId = requestAnimationFrame(gameLoop);

//Testing => check if the game work with console.log
    console.log('The Battle Started');

//Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

//Add the objects
    background.draw();
    player.draw();
    score.draw();
    killEnemy();
    
    console.log(obstaclesArray)

//Loop in the array and print and move every obstacle
    obstaclesArray.forEach((eachObstacle) => {
        eachObstacle.draw();
        //console.log(`this obstacles ` , eachObstacle.draw());
        eachObstacle.move();
        checkCollisions(player, eachObstacle);
        });

        //Loop in the array and print the bullets
    bulletsArray.forEach((eachBullet) => {
        eachBullet.draw();
        
        eachBullet.move();
        
        });

//Remove obstacles that outside of the screen and update score
    updateScore();

    }

//Start the game when clicking on Start button

    document.getElementById('start-button').onclick = () => {
         gameLoop();
        }

//Add move to the player with the arrow keys adding an event listener

    window.addEventListener('keydown', movePlayer);

    function movePlayer(event) {
        event.preventDefault();
        switch (event.keyCode){
            case 37:
            if (player.x >0) player.x -=15;//must be FIXED
            break;
            case 39:
            if (player.x < canvas.width - player.width) player.x +=15; //must be FIXED
            break;
            case 32:
                if (event.repeat) {
                    break;      // do nothing when event is in repeat mode
                }
                else {
                    makeBullet();
                    bulletAudio();
                    break;
                }
             }

         }
};