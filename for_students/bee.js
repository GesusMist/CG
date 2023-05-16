import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

let birdObCtr = 0;
// A Carousel.
/**
 * @typedef BirdProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class bee extends GrObject {
  /**
   * @param {CarouselProperties} params
   */
  constructor(params = {}) {
    let thebird = new T.Group();
    let bird_geom = new T.BoxGeometry( 0.5, 0.5 ,0.5);
    let bird_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.3,
      roughness: 0.8
    });
    let body = new T.Mesh(bird_geom,bird_mat);

    let wing_geom = new T.BoxGeometry( 0.5, 0.15 ,0.3);
    let wing_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.3,
      roughness: 0.8
    });
    let wing1 = new T.Mesh(wing_geom,wing_mat);
    wing1.translateX(0.5);
    wing1.translateY(0.1);
    wing1.translateZ(0.05);
    body.add(wing1);

    let wing2 = new T.Mesh(wing_geom,wing_mat);
    wing2.translateX(-0.5);
    wing2.translateY(0.1);
    wing2.translateZ(0.05);
    body.add(wing2);


    thebird.add(body);
    super(`bee-${birdObCtr++}`, thebird);
    this.whole_ob = thebird;
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    thebird.scale.set(scale, scale, scale);
  }
  stepWorld(delta, timeOfDay) {
    // in this animation, use the sine of the accumulated angle to set current rotation.
    // This means the swing moves faster as it reaches the bottom of a swing,
    // and faster at either end of the swing, like a pendulum should.
    if(this.whole_ob.position.y<10){
      this.whole_ob.position.y = 10;
    }
    let randomex = Math.PI*2*Math.random();
    let randomey = Math.PI*2*Math.random();
    let randomez = Math.PI*2*Math.random();
    if (this.whole_ob.position.x+0.02*delta*Math.sin(randomex)>17||this.whole_ob.position.x+0.02*delta*Math.sin(randomex)<-17) {
      randomex = -randomex;
    }
    if (this.whole_ob.position.y+0.02*delta*Math.sin(randomey)>40||this.whole_ob.position.y+0.02*delta*Math.sin(randomey)<10) {
      randomey = -randomey;
    }
    if (this.whole_ob.position.z+0.02*delta*Math.sin(randomez)>17||this.whole_ob.position.z+0.02*delta*Math.sin(randomez)<-17) {
      randomez = -randomez;
    }
    this.whole_ob.position.x += 0.02*delta*Math.sin(randomex);
    this.whole_ob.position.y += 0.02*delta*Math.sin(randomey);
    this.whole_ob.position.z += 0.02*delta*Math.sin(randomez);
    this.whole_ob.lookAt(this.whole_ob.position.x+0.02*delta*Math.sin(randomex),this.whole_ob.position.y+0.02*delta*Math.sin(randomey),this.whole_ob.position.z+0.02*delta*Math.sin(randomez));
  }
}