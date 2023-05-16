import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";


export class sun extends GrObject {
    constructor(light) {
        let loader1 = new T.TextureLoader();
        let body =new T.Mesh(
            new T.SphereGeometry(20),
            new T.MeshStandardMaterial({
                color: "#FDFBD3",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        body.position.set(-40,300,0);
        super("sun", body);
        this.selflight = light;
        //this.sunlight = light2;
        this.body = body;
        this.time = 0;
    }
    stepWorld(delta, timeOfDay) {
        
        let z = Math.sin((timeOfDay-12)/24*2*Math.PI)*500;
        let y = Math.cos((timeOfDay-12)/24*2*Math.PI)*500+50;

        this.body.position.x= -40;
        this.body.position.y= y;
        this.body.position.z= z;


        this.selflight.position.x = -36;
        this.selflight.position.y =0.95* y;
        this.selflight.position.z = 0.95*z;
        this.selflight.target.position.set(-40,y,z);
        //this.sunlight.position.set(-40,380,0);
        //this.sunlight.target.position.set(0,0,0);

    }


}
