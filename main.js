/*---------------------------------
|              SETUP              |
---------------------------------*/

const TOPDOWN_WIDTH = 400;
const TOPDOWN_HEIGHT = 400;
const POV_WIDTH = 600;
const POV_HEIGHT = 400;
const PLAYER_INIT_X = 200;
const PLAYER_INIT_Y = 200;
const PLAYER_WIDTH = 10;
const RANDOM_WALLS = 5;

const topDown = new Canvas("topDown", TOPDOWN_WIDTH, TOPDOWN_HEIGHT, "black");
const pov = new Canvas("pov", POV_WIDTH, POV_HEIGHT, "black");
const player = new Player(PLAYER_INIT_X, PLAYER_INIT_Y, PLAYER_WIDTH);
const walls = Wall.getCanvasWalls(TOPDOWN_WIDTH, TOPDOWN_HEIGHT);
walls.push(...Wall.getRandomWalls(RANDOM_WALLS, TOPDOWN_WIDTH, TOPDOWN_HEIGHT));

let playerRays = Ray.getPlayerRays(player.position);
let intersectedRays = Ray.getIntersectedRays(playerRays, walls);

topDown.drawPlayer(player);
topDown.drawRays(intersectedRays);
topDown.drawWalls(walls);



/*--------------------------------
|              LOOP              |
--------------------------------*/

function loop(){
    playerRays = Ray.getPlayerRays(player.position);
    intersectedRays = Ray.getIntersectedRays(playerRays, walls);

    topDown.clear();
    topDown.drawPlayer(player);
    topDown.drawWalls(walls);
    topDown.drawRays(intersectedRays);

    // requestAnimationFrame(loop)
}

addEventListener(("mousemove"), (e) => {
    let newPosX = e.clientX - topDown.canvasX;
    let newPosY = e.clientY - topDown.canvasY;
    if(newPosX<0 || newPosX>TOPDOWN_WIDTH || newPosY<0 || newPosY>TOPDOWN_HEIGHT) return;
    player.position.x = newPosX;
    player.position.y = newPosY;

    requestAnimationFrame(loop);
})

// requestAnimationFrame(loop);