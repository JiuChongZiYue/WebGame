const supplies = [];

function creatSupply (){

    let x = Math.floor(Math.random() * (canvasWidth - 20)) + 10;
    let y = Math.floor(Math.random() * (canvasHeight - 20)) + 10;
    let time = Date.now();

    return {
        x: x,
        y: y,
        time: time
    };
}

function ifSupplyBePickedUp () {

    for (let [i, supply] of supplies.entries()){
        if (Math.abs(player.x - supply.x) < 30 && Math.abs(player.y - supply.y) < 30) {



            health += 5;
            ammo += 10; 

            supplies.splice(i, 1);
        }
    }

}

function checkExpiredSupplies() {
    const currentTime = Date.now();

    for (let i = supplies.length - 1; i >= 0; i--) {
        if (currentTime - supplies[i].time >= 20000) {
            supplies.splice(i, 1);
        }
    }
}




function keepTrackingSupplies(){

    // supplies will always have one on screen, and it will always give the first one
    // the maximum supplies is 10, and it will generated with a rate. 
    
    if (supplies.length === 0) {
        // make the firt supply
        supplies.push(creatSupply());
    }else if (supplies.length <= 10){
        // random give some supplies

        let ran = Math.random();

        if (ran > 0.98){

            supplies.push(creatSupply());
        }
    }

    checkExpiredSupplies();
    ifSupplyBePickedUp();

    drawSupply();


}



function drawStar(x, y, radius) {

    const spikes = 5;
    const innerRadius = radius * 0.4;

    let rotation = Math.PI / 2 * 3;
    let step = Math.PI / spikes;

    ctx.beginPath();

    for (let i = 0; i < spikes; i++) {

        // Outer point
        let outerX = x + Math.cos(rotation) * radius;
        let outerY = y + Math.sin(rotation) * radius;

        ctx.lineTo(outerX, outerY);

        rotation += step;

        // Inner point
        let innerX = x + Math.cos(rotation) * innerRadius;
        let innerY = y + Math.sin(rotation) * innerRadius;

        ctx.lineTo(innerX, innerY);

        rotation += step;
    }

    ctx.closePath();

    ctx.fillStyle = "gold";
    ctx.fill();
}


function drawSupply () {

    for (let supply of supplies){
        drawStar(supply.x, supply.y, 10); 
    }
    
}

