import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";


/** @type {number} */ let ballCount = 0;
export class CrystalBall extends GrObject {
    constructor(world) {
        let cube = new T.Group();
        super(`CrystalBall-${++ballCount}`, cube);
        this.world= world;
        const cubeRenderTarget = new T.WebGLCubeRenderTarget(512);
        this.cubeCamera = new T.CubeCamera(1, 100, cubeRenderTarget);
        let ccube = new T.Mesh(
          new T.SphereGeometry(2, 32, 32),
          new T.MeshStandardMaterial({
              color: 0xffffff,
              roughness:0,
              envMap: this.cubeCamera.renderTarget.texture,
              metalness:1
          })
      );
      
      cube.add(ccube);

    }
    stepWorld(delta, timeOfDay){
        this.cubeCamera.update(this.world.renderer,this.world.scene);
    }

}
