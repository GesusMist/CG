import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Water } from "./water.js";

export class waterbox extends GrObject {
    constructor(lenth,width) {
        let water = new Water(
        new T.PlaneBufferGeometry(lenth, width),
        {
            textureWidth: 512,
            textureHeight: 512,
            
        }
        );
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0;
        water.flows
        super("water", water);
        this.water=water;
    }
    stepWorld(delta, timeOfDay) {
        this.water.flowSpeed = delta/1600+ Math.random()/1000;

    }

}
