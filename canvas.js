class Canvas {
    constructor(id, width, height, backgroundColor){
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.backgroundColor = backgroundColor;
        this.context = this.canvas.getContext("2d");
        this.canvasX = this.canvas.getBoundingClientRect().left;
        this.canvasY = this.canvas.getBoundingClientRect().top;
    }

    setSize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
    }

    setBackground(backgroundColor){
        this.canvas.style.backgroundColor = backgroundColor;
    }

    clear(){
        this.context.fillStyle = this.canvas.style.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawPlayer(player){
        this.context.beginPath();
        this.context.arc(player.position.x, player.position.y, player.width / 2, 0, Math.PI * 2);
        this.context.fillStyle = player.color;
        this.context.fill();
        this.context.closePath();
    }

    drawRays(rays){
        this.context.strokeStyle = "rgba(255,255,255,1)";
        
        this.context.lineWidth = 1;
        rays.forEach((ray) => {
            this.context.beginPath();
            this.context.moveTo(ray.source.x, ray.source.y);
            this.context.lineTo(ray.intersection.x, ray.intersection.y);
            this.context.stroke();
        }
        )
    }

    drawWalls(walls){
        this.context.strokeStyle = "white";
        walls.forEach((wall) => {
            this.context.beginPath();
            this.context.moveTo(wall.startPos.x, wall.startPos.y);
            this.context.lineTo(wall.endPos.x, wall.endPos.y);
            this.context.stroke();
        })
    }
}