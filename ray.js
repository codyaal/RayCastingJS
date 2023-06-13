class Ray {
    constructor(pos, degree, intersection){
        this.source = {
            x: pos.x,
            y: pos.y
        };
        this.direction = {
            x: pos.x + Math.cos(degree * Math.PI / 180),
            y: pos.y - Math.sin(degree * Math.PI / 180)
        };
        this.intersection = {
            x: intersection.x,
            y: intersection.y
        }
    }

    static getPlayerRays(playerPos){
        let playerRays = [];
        for(let i=0; i<360 ; i+=5){
            let newRay = new Ray(playerPos, i, {x:Math.random()*100, y:Math.random()*100});
            playerRays.push(newRay);
        }
        return playerRays;
    }

    static getIntersectedRays(rays, walls){
        let intersectedRays = [];
        rays.forEach((ray) => {
            let distance = Infinity;
            let raydx = ray.direction.x - ray.source.x;
            let raydy = ray.direction.y - ray.source.y;
            walls.forEach((wall) => {
                let walldx = wall.endPos.x - wall.startPos.x;
                let walldy = wall.endPos.y - wall.startPos.y;
                
                let wallRaydx = ray.source.x - wall.startPos.x;
                let wallRaydy = ray.source.y - wall.startPos.y;

                let d = walldx * raydy - walldy * raydx;


                // d=0 means they are parallel
                if(d === 0) return;

                let n1 = wallRaydx * raydy - wallRaydy * raydx;

                // n1/d has to be positive, else intersection is outside wall segment
                if((n1<0 && d>0) || (n1>0 && d<0)) return;

                // n1/d has to be less than 1, else intersection is outside wall segment
                if(n1>0 && n1>d || n1<0 && n1<d) return;


                let n2 = wallRaydx * walldy - wallRaydy * walldx;

                // n2/d has to be positive or else intersection is behind ray source
                if((n2<0 && d>0) || (n2>0 && d<0)) return;

                // console.log(n2);

                let t1 = n1/d;
                // let t2 = n2/d;

                // if(t1<0 || t1>1) return;

                //check the distance of the intersection
                let intersectionX = wall.startPos.x + t1 * walldx;
                let intersectionY = wall.startPos.y + t1 * walldy;

                let newDistance = (intersectionX - ray.source.x) ** 2 + (intersectionY - ray.source.y) ** 2;

                if(newDistance>distance) return;

                ray.intersection.x = intersectionX;
                ray.intersection.y = intersectionY;

                distance = newDistance;

                // console.log(ray);

                // intersectedRays.push(ray);
            })
            intersectedRays.push(ray);
        })
        // console.log("player rays: " + rays.length + " - intersected rays: " + intersectedRays.length);
        // console.log(intersectedRays);
        return intersectedRays;
    }
}