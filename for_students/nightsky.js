import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class nightsky extends GrObject {
    constructor() {
        let loader1 = new T.TextureLoader();
        let body =new T.Mesh(
            new T.SphereGeometry(600),
            new T.MeshStandardMaterial({
                side: T.BackSide,
                map: loader1.load("./textures/nightsky.jpg"),
            })
        );
        body.position.set(0,0,0);
        super("nightsky", body);
        //this.sunlight = light2;
        this.body = body;
        this.time = 0;
    }
    stepWorld(delta, timeOfDay) {
        
        if (timeOfDay>6 && timeOfDay<18){
            this.body.visible = false;
        }
        else{
            this.body.visible = true;
        }
        

    }


}
