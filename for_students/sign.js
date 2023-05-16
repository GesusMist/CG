import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";


export class sign extends GrObject {
    constructor() {
        let loader1 = new T.TextureLoader();
        let map = loader1.load("./textures/sign.jpg");
        let loader2 = new T.TextureLoader();
        let map2 = loader2.load("./textures/wood.jpg");
        let stick =new T.Mesh(
            new T.CylinderGeometry(0.15,0.2,5),
            new T.MeshStandardMaterial({
                map: map2,
                side: T.DoubleSide,
            })
        );
        let sign = new T.Group();
        sign.add(stick);

        let sign1 =new T.Mesh(
            new T.BoxGeometry(6,4,0.3),
            new T.MeshStandardMaterial({
                map: map,
                side: T.DoubleSide,
            })
        );
        sign1.position.y =2.5;
        sign.add(sign1);


        super("Sign", sign);
    }
}
