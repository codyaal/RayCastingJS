class Player {
    constructor(x, y, width, fov, rotation, color){
        this.position = {x:x, y:y};
        this.width = width;
        this.fov = fov || 360;
        this.rotation = rotation || 0;
        this.color = color || "white";
    }

    forward(distance){
        let middleAngle = this.rotation + this.fov / 2;
        let rad2deg = Math.PI / 180;
        this.position.x += distance * Math.cos(middleAngle * rad2deg);
        this.position.y -= distance * Math.sin(middleAngle * rad2deg);
    }

    backward(distance){
        let middleAngle = this.rotation + this.fov / 2;
        let rad2deg = Math.PI / 180;
        this.position.x -= distance * Math.cos(middleAngle * rad2deg);
        this.position.y += distance * Math.sin(middleAngle * rad2deg);
    }

    turnRight(angle){
        if(this.rotation<0) this.rotation = 360 + this.rotation;
        this.rotation-=angle;
    }

    turnLeft(angle){
        if(this.rotation>360) this.rotation = this.rotation - 360;
        this.rotation+=angle;
    }
}