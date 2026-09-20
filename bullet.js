const enemyBullets = [];
const playerBullets = [];

function createPlayerBullet (playerX, playerY, direction){

    const bullet = {
        x: player.x,
        y: player.y,
        dx: lastDirection.x,
        dy: lastDirection.y,
        speed: 10,
        radius: 5
    };

    return bullet;

}






function playerBulletMovement() {

    for (let bullet of playerBullets) {
        bullet.x += bullet.dx * bullet.speed;
        bullet.y += bullet.dy * bullet.speed;

        // console.log (bullet, bullet.dx, bullet.dy, bullet.speed);
    }

    // console.log("=============");

}


function createEnemyBullet(x, y, playerX, playerY) {

    let dx = playerX - x; 
    let dy = playerY - y;

    //turn dx and dy to unit vector
    let distance = Math.sqrt(dx * dx + dy * dy);

    dx = dx / distance;
    dy = dy / distance;

    return {
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        speed: 10,
        radius: 5
    };
}



// remove the enemy bullets if the bullets is outside of the canvas
function removeEnemyBullets() {

    for (let i = enemyBullets.length - 1; i >= 0; i--) {

        let bullet = enemyBullets[i];

        if (
            bullet.x < 0 ||
            bullet.x > canvas.width ||
            bullet.y < 0 ||
            bullet.y > canvas.height
        ) {
            enemyBullets.splice(i, 1);
        }
    }
}

// remove the player bullets if the bullets is outside of the canvas
function removePlayerBullets() {

    for (let i = playerBullets.length - 1; i >= 0; i--) {

        let bullet = playerBullets[i];

        if (
            bullet.x < 0 ||
            bullet.x > canvas.width ||
            bullet.y < 0 ||
            bullet.y > canvas.height
        ) {
            playerBullets.splice(i, 1);
        }
    }
}


function EnemyBulletMovement() {

    for (let bullet of enemyBullets) {

        bullet.x += bullet.dx * bullet.speed;
        bullet.y += bullet.dy * bullet.speed;

    }

    removeEnemyBullets();

    // console.log(enemyBullets.length);


}


function drawPlayerBullets() {

    for (let bullet of playerBullets) {

        ctx.beginPath();

        ctx.arc(
            bullet.x,
            bullet.y,
            bullet.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "green";
        ctx.fill();

        ctx.closePath();
    }
}

function drawEnemyBullets() {

    for (let bullet of enemyBullets) {

        ctx.beginPath();

        ctx.arc(
            bullet.x,
            bullet.y,
            bullet.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "black";
        ctx.fill();

        ctx.closePath();
    }
}


