window.onload = () => {
//Create the canvas and its context

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let frameId = null;
    let obstacleId = null;


//Paint in the canvas from the constructors

    const background = new Background(ctx);
    const player = new Player (ctx, canvas.width / 2 - 50, canvas.height - 150); //this is an example, MUST BE FIXED

//Create the score

const score = {
    points: 0,
    draw: function (){
       ctx.font = '30px Verdana'; //this is an example, MUST BE FIXED
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
        Math.random() * canvas.width - 50, //position X (example, MUST BE FIXED)
        0, //position Y
        Math.random() * 50 + 50, //width, example MUST BE FIXED
        Math.random() * 35 + 35, //height, example MUST BE FIXED
        Math.ceil(Math.random()* 3)//speed, example, MUST BE FIXED
    );

    score.points +=10;

    obstaclesArray.push(obstacle);

        }, 2000); //time, example MUST BE FIXED

//Determine when the collision happens

    function checkCollisions(player, obstacle){
        let collision = 
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y;

        if (collision){
            cancelAnimationFrame(frameId);
            clearInterval(obstacleId);
            alert('GAME OVER!')
            window.location.reload();
             }
        }

//Scores points

    function updateScore () {
        numObstaclesTotal = obstaclesArray.length;

        obstaclesArray = obstaclesArray.filter((eachObstacle) => {
        eachObstacle.y < canvas.height;
        });

        numObstaclesOnScreen = obstaclesArray.length;

        score.points += numObstaclesTotal - numObstaclesOnScreen;

    }

//Player shooting
/*




*/


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
    console.log(obstaclesArray)

//Loop in the array and print and move every obstacle
    obstaclesArray.forEach((eachObstacle) => {
        eachObstacle.draw();
        //console.log(`this obstacles ` , eachObstacle.draw());
        eachObstacle.move();
        checkCollisions(player, eachObstacle);
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
        switch (event.keyCode){
            case 37:
            if (player.x >0) player.x -=15; //must be FIXED
            break;
            case 39:
            if (player.x < canvas.width - player.width) player.x +=15; //must be FIXED
            break;
// THE PLAYER IS NOT SHOOTING FIRE, SPACEBAR KEYCODE MUST BE ADDED

             }


         }


};