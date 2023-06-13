class Player {
    constructor(x, y, width, color){
        this.position = {x:x, y:y};
        this.width = width;
        this.color = color || "white";
    }
}