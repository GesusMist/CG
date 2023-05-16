import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";


export class Island extends GrObject {
    constructor() {
        let loader1 = new T.TextureLoader();
        let map = loader1.load("./textures/sand.jpg");
        map.repeat.set(50,50);
        let loader2 = new T.TextureLoader();
        let island =new T.Mesh(
            new T.CylinderGeometry(60,100,20),
            new T.MeshStandardMaterial({
                map: map,
                side: T.DoubleSide,
            })
        );
        island.position.y =-8;
        super("Island", island);
    }
}
