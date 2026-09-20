

const player = {
    x: 400,
    y: 300,
    radius: 20,
    speed: 5

};

const playerImage = new Image();
playerImage.src = "player.png";


const playerDirection = {
    x: 0,
    y: 0
};

const lastDirection = {
    x: 0, 
    y: 0
};




function playerMovement() {

    playerDirection.x = 0;
    playerDirection.y = 0;

    if (keys["w"] && player.y >= 0) {
        player.y -= player.speed;
        playerDirection.y = -1;
    }

    if (keys["s"] && player.y <= canvasHeight) {
        player.y += player.speed;
        playerDirection.y = 1;
    }

    if (keys["a"] && player.x >= 0) {
        player.x -= player.speed;
        playerDirection.x = -1;
    }

    if (keys["d"] && player.x <= canvasWidth) {
        player.x += player.speed;
        playerDirection.x = 1;
    }


    // Remember the last direction that wasn't zero
    if (playerDirection.x !== 0 || playerDirection.y !== 0) {
        lastDirection.x = playerDirection.x;
        lastDirection.y = playerDirection.y;
    }
}


function playerShoot() {

    if (ammo > 0){
         ammo -=1; 
        bullet = createPlayerBullet();
        playerBullets.push(bullet);
        ammoDisplay.textContent = ammo.toFixed(0);
        
    }


}


function drawPlayer() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const size = 50;

    ctx.drawImage(
        playerImage,
        player.x - size / 2,
        player.y - size / 2,
        size,
        size
    );
}

// function drawPlayer() {

//     // Clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw the player
//     ctx.beginPath();

//     ctx.arc(
//         player.x,
//         player.y,
//         player.radius,
//         0,
//         Math.PI * 2
//     );

//     ctx.fillStyle = "blue";
//     ctx.fill();

//     ctx.closePath();


// }