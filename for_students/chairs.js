import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

export class chairs extends GrObject {
    constructor(obj) {
        let loader1 = new T.TextureLoader();
        let body =new T.Group();
        let wood = loader1.load("./textures/wood.jpg");
        let chair = obj;

        //let mesh1 = new T.Mesh(
        //    chair.children[1].geometry,
        //    new T.MeshStandardMaterial({
        //        side: T.DoubleSide,
        //        map: wood,
        //    })
        //);
        //body.add(mesh1);
//
        //let mesh2 = new T.Mesh( chair.children[2].geometry, new T.MeshStandardMaterial({ color: "black" }));  
        //body.add(mesh2);
        let achair = new T.Group();
        body.add(achair);
        for (let i = 1; i < 13; i++) {

            achair.add(new T.Mesh( chair.children[i].geometry, new T.MeshStandardMaterial({ map: wood })));
        }

        let umbrella = new T.Group();
        umbrella.scale.set(1.2,1.2,1.2);
        body.add(umbrella);
        
        umbrella.add(new T.Mesh( chair.children[13].geometry, new T.MeshStandardMaterial({ map: wood })));
        umbrella.add(new T.Mesh( chair.children[14].geometry, new T.MeshStandardMaterial({ color:"#AA0000" })));
        
        body.scale.set(4,4,4);
        
        
        super("chairs", body);


    }
    stepWorld(delta, timeOfDay) {


    }


}
