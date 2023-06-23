class Wall {
    constructor(startPos, endPos, color){
        this.startPos = {
            x: startPos.x,
            y: startPos.y
        };
        this.endPos = {
            x: endPos.x,
            y: endPos.y
        };
        this.color = color || "white";
    }

    static getCanvasWalls(width, height){
        let canvasWalls = []
        
        canvasWalls.push(new Wall({x:0, y:0}, {x: width, y:0}, "#00bbbb"));
        canvasWalls.push(new Wall({x: width, y:0}, {x: width, y: height}, "#00dddd"));
        canvasWalls.push(new Wall({x: width, y: height}, {x:0, y: height}, "#00bbbb"));
        canvasWalls.push(new Wall({x:0, y: height}, {x:0, y:0}, "#00dddd"));

        return canvasWalls;
    }

    static getRandomWalls(n, width, height){
        let walls = []

        for(let i = 0; i<n; i++){
            walls.push(new Wall(
                {x:Math.random() * width, y:Math.random() * height}, 
                {x:Math.random() * width, y:Math.random() * height},
                `hsl(${Math.random() * 360}, 40%, 60%)`));
        }

        return walls;
    }

    static getPovWalls(intersectedRays, rotation, fov){
        let povWalls = [];
        let wallDistance = 0;
        let POVWallHeight = 0;
        let cste = 12000;
        let midAngle = rotation + fov/2;
        let rad2deg = Math.PI/180;

        intersectedRays.forEach((ray) => {
            wallDistance = (ray.intersection.x - ray.source.x) ** 2 + (ray.intersection.y - ray.source.y) ** 2;
            wallDistance = Math.sqrt(wallDistance) * Math.cos((ray.degree-midAngle)*rad2deg);
            POVWallHeight = cste/wallDistance;
            let wall = {
                height: POVWallHeight,
                color: ray.color
            }
            povWalls.push(wall);
        })

        return povWalls;
    }
}