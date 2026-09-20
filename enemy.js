
const enemies = [];


function createEnemy(playerX, playerY) {

    const radius = 20;
    const spawnDistance = 300;

    let x;
    let y;

    do {

        // Pick a random direction
        let angle = Math.random() * Math.PI * 2;

        // Put the enemy 150 pixels away from the player
        x = playerX + Math.cos(angle) * spawnDistance;
        y = playerY + Math.sin(angle) * spawnDistance;

    } while (
        x - radius < 0 ||
        x + radius > canvasWidth ||
        y - radius < 0 ||
        y + radius > canvasHeight
    );

    return {
        x: x,
        y: y,
        speed: 5,
        radius: radius
    };
}




function enemyAction (enemy) {

    // console.log(enemy);

    
    let xNew = Math.floor(Math.random() * 10) - 5;
    let yNew = Math.floor(Math.random() * 10) - 5;

    const hardness = 0.2;

    let enemyRandom = Math.random();

    if (enemyRandom < hardness){
        // chase the player
        if (player.x > enemy.x){
            enemy.x += enemy.speed;
        }else {
            enemy.x -= enemy.speed;
        }

        if (player.y > enemy.y){
            enemy.y += enemy.speed;
        }else {
            enemy.y -= enemy.speed;
        }        

        

    }else{
        // random movement

        enemy.x += xNew;
        enemy.y += yNew;


    }

    const fire = 0.01;

    let enemyRandomFire = Math.random();   
    
    if (fire > enemyRandomFire){
        enemyAttact(enemy);
    }

}

function enemyAttact (enemy){
    enemyBullets.push(createEnemyBullet(enemy.x, enemy.y, player.x, player.y));
}



function enemyMovement (){

    if (enemies.length == 0 ) {

        // creat a enemy if there is no enemy
        enemies.push(createEnemy(player.x, player.y));

    }else if (enemies.length < 3){

        // try to create enemy if there is less then 3 enemies
        let ran = Math.random();

        if (ran > 0.95){
            enemies.push(createEnemy(player.x, player.y));
        }
    }
    

    for (let enemy of enemies){
        enemyAction(enemy);
    }
}


function KilledEnemy (){

    for (let playerBullet of playerBullets) {

        for (let [i, enemy] of enemies.entries()){
            if (Math.abs(playerBullet.x - enemy.x) < 30 && Math.abs(playerBullet.y - enemy.y) < 30) {




                
                enemies.splice(i, 1);

                console.log("BULLET HIT! Enemy Died");

                score += 10;

            }
        }



        for (let [i, enemyBullet] of enemyBullets.entries()){
            if (Math.abs(playerBullet.x - enemyBullet.x) < 30 && Math.abs(playerBullet.y - enemyBullet.y) < 30) {

                console.log("BULLET HIT! Erase Enemy Bullet!");

                score += 5;
                enemyBullets.splice(i, 1);
            }
        }
    }
}



function drawEnemy(enemy) {

    // Draw the enemy
    ctx.beginPath();
    ctx.rect(enemy.x - enemy.radius, enemy.y - enemy.radius, enemy.radius*2, enemy.radius*2);

    ctx.fillStyle = "red";
    ctx.fill();

    ctx.closePath();

    
}