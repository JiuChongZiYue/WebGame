const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvasWidth = canvas.width;
canvasHeight = canvas.height;

let score = 0;
const scoreDisplay = document.getElementById("score");

let health = 100;
const healthDisplay = document.getElementById ("health");

let ammo = 30;
const ammoDisplay = document.getElementById ("ammo");

let alive = true;
let paused = false;

const pauseButton = document.getElementById("pauseButton");


pauseButton.addEventListener("click", function() {

    paused = !paused;

    if (paused) {
        pauseButton.textContent = "Resume";
    } else {
        pauseButton.textContent = "Pause";
    }

});




document.addEventListener("keydown", function(event) {

    keys[event.key.toLowerCase()] = true;

    if (event.key === " ") {
        playerShoot();
    }
});












// Keep track of which keys are being pressed
const keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});






function beHurt (){


    for (let enemy of enemies){
        
        if (Math.abs(enemy.x - player.x) < 20 && Math.abs(enemy.y - player.y) < 20) {

            health -= 20;

            return;
            // alive = false;
        }
    }



    for (let [i, enemyBullet] of enemyBullets.entries()) {

        if (Math.abs(enemyBullet.x - player.x) < 10 && Math.abs(enemyBullet.y - player.y) < 10) {

            health -= 10;
            enemyBullets.splice(i, 1);
            
        }
    }


}

function ifDead (){
    if (health <= 0) {
        alive = false; 
    }
}


// Update the game
function update() {

    playerMovement ();
    enemyMovement ();
    EnemyBulletMovement();
    playerBulletMovement();
    KilledEnemy ();
    keepTrackingSupplies();
    beHurt ();
    

    score = score + 0.1;
    // scoreDisplay.textContent = score;
    scoreDisplay.textContent = score.toFixed(2);

    // healthDisplay.textContent = health;
    healthDisplay.textContent = health.toFixed(0);

    ammoDisplay.textContent = ammo.toFixed(0);
    
    ifDead ();

}










// Game loop
function gameLoop() {

    if (alive && !paused){
        
        drawPlayer();

        update();
        // drawEnemy(enemy);

        for (let enemy of enemies){
            drawEnemy(enemy);
        }

        drawEnemyBullets(); 

        drawPlayerBullets();


    }
    
}


// Run gameLoop 20 times per second
setInterval(gameLoop, 1000 / 15);