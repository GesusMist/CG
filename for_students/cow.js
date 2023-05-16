import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";


/** @type {number} */ let cowCount = 0;
export class Cow extends GrObject {
    constructor(x,z,r) {

        let shaderMat = shaderMaterial("./cowshader.vs","./cowshader.fs",
        {
            side: T.DoubleSide,
        });


        let cow = new T.Group();
        cow.position.set (x,0,z);
        cow.rotation.y = Math.PI*2*Math.random();
        let body =new T.Mesh(
            new T.BoxGeometry(3,1.5,1.5),shaderMat
            //new T.MeshStandardMaterial({
            //    color: "#FDFBD3",
            //    roughness: 0.8,
            //    metalness: 0.2,
            //})
        );
        body.position.y =4.2;
        cow.add(body);


        let tail = new T.Group();
        cow.add(tail);
        tail.position.set(0.8,4.8,0);
        let tail1 =new T.Mesh(
            new T.CylinderGeometry(0.1,0.1,1.2),
            shaderMat
        );
        tail1.position.set(0.3,-1.3,0);
        //tail1.translateY(-0.6);
        //tail1.position.y =4.2;
        //tail1.position.x =2;
        tail.rotation.z = 0.2*Math.PI;
        tail.add(tail1);

        let tailGroup2 = new T.Group();
        tail.add(tailGroup2);
        let tail2 =new T.Mesh(
            new T.CylinderGeometry(0.1,0.1,0.6),
            shaderMat
        );
        //tail2.
        tailGroup2.add(tail2);
        tailGroup2.rotation.z = -Math.PI/8;
        tailGroup2.position.set(0.2,-2,0);

        let tailGroup3 = new T.Group();
        tailGroup2.add(tailGroup3);
        let tail3 =new T.Mesh(
            new T.CylinderGeometry(0.12,0.12,0.4),
            new T.MeshStandardMaterial({
                color: "#CD7F32",
                roughness: 1,
                metalness: 0.2,
            })
        );
        tailGroup3.add(tail3);
        tailGroup3.position.y =-0.3;


        //head
        let head = new T.Group();
        cow.add(head);
        head.position.set(-1,4.8,0);
        let head1 =new T.Mesh(
            new T.BoxGeometry(1.0,1.7,1.3),//shaderMat
            new T.MeshStandardMaterial({
                color: "white",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        head.add(head1);
        head1.rotation.z = -Math.PI/8;
        head1.position.x = -0.5

        let eye = new T.Mesh(  
            new T.SphereGeometry(0.2),
            new T.MeshStandardMaterial({
                color: "#000000",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        head.add(eye);
        eye.position.set(-0.8,0.3,0.52);

        let eyes2 = eye.clone();
        head.add(eyes2);
        eyes2.position.set(-0.8,0.3,-0.52);

        let mouth = new T.Mesh(
            new T.BoxGeometry(0.2,0.2,0.9),
            new T.MeshStandardMaterial({
                color: "#000000",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        head.add(mouth);
        mouth.position.set(-1.15,-0.65,0);

        let horn = new T.Mesh(
            new T.CylinderGeometry(0.01,0.2,0.8),
            new T.MeshStandardMaterial({
                color: "#000000",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        head.add(horn);
        let horn2 = horn.clone();
        horn.position.set(-0.3,0.7,0.8);
        horn.rotation.z = Math.PI/4;
        horn.rotation.y = Math.PI/2;

        
        head.add(horn2);
        horn2.position.set(-0.3,0.7,-0.8);
        horn2.rotation.x = -Math.PI/4;
        
        let lfleg = new T.Group();
        cow.add(lfleg);
        lfleg.position.set(-1.1,3.5,0.4);
        let lfleg1 = new T.Mesh(
            new T.BoxGeometry(0.6,1.9,0.6),
            shaderMat
        );
        lfleg1.position.x = 0.3;
        lfleg1.position.y = -0.6;
        lfleg.add(lfleg1);
        //lfleg.rotateZ(Math.PI/4);

        let lbleg = new T.Group();
        cow.add(lbleg);
        lbleg.position.set(0.8,3.5,0.4);
        let lbleg1 = new T.Mesh(
            new T.BoxGeometry(0.6,1.9,0.6),
            shaderMat
        );
        lbleg.add(lbleg1);
        lbleg1.position.x = 0.3;
        lbleg1.position.y = -0.6;

        let rfleg = lfleg.clone();
        cow.add(rfleg);
        rfleg.position.set(-1.1,3.5,-0.4);

        let rbleg = lbleg.clone();
        cow.add(rbleg);
        rbleg.position.set(0.8,3.5,-0.4);


        super(`Cow-${++cowCount}`, cow);
        this.cow = cow;
        this.head = head;
        this.lfleg = lfleg;
        this.phase = 0;
        this.lbleg = lbleg;
        this.rfleg = rfleg;
        this.rbleg = rbleg;
        this.tail = tail;
        this.tailGroup2 = tailGroup2;
        this.x=x;
        this.z=z;
        this.r = r;
            this.state =0;//0:stand 1:walk 2：eat 3: turn
            this.timer = 0;
            this.angle=0
        this.tailtimer = 0;
        this.tailphase = 0;
        this.rideable = body;
    }

    stepWorld(delta, timeOfDay) {
        if (this.state == 0||this.timer <=0) {
            let rand = Math.random();
            if (rand < 0.987) {
                this.state = 0;
            }
            else if (rand < 0.993) {
                this.state = 1;
                this.timer = 166;
            }
            else if (rand < 0.996){
                this.state = 2;
                this.timer = 166;
            }
            else { 
                this.state = 3;
                this.timer = 16;
                this.angle = (Math.random()-0.5)*Math.PI/16;
            }
        }
        else {
            this.timer--;
        }

        this.tail.rotation.x = 0;
        this.tailGroup2.rotation.x = 0;

        if (this.tailtimer > 0) {
            this.tailtimer--;
            this.tailphase += Math.PI *delta/ 512;
            this.tail.rotation.x = Math.sin(this.tailphase) / 2;
            this.tailGroup2.rotation.x = Math.sin(this.tailphase) / 2;
        }
        else if(Math.random()<0.005){
            this.tailtimer = 320;
        }
        
        this.lfleg.rotation.z = 0;
        this.lbleg.rotation.z = 0;
        this.rfleg.rotation.z = 0;
        this.rbleg.rotation.z = 0;

        if(this.state ==1){
            if(Math.pow(this.x-this.cow.position.x+delta/480 * Math.cos(this.cow.rotation.y),2) + Math.pow(this.z-this.cow.position.z-delta/480 * Math.sin(this.cow.rotation.y),2)>Math.pow(this.r,2)){
                this.timer = 32;
                this.state = 3;
                this.angle = (Math.random()-0.5)*Math.PI/32;
                //console.log("hit");
                //console.log(this.x-this.cow.position.x,this.z-this.cow.position.z);

                
            }else{
            this.walk(delta);
            this.lfleg.rotation.z = Math.sin(this.phase)/2;
            this.lbleg.rotation.z = Math.sin(this.phase+Math.PI/4)/2;
            this.rfleg.rotation.z = Math.sin(this.phase+3*Math.PI/4)/2;
            this.rbleg.rotation.z = -Math.sin(this.phase+Math.PI/2)/2;
            

            }
        }
        else if (this.state == 2) {
            this.lfleg.rotation.z = 0;
            this.lbleg.rotation.z = 0;
            this.rfleg.rotation.z = 0;
            this.rbleg.rotation.z = 0;
            if (this.timer > 150) {
                this.head.position.x=  -1 - (166 - this.timer)/16;
                this.head.position.y = 4.8-  (166 - this.timer)/32;
                this.head.rotation.z = Math.PI/3 * (166- this.timer )/16;
                
            }
            else if (this.timer < 16) {
                this.head.position.x=  -1 - (this.timer)/16;
                this.head.position.y = 4.8-  (this.timer)/32;
                this.head.rotation.z = Math.PI/3 * (this.timer)/16;
            }
            else {
                this.head.position.y = 4.3 + Math.sin(this.timer/8 * Math.PI) / 8;
            }
        }
        else if (this.state == 3) {
            this.cow.rotation.y += this.angle;
        }
        
    }
    walk(delta) {
        this.cow.position.z += delta/480 * Math.sin(this.cow.rotation.y);
        this.cow.position.x -= delta/480 * Math.cos(this.cow.rotation.y);
        this.phase += 2* Math.PI*delta/2048;
    }


}
