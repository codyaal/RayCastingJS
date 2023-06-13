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
        
        canvasWalls.push(new Wall({x:0, y:0}, {x: width, y:0}));
        canvasWalls.push(new Wall({x: width, y:0}, {x: width, y: height}));
        canvasWalls.push(new Wall({x: width, y: height}, {x:0, y: height}));
        canvasWalls.push(new Wall({x:0, y: height}, {x:0, y:0}));

        return canvasWalls;
    }

    static getRandomWalls(n, width, height){
        let walls = []

        for(let i = 0; i<n; i++){
            walls.push(new Wall({x:Math.random() * width, y:Math.random() * height}, {x:Math.random() * width, y:Math.random() * height}));
        }

        return walls;
    }
}