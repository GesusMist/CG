import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";


/** @type {number} */ let grassFieldCount = 0;
export class Grass extends GrObject {
    constructor(x,z,r) {

        let shaderMat = shaderMaterial("./grassshader.vs","./grassshader.fs",
        {
            side: T.DoubleSide,
        });


        let grass = new T.Group();
        grass.position.set (x,1.8,z);

        let soil = new T.Mesh(
            new T.CylinderGeometry(r+0.5,r+0.5,0.5),
            new T.MeshStandardMaterial({
                color: "#8B4513",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        grass.add(soil);

        let grassNum = 5 * r * r;
        
        for (let i = 0; i < grassNum; i++) {
            let geometry = new T.BufferGeometry();
            let randr = Math.random() * r;
            let randtheta = Math.random() * 2 * Math.PI;
            let randgrass = Math.random() * ((r-randr)>5?5:r-randr);
            let randtheta2 = Math.random() * 2 * Math.PI;
            let randheight = Math.random() * 0.4 + 1;
            let x1 = randr * Math.cos(randtheta);
            let z1 = randr * Math.sin(randtheta);
            let x2 = x1 + randgrass * Math.cos(randtheta2);
            let z2 = z1 + randgrass * Math.sin(randtheta2);
            let x3 = (x1+x2)/2;
            let z3 = (z1+z2)/2;

            let vertices = new Float32Array([
                x1, 0, z1,
                x2,0,z2,
                x3,randheight,z3
            ]);
            geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
            geometry.computeVertexNormals();

            grass.add(new T.Mesh( 
                geometry,shaderMat
                //new T.MeshStandardMaterial({
                //    color: "#7CFC00",
                //    roughness: 0.8,
                //    metalness: 0.2,
                //})

            ));

        }
        

        super(`GrassField-${++grassFieldCount}`, grass);
        
    }

    stepWorld(delta, timeOfDay) {
    }

}
