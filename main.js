/*---------------------------------
|              SETUP              |
---------------------------------*/

const TOPDOWN_WIDTH = 400;
const TOPDOWN_HEIGHT = 400;
const POV_WIDTH = 720;
const POV_HEIGHT = 500;
const PLAYER_INIT_X = 200;
const PLAYER_INIT_Y = 200;
const PLAYER_WIDTH = 10;
const PLAYER_FOV = 90;
const ROTATION_SPEED = 5;
const RANDOM_WALLS = 3;

const topDown = new Canvas("topDown", TOPDOWN_WIDTH, TOPDOWN_HEIGHT, "black");
const pov = new Canvas("pov", POV_WIDTH, POV_HEIGHT, "black");
const player = new Player(PLAYER_INIT_X, PLAYER_INIT_Y, PLAYER_WIDTH, PLAYER_FOV);
const walls = Wall.getCanvasWalls(TOPDOWN_WIDTH, TOPDOWN_HEIGHT);
walls.push(...Wall.getRandomWalls(RANDOM_WALLS, TOPDOWN_WIDTH, TOPDOWN_HEIGHT));

let playerRays = Ray.getPlayerRays(player);
let intersectedRays = Ray.getIntersectedRays(playerRays, walls);
let povWalls = Wall.getPovWalls(intersectedRays, player.rotation, PLAYER_FOV);

topDown.drawRays(intersectedRays, "white");
topDown.drawWalls(walls);
topDown.drawPlayer(player);
pov.drawPovCeilFloor("#dddddd", "#aaaaaa");
pov.drawPovWalls(povWalls);


/*--------------------------------
|              LOOP              |
--------------------------------*/

function loop(){
    playerRays = Ray.getPlayerRays(player);
    intersectedRays = Ray.getIntersectedRays(playerRays, walls);

    topDown.clear();
    topDown.drawWalls(walls);
    topDown.drawRays(intersectedRays, "white");
    topDown.drawPlayer(player);

    povWalls = Wall.getPovWalls(intersectedRays, player.rotation, PLAYER_FOV);
    pov.clear();
    pov.drawPovCeilFloor("#dddddd", "#aaaaaa");
    pov.drawPovWalls(povWalls);

    // requestAnimationFrame(loop)
}

// addEventListener(("mousemove"), (e) => {
//     let newPosX = e.clientX - topDown.canvasX;
//     let newPosY = e.clientY - topDown.canvasY;
//     if(newPosX<0 || newPosX>TOPDOWN_WIDTH || newPosY<0 || newPosY>TOPDOWN_HEIGHT) return;
//     player.position.x = newPosX;
//     player.position.y = newPosY;

//     requestAnimationFrame(loop);
// })

addEventListener("keydown", (e) => {
    if(e.key==="ArrowUp"){
        player.forward(3);
        requestAnimationFrame(loop);
    }
    else if(e.key==="ArrowDown"){
        player.backward(3)
        requestAnimationFrame(loop);
    }
    else if(e.key==="ArrowRight"){
        player.turnRight(ROTATION_SPEED)
        requestAnimationFrame(loop);
    }
    else if(e.key==="ArrowLeft"){
        player.turnLeft(ROTATION_SPEED)
        requestAnimationFrame(loop);
    }
})

// requestAnimationFrame(loop);