import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";



/** @type {number} */ let palmTreeCount = 0;
export class palmTree extends GrObject {
    constructor(x,z) {
        let palm = new T.Group();
        palm.castShadow = true;
        let loader1 = new T.TextureLoader();

        let body1 =new T.Mesh(
            new T.CylinderGeometry(.5,.5,2),
            new T.MeshStandardMaterial({
                map: loader1.load("./textures/palmBody.jpg"),
            })
        );
        body1.position.y =3;
        body1.rotation.z = Math.PI/80;
        palm.add(body1);
        
        let body2 =new T.Mesh(
            new T.CylinderGeometry(.5,.5,2),
            new T.MeshStandardMaterial({
                map: loader1.load("./textures/palmBody.jpg"),
            })
        );
        body2.position.y =4.9;
        body2.position.x =-0.08 ;
        body2.rotation.z = Math.PI/60;
        palm.add(body2);

        let body3 =new T.Mesh(
            new T.CylinderGeometry(.5,.5,2),
            new T.MeshStandardMaterial({
                map: loader1.load("./textures/palmBody.jpg"),
            })
        );
        body3.position.y =6.8;
        body3.position.x =-0.2 ;
        body3.rotation.z = Math.PI/40;
        palm.add(body3);

        let body4 =new T.Mesh(
            new T.CylinderGeometry(.45,.5,2),
            new T.MeshStandardMaterial({
                map: loader1.load("./textures/palmBody.jpg"),
            })
        );
        body4.position.y =8.7;
        body4.position.x =-0.4 ;
        body4.rotation.z = Math.PI/22;
        palm.add(body4);

        let body5 =new T.Mesh(
            new T.CylinderGeometry(.3,.45,2),
            new T.MeshStandardMaterial({
                map: loader1.load("./textures/palmBody.jpg"),
            })
        );
        body5.position.y =10.6;
        body5.position.x =-0.72 ;
        body5.rotation.z = Math.PI/15;
        palm.add(body5);

        let loader2 = new T.TextureLoader();
        let coconut1 =new T.Mesh(
            new T.SphereGeometry(0.7),
            new T.MeshStandardMaterial({
                map: loader2.load("./textures/coconut.jpg"),
            })
        );
        coconut1.position.y =11.5;
        coconut1.position.x =-0.15 ;
        coconut1.rotation.z = Math.PI/15;
        palm.add(coconut1);

        let coconut2 =new T.Mesh(
            new T.SphereGeometry(0.7),
            new T.MeshStandardMaterial({
                map: loader2.load("./textures/coconut.jpg"),
            })
        );
        coconut2.position.y =11.5;
        coconut2.position.x =-1.5 ;
        coconut2.rotation.z = Math.PI/15;
        palm.add(coconut2);
        
        let exSettings = {
            steps: 0,
            depth: 0.3,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
          };
        let curve =  new T.Shape();
        curve.moveTo(0, 0);
        curve.quadraticCurveTo(0, 4, 3.5, 1);

        curve.quadraticCurveTo(0.55, 4.05, 0.05, 0.05);
        curve.lineTo(0, 0);
        let leafgeom = new T.ExtrudeGeometry(curve, exSettings);
        let leafmat = new T.MeshStandardMaterial({
        color: "#82ef05",
        metalness: 0.5,
        roughness: 0.7
        });
        let leaf = new T.Mesh(leafgeom, leafmat);
        leaf.position.y = 0;
        leaf.position.x = 0;
        leaf.position.z = -0.2;
        //leaf.rotation.z = Math.PI/18;
        

        let leaves = new T.Group();
        leaves.add(leaf);
        let allLeaves = new T.Group();

        
        palm.add(allLeaves);
        leaves.position.x = 0;
        leaves.position.y = 0;
        leaves.position.z = 0;
        allLeaves.position.x = -0.8;
        allLeaves.position.y = 11.2;
        allLeaves.position.z = 0;
        

        let leaves1 = leaves.clone();
        leaves1.rotation.y = 2*Math.PI/5;


        let leaves2 = leaves.clone();
        leaves2.rotation.y = 4*Math.PI/5;


        let leaves3 = leaves.clone();
        leaves3.rotation.y = 6*Math.PI/5;


        let leaves4 = leaves.clone();
        leaves4.rotation.y = 8*Math.PI/5;



        allLeaves.add(leaves);
        allLeaves.add(leaves1);
        allLeaves.add(leaves2);
        allLeaves.add(leaves3);
        allLeaves.add(leaves4);

        allLeaves.rotateZ(Math.PI/18);
        palm.add(allLeaves);
        
        //palm.add(objloader);
        super(`Coconut-${++palmTreeCount}`, palm);
        this.palm = palm;
        this.allLeaves = allLeaves;
        this.leaves = leaves;
        this.leaves1 = leaves1;
        this.leaves2 = leaves2;
        this.leaves3 = leaves3;
        this.leaves4 = leaves4;
        this.body1 = body1;
        this.body2 = body2;
        this.body3 = body3;
        this.body4 = body4;
        this.body5 = body5;
        this.coconut1 = coconut1;
        this.coconut2 = coconut2;
        this.time = 0;
        this.destx = x;
        this.destz = z;
        this.recordx = this.destx- this.coconut2.position.x - this.palm.position.x;
        this.recordz = this.destz- this.coconut2.position.z - this.palm.position.z;
        this.count =0;
        }
    stepWorld(delta, timeOfDay) {
        //console.log(this.coconut2.position);
        //console.log(delta);
        let chance = 0.999;
        if (this.time<=0){
            if (Math.random()>chance){
                this.time = 1082;
                this.recordx = this.coconut2.position.x+this.palm.position.x;
                this.recordz = this.coconut2.position.z+this.palm.position.z;

            }
        }
        else if(this.time>1050){
            if (delta ==0){
                return;
            }
            //console.log("1");
            this.time -=delta/16;
            this.coconut2.position.y = 11.5 - 8.8*(1082-this.time)*(1082-this.time)/1024;
        }
        else if(Math.pow(this.coconut2.position.x+this.palm.position.x,2) +Math.pow(this.coconut2.position.z+this.palm.position.z,2) <3600&&this.time>800){
            //console.log("5");
            this.coconut2.position.x += this.recordx/20000 * delta;
            this.coconut2.position.z += this.recordz/20000* delta
            this.coconut2.rotation.z += Math.PI/1000*delta;
        }
        else if(this.time >800){
            //console.log("2");
            this.time -=delta/16;
            this.coconut2.position.x += this.recordx/10000 * delta;
            this.coconut2.position.z += this.recordz/10000* delta
            this.coconut2.position.y -= Math.sqrt(Math.pow(this.recordx/10000 * delta,2)+Math.pow(this.recordz/20000* delta,2))/2;
            this.coconut2.rotation.z += Math.PI/700*delta;
        }
        else if(this.time >201){
            if (delta ==0){
                return;
            }
            //console.log("3");
            this.time -=delta/16;
            this.coconut2.position.x =-1.5
            this.coconut2.position.y =11.5
            this.coconut2.position.z =0
            this.coconut2.scale.set((1/600*(800-this.time))%1,(1/600*(800-this.time))%1,(1/600*(800-this.time))%1);
        }
        else if(this.time >0){
            if (delta ==0){
                return;
            }
            //console.log("4");
            this.time -=delta/16;
        }
        this.count+=delta/1600;
        this.leaves.rotation.z = Math.PI/70*Math.sin(this.count);
        this.leaves1.rotation.z = Math.PI/70*Math.sin(this.count);
        this.leaves2.rotation.z = Math.PI/70*Math.sin(this.count);
        this.leaves3.rotation.z = Math.PI/70*Math.sin(this.count);
        this.leaves4.rotation.z = Math.PI/70*Math.sin(this.count);
        //else if(this.time>1000){
        //    this.time -=1;
        //}
        //else if(this.time>700){
        //    this.time -=1;
        //    let count = 1000-(this.time);
        //    this.coconut2.position.x = this.recordx + (this.destx-this.recordx)*count/300;
        //    this.coconut2.position.z = this.recordz + (this.destz-this.recordz)*count/300;
        //    this.coconut2.rotateZ(delta);
        //}
        //else if(this.time >50){

        //}
       
    }

}
