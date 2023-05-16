import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

function degreesToRadians(deg) {
    return (deg * Math.PI) / 180;
  }
let excavatorObCtr = 0;
export class Excavator extends GrObject {
    /**
     * @param {ExcavatorProperties} params
     */
    constructor(params = {}) {
      let excavator = new T.Group();
  
      let exSettings = {
        steps: 2,
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelSegments: 2
      };
  
      
      /**@type THREE.Shape */
      let base_curve = new T.Shape();
      base_curve.moveTo(-1, 0);
      base_curve.lineTo(-1.2, 0.2);
      base_curve.lineTo(-1.2, 0.4);
      base_curve.lineTo(-1, 0.6);
      base_curve.lineTo(1, 0.6);
      base_curve.lineTo(1.2, 0.4);
      base_curve.lineTo(1.2, 0.2);
      base_curve.lineTo(1, 0);
      base_curve.lineTo(-1, 0);

      let loader = new T.TextureLoader();
      let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
      let excavator_mat = new T.MeshStandardMaterial({
        map: loader.load("./textures/exca.jpg"),
      });
      let base = new T.Mesh(base_geom, excavator_mat);
      excavator.add(base);
      base.translateZ(-0.2);
  
      // We'll add the "pedestal" piece for the cab of the excavator to sit on.
      // It can be considered a part of the treads, to some extent,
      // so it doesn't need a group of its own.
      let pedestal_curve = new T.Shape();
      pedestal_curve.moveTo(-0.35, 0);
      pedestal_curve.lineTo(-0.35, 0.25);
      pedestal_curve.lineTo(0.35, 0.25);
      pedestal_curve.lineTo(0.35, 0);
      pedestal_curve.lineTo(-0.35, 0);
      let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
      let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
      excavator.add(pedestal);
      pedestal.translateY(0.6);
      pedestal.translateZ(-0.2);
  
      // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
      let cab_group = new T.Group();
      excavator.add(cab_group);
      cab_group.translateY(0.7);
      let cab_curve = new T.Shape();
      cab_curve.moveTo(-1, 0);
      cab_curve.lineTo(1, 0);
      cab_curve.lineTo(1.2, 0.35);
      cab_curve.lineTo(1, 0.75);
      cab_curve.lineTo(0.25, 0.75);
      cab_curve.lineTo(0, 1.5);
      cab_curve.lineTo(-0.8, 1.5);
      cab_curve.lineTo(-1, 1.2);
      cab_curve.lineTo(-1, 0);
      let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
      let cab = new T.Mesh(cab_geom, excavator_mat);
      cab_group.add(cab);
      cab.translateZ(-0.2);
  
      // Next up is the first part of the bucket arm.
      // In general, each piece is just a series of line segments,
      // plus a bit of extra to get the geometry built and put into a group.
      // We always treat the group as the "pivot point" around which the object should rotate.
      // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
      // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
      // The remaining few pieces are very similar to the arm piece.
      let arm_group = new T.Group();
      cab_group.add(arm_group);
      arm_group.position.set(-0.8, 0.5, 0);
      let arm_curve = new T.Shape();
      arm_curve.moveTo(-2.25, 0);
      arm_curve.lineTo(-2.35, 0.15);
      arm_curve.lineTo(-1, 0.5);
      arm_curve.lineTo(0, 0.25);
      arm_curve.lineTo(-0.2, 0);
      arm_curve.lineTo(-1, 0.3);
      arm_curve.lineTo(-2.25, 0);
      let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
      let arm_mat = new T.MeshStandardMaterial({
        color: "#888888",
        metalness: 0.6,
        roughness: 0.3
      });
      let arm = new T.Mesh(arm_geom, arm_mat);
      arm_group.add(arm);
      arm.translateZ(-0.2);
  
      let forearm_group = new T.Group();
      arm_group.add(forearm_group);
      forearm_group.position.set(-2.1, 0, 0);
      let forearm_curve = new T.Shape();
      forearm_curve.moveTo(-1.5, 0);
      forearm_curve.lineTo(-1.5, 0.1);
      forearm_curve.lineTo(0, 0.15);
      forearm_curve.lineTo(0.15, 0);
      forearm_curve.lineTo(-1.5, 0);
      let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
      let forearm = new T.Mesh(forearm_geom, arm_mat);
      forearm_group.add(forearm);
      forearm.translateZ(-0.2);
  
      let bucket_group = new T.Group();
      forearm_group.add(bucket_group);
      bucket_group.position.set(-1.4, 0, 0);
      let bucket_curve = new T.Shape();
      bucket_curve.moveTo(-0.25, -0.9);
      bucket_curve.lineTo(-0.5, -0.5);
      bucket_curve.lineTo(-0.45, -0.3);
      bucket_curve.lineTo(-0.3, -0.2);
      bucket_curve.lineTo(-0.15, 0);
      bucket_curve.lineTo(0.1, 0);
      bucket_curve.lineTo(0.05, -0.2);
      bucket_curve.lineTo(0.5, -0.7);
      bucket_curve.lineTo(-0.25, -0.9);
      let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
      let bucket = new T.Mesh(bucket_geom, arm_mat);
      bucket_group.add(bucket);
      bucket.translateZ(-0.2);
  
      let sand = new T.Mesh(
        new T.BoxGeometry(0.5, 0.5, 0.5),
        new T.MeshStandardMaterial({
            color: "#8B4513",
            roughness: 0.9
            })
        );
        bucket_group.add(sand); 
        sand.position.y = -0.5;
      // note that we have to make the Object3D before we can call
      // super and we have to call super before we can use this
      // The parameters for sliders are also defined here.
      super(`Excavator-${excavatorObCtr++}`, excavator, [
        ["x", -10, 10, 0],
        ["z", -10, 10, 0],
        ["theta", 0, 360, 0],
        ["spin", 0, 360, 0],
        ["arm_rotate", 0, 50, 45],
        ["forearm_rotate", 0, 90, 45],
        ["bucket_rotate", -90, 45, 0]
      ]);
      // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
      // We also save the groups of each object that may be manipulated by the UI.
      this.whole_ob = excavator;
      this.cab = cab_group;
      this.arm = arm_group;
      this.forearm = forearm_group;
      this.bucket = bucket_group;
      this.time = 0;
      this.sand = sand;
      // put the object in its place
      this.whole_ob.position.x = params.x ? Number(params.x) : 0;
      this.whole_ob.position.y = params.y ? Number(params.y) : 0;
      this.whole_ob.position.z = params.z ? Number(params.z) : 0;
      let scale = params.size ? Number(params.size) : 1;
      excavator.scale.set(scale, scale, scale);
    }
    stepWorld(delta, timeOfDay) {
        if (this.time <0) {
          this.time = 320;
        }
        this.time -= delta/16;
        if (this.time >280) {
            let t = 320-this.time;
            this.forearm.rotation.z = degreesToRadians(90-t*90/40);
            this.bucket.rotation.z = degreesToRadians(60-t*120/40);
            this.arm.rotation.z = degreesToRadians(-50+t*50/40); 

        }
        else if (this.time > 240) {
            let t = 280-this.time;
            this.forearm.rotation.z = degreesToRadians(t*90/40);
            //this.bucket.rotation.z = degreesToRadians(t*90/40-30);
            //this.arm.rotation.z = degreesToRadians(0-t*50/40); 

        }

        else if (this.time > 200) {

            let t = 240-this.time;
            this.bucket.rotation.z = degreesToRadians(t*90/40-30);
            this.arm.rotation.z = degreesToRadians(0-t*50/40); 
        }
        else if (this.time > 160) {
            let t = 200-this.time;
            this.cab.rotation.y = degreesToRadians(t*90/40); 
        }   
        else if (this.time > 120) {
            let t = 160-this.time;
            this.bucket.rotation.z = degreesToRadians(60-t*180/40);
            this.sand.position.y = -0.5-t*t*0.1/40;
            this.sand.position.x = t*t*0.1 /40;
        }
        else if (this.time > 100) {
        }
        else if (this.time > 60) {
            let t = 100-this.time;
            this.sand.position.set(0,-0.5,0);
            this.bucket.rotation.z = degreesToRadians(t*180/40-120);
        }
        else if (this.time > 20) {
            let t = 60-this.time;
            this.cab.rotation.y = degreesToRadians(90-t*90/40); 
        }
        else if (this.time > 0) {
            let t = 20-this.time;
            
        }
}
    // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
    // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
    // while maintaining a nice 0-90 range for the slider itself.
    update(paramValues) {
      this.whole_ob.position.x = paramValues[0];
      this.whole_ob.position.z = paramValues[1];
      this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
      this.cab.rotation.y = degreesToRadians(paramValues[3]);
      this.arm.rotation.z = degreesToRadians(-paramValues[4]);
      this.forearm.rotation.z = degreesToRadians(paramValues[5]) + Math.PI / 16;
      this.bucket.rotation.z = degreesToRadians(paramValues[6]);
    }
  }
  