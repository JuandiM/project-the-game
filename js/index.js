window.onload = () => {
//Create the canvas and its context

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let frameId = null;
    let obstacleId = null;


//Paint in the canvas from the constructors

    const background = new Background(ctx);
    const dragon = new Dragon (ctx, canvas.width / 2 - 50, canvas.height - 110); //this is an example, MUST BE FIXED


//Create the array to store the obstacles/white walkers

    let obstaclesArray = [];

//Create the score

    const score = {
     points: 0,
     draw: function (){
        ctx.font = '60 Verdana'; //this is an example, MUST BE FIXED
        ctx.fillStyle = 'gold'; //this is an example, MUST BE FIXED
        ctx.fillText('Score: ' + this.points, 200, 50);
        }
    };

//create an interval to add adding white-walkers in to the Obstacles Array

    obstacleId = setInterval(function (){
        let obstacle = new Obstacle (
        ctx,
        Math.random() * canvas.width - 200, //position X (example, MUST BE FIXED)
        0, //position Y
        Math.random() * 100 + 100, //width, example MUST BE FIXED
        Math.random() * 15 + 10, //heigth, example MUST BE FIXED
        Math.ceil(Math.random()* 3)//speed, example, MUST BE FIXED
    );

    score.points +=10;

    obstaclesArray.push(obstacle);

        }, 2000); //time, example MUST BE FIXED

//Determine when the collision happens

    function checkCollisions(dragon, obstacle){
        let collision = 
            dragon.x < obstacle.x + obstacle.width &&
            dragon.x + dragon.width > obstacle.x &&
            dragon.y < obstacle.y + obstacle.height &&
            dragon.y + dragon.height > obstacle.y;

        if (collision){
            cancelAnimationFrame(frameId);
            clearInterval(obstaclesId);
            alert('GAME OVER! The Night King got you, now you belong to the White Walkers')
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
    dragon.draw();
    score.draw();
    

//Loop in the array and print and move every obstacle
    obstaclesArray.forEach((eachObstacle) => {
        eachObstacle.draw();
        eachObstacle.move();
        checkCollisions(dragon, eachObstacle);
        });

//Remove obstacles that outside of the screen and update score
    updateScore();

    }

//Start the game when clicking on Start button

    document.getElementById('start-button').onclick = () => {
         gameLoop();
        }

//Add move to the dragon with the arrow keys adding an event listener

    window.addEventListener('keydown', moveDragon);

    function moveDragon(event) {
        switch (event.keyCode){
            case 37:
            if (dragon.x >0) dragon.x -=15; //must be FIXED
            break;
            case 39:
            if (dragon.x < canvas.width - dragon.width) dragon.x +=15; //must be FIXED
            break;
// THE DRAGON IS NOT SHOOTING FIRE, SPACEBAR KEYCODE MUST BE ADDED
            default:
                break;

             }


         }


};