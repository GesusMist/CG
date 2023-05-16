import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

/** @type {number} */ let manCount = 0;
export class Man extends GrObject {
    constructor() {
        let loader1 = new T.TextureLoader();
        let man = new T.Group();
        let mat = new T.MeshStandardMaterial({
            color : "#F1c27d",
            metalness: 0.4,
            roughness: 0.6,
        });

        let leanFB =new T.Group();
        leanFB.position.set(0,0,0);
        leanFB.add(man)
        let heads = new T.Group();
        heads.position.y = 6.8;
        man.add(heads);
        let head = new T.Mesh(
            new T.SphereGeometry(0.45),
            mat
        );
        heads.add(head);

        let leye = new T.Mesh(
            new T.SphereGeometry(0.05),
            new T.MeshStandardMaterial({
                color : "#000000",
                metalness: 0.8,
                roughness: 0.2,
            })
        );

        leye.position.set(-0.2,0.13,0.4);
        heads.add(leye);

        let reye = leye.clone();
        reye.position.set(0.2,0.13,0.4);
        heads.add(reye);

        let exSettings = {
            steps: 0,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 2
          };
      
          
          /**@type THREE.Shape */
          let base_curve = new T.Shape();
          base_curve.quadraticCurveTo(0.15,-0.3,0.3,0);
          base_curve.lineTo(0,0);

          let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
          let excavator_mat = new T.MeshStandardMaterial({
            map: loader1.load("./textures/white.jpg"),
        })
        let mouth = new T.Mesh(base_geom, excavator_mat);
        mouth.position.set(-0.1,-0.1,0.12);
        heads.add(mouth);

        //body
        let body = new T.Mesh(
            new T.CylinderGeometry(0.3,0.3,1.5),
            mat
        );
        body.position.y = 5.5;
        man .add(body);

        //arms
        let larms = new T.Group();
        man.add(larms);
        larms.position.set(-0.4,6,0);
        larms.rotation.z = -Math.PI/6;
        let luparm = new T.Mesh(
            new T.CylinderGeometry(0.1,0.1,0.8),
            mat
        );
        luparm.position.y = -0.4;
        larms.add(luparm);

        let llarms = new T.Group();
        larms.add(llarms);
        llarms .position.y = -0.8;
        llarms.rotation.z = Math.PI/6;
        let llarm = new T.Mesh(
            new T.CylinderGeometry(0.1,0.1,0.8),
            mat
        );
        llarm.position.y = -0.4;
        llarms.add(llarm);

        let lhand = new T.Mesh(
            new T.SphereGeometry(0.2),
            mat
        );
        lhand.position.y = -0.9;
        llarms.add(lhand);




        let rarms = new T.Group();
        man.add(rarms);
        let ruparm = luparm.clone();
        rarms.add(ruparm);
        rarms.position.set(0.4,6,0);
        rarms.rotation.z = Math.PI/6;

        let rlarms = new T.Group();
        rarms.add(rlarms);
        rlarms .position.y = -0.8;
        rlarms.rotation.z = -Math.PI/6;
        let rlarm = llarm.clone();
        rlarms.add(rlarm);
            
        let rhand = lhand.clone();
        rhand.position.y = -0.9;
        rlarms.add(rhand);

        //legs
        let llegs = new T.Group();
        man.add(llegs);
        llegs.position.set(-0.1,4.6,0);
        llegs.rotation.z = -Math.PI/8;
        let llupleg = new T.Mesh(
            new T.CylinderGeometry(0.1,0.1,0.8),
            mat
        );
        llupleg.position.y = -0.4;
        llegs.add(llupleg);

        let llllegs = new T.Group();
        llegs.add(llllegs);
        llllegs .position.y = -0.9;
        llllegs.rotation.z = Math.PI/8;
        let llleg = new T.Mesh(
            new T.CylinderGeometry(0.1,0.1,1.5),
            mat
        );
        llleg.position.y = -0.75;
        llllegs.add(llleg);

        let lfoot = new T.Mesh(
            new T.BoxGeometry(0.5,0.3,0.9),
            mat
        );
        lfoot.position.y = -1.4;
        lfoot.position.x = 0;
        lfoot.position.z = 0.2;
        llllegs.add(lfoot);

        let rlegs = new T.Group();
        man.add(rlegs);
        let rupleg = llupleg.clone();
        rlegs.add(rupleg);
        rlegs.position.set(0.1,4.6,0);
        rlegs.rotation.z = Math.PI/8;
            
        let rlllegs = new T.Group();
        rlegs.add(rlllegs);
        rlllegs .position.y = -0.9;
        rlllegs.rotation.z = -Math.PI/8;
        let rlleg = llleg.clone();
        rlllegs.add(rlleg);
            
        let rfoot = lfoot.clone();
        rfoot.position.y = -1.4;
        rfoot.position.x = 0;
        rfoot.position.z = 0.2;
        rlllegs.add(rfoot);






        //let helper = new T.AxesHelper(3);
        //man.add(helper);


        
        


        super(`Mr.Copper`,man);

        
        this.man = man ;
        this.heads = heads;
        this.larms = larms;
        this.rarms = rarms;
        this.head = head;
        this.llarms = llarms;
        this.rlarms = rlarms;
        this.llegs = llegs;
        this.rlegs = rlegs;
        this.lllegs = llllegs;
        this.rlllegs = rlllegs;
        this.timer = 240;
        this.state = 1; //0:stand 1:lie 2:walk 3: waking up 4:going to sleep
        this.phase = 0;
        this.lastsleep=0;
        this.turnTimer =0;
        this.turnangle = 0;
        this.rideable = true;

        
    }
    iflocationValid(){
        let x = this.man.position.x;
        let z = this.man.position.z;
        if (x*x+z*z>3600){
            console.log("1");
            return false;
        }
        if (x<-10&&x>-30&&z<-30&&z>-50){
            console.log("2");
            return false;
        }
        if (x<52&&x>47&&z<-20&&z>-30){
            console.log("3");
            return false;
        }
        if (x<35&&x>0&&z<60&&z>50){
            console.log("4");
            return false;
        }
        if (x<-54&&x>-57&&z<6&&z>-1){
            console.log("5");
            return false;
        }
        if (x<6&&x>-1&&z<-54&&z>-57){
            console.log("6");
            return false;
        }
        if (x<41&&x>39&&z<-39&&z>-41){
            console.log("7");
            return false;
        }
        return true;
    }
    walkTo(x,z,delta){
        this.man.position.z += z;
        this.man.position.x += x;
        this.larms.rotation.x = Math.sin(this.phase)*Math.PI/4;
        this.rarms.rotation.x = -Math.sin(this.phase)*Math.PI/4;
        this.llarms.rotation.x = -Math.sin(this.phase)*Math.PI/4;
        this.rlarms.rotation.x = Math.sin(this.phase)*Math.PI/4;

        this.llegs.rotation.x = -Math.sin(this.phase)*Math.PI/4;
        this.rlegs.rotation.x = Math.sin(this.phase)*Math.PI/4;
        this.lllegs.rotation.x = Math.sin(this.phase)*Math.PI/4;
        this.rlllegs.rotation.x = -Math.sin(this.phase)*Math.PI/4;
        this.phase += delta/500;
        this.man.position.y =  Math.cos(2*this.phase)*0.1-0.3;

    }
    walk(delta,speed,ifturn){
        this.man.position.z += delta/(speed+100)*Math.cos(this.man.rotation.y);
        this.man.position.x += delta/(speed+100)*Math.sin(this.man.rotation.y);
        if (!this.iflocationValid()){
            console.log("invalid");
            if (ifturn){
            this.man.rotation.y += Math.PI*0.3;
            }
        }
        this.larms.rotation.x = Math.sin(this.phase)*Math.PI/4;
        this.rarms.rotation.x = -Math.sin(this.phase)*Math.PI/4;
        this.llarms.rotation.x = -Math.sin(this.phase)*Math.PI/4;
        this.rlarms.rotation.x = Math.sin(this.phase)*Math.PI/4;

        this.llegs.rotation.x = -Math.sin(this.phase)*Math.PI/4;
        this.rlegs.rotation.x = Math.sin(this.phase)*Math.PI/4;
        this.lllegs.rotation.x = Math.sin(this.phase)*Math.PI/4;
        this.rlllegs.rotation.x = -Math.sin(this.phase)*Math.PI/4;
        this.phase += delta/speed;
        this.man.position.y =  Math.cos(2*this.phase)*0.1-0.3;

        
        if (ifturn){
            let random = Math.random();
            if (random<0.005){
                this.turnTimer=60;
                this.turnangle =Math.random()-0.5;
            }
        }

    }
    turn(delta){
        this.man.rotation.y += delta/800*this.turnangle;
    }
    lie(delta){
        this.man.position.set (-53.4,1.15,-24.7);
        //man.rotation.y = -0.55*Math.PI;
        //man.rotation.z = -0.2*Math.PI;
        this.man.rotation.x = -0.5*Math.PI;
        this.man.rotation.y = -0.27*Math.PI;
        this.man.rotation.z = -0.55*Math.PI;

        this.llegs.rotation.x = -Math.PI/6;
        this.lllegs.rotation.x = -Math.PI/8;
        this.rlegs.rotation.x = -Math.PI/6;
        this.rlllegs.rotation.x = -Math.PI/8;

        this.lllegs.rotation.y = Math.sin(this.phase)*Math.PI/8-Math.PI/8;
        this.rlllegs.rotation.y = -Math.sin(this.phase)*Math.PI/8+Math.PI/8;

        this.larms.rotation.x = Math.PI;
        this.larms.rotation.z = -0.45*Math.PI;
        this.llarms.rotation.z = Math.PI*3/4;

        this.rarms.rotation.x = Math.PI;
        this.rarms.rotation.z = 0.45*Math.PI;
        
        

        
    }

    stepWorld(delta, timeOfDay) {
        this.phase += delta/1000;
        this.timer -= delta/32;
        this.turnTimer -= delta/32;
        this.lastsleep += delta/32;
        console.log(this.man.rotation.y);
        if (this.turnTimer > 0){
            this.turn(delta);
        }
        //this.turn(delta);
        //this.walk(delta);
        if (this.state == 1){
            this.lastsleep = 0;
            if (this.timer > 0){
                this.lie(delta);
            }
            else {
                this.state = 3;
                this.timer = 80;
            }
        }
        else if(this.state == 3){
            if(this.timer > 0){
                let t = 80-this.timer
                this.man.position.set (-53.4+1.4*t/80,1.15-1.15*t/80+1.5*Math.sin(t*Math.PI/80),-24.7+2.7*t/80);
                //man.rotation.y = -0.55*Math.PI;
                //man.rotation.z = -0.2*Math.PI;
                this.man.rotation.x = -0.5*Math.PI+Math.PI/2*t/80;
                this.man.rotation.y = -0.27*Math.PI+0.27*Math.PI*t/80;
                this.man.rotation.z = -0.55*Math.PI+0.55*Math.PI*t/80;

                this.llegs.rotation.x = -Math.PI/6+ Math.PI/6*t/80;
                this.lllegs.rotation.x = -Math.PI/8+ Math.PI/8*t/80;
                this.rlegs.rotation.x = -Math.PI/6+ Math.PI/6*t/80;
                this.rlllegs.rotation.x = -Math.PI/8+ Math.PI/8*t/80;

                this.lllegs.rotation.y = 0;
                this.rlllegs.rotation.y = 0;

                this.larms.rotation.x = Math.PI- Math.PI*t/80;
                this.larms.rotation.z = -0.45*Math.PI+Math.PI*17/60*t/80;
                this.llarms.rotation.z = Math.PI*3/4 - Math.PI*7/12*t/80;

                this.rarms.rotation.x = Math.PI- Math.PI*t/80;
                this.rarms.rotation.z = 0.45*Math.PI-Math.PI*17/60*t/80;
            }
            if (this.timer < 0){
                this.state = 0;
                this.timer = 80;
            }
        }
        else if (this.state ==0){
            if (this.timer > 0){

            }
            else{
                let random = Math.random();
                if (random < 0.2){
                    this.state = 0;
                    this.timer = 80;
                }
                else if (random < 0.95){
                    this.state = 2;
                    this.timer = 300;
                }
                else if (this.lastsleep>1000){
                    this.z = this.man.position.z;
                    this.x =  this.man.position.x;   
                    let z = this.z;
                    let x = this.x;        

                    this.man.rotation.y  = Math.atan((z+22)/(x+52))+Math.PI;
                    this.state = 4;
                    this.timer = 500;
                    this.distTobed = Math.sqrt((22+z)*(22+z)+(x+52)*(x+52))
                }

            }
        }
        else if (this.state == 2){
        
            if (this.timer > 0){
                this.walk(delta,500,1);
            }
            else{
                let random = Math.random();
                if (random < 0.5){
                this.state = 0;
                this.timer = 80;
                }
                else{
                this.state = 2;
                this.timer = 300;
                }
            }


        
        }
        else if (this.state == 4){
            if (this.timer > 100){
                let x = this.x;
                let z = this.z;

                this.man.rotation.y  = Math.atan((22+z)/(x+52));
                //this.walk(delta*3*this.distTobed/64,500,0);
                this.walkTo((-52-x)*delta/400/32,(-22-z)*delta/400/32,delta);
            }
            else if (this.timer > 80){}
            else if (this.timer > 0){
                let t = this.timer;
                this.man.position.set (-53.4+1.4*t/80,1.15-1.15*t/80+1.5*Math.sin(t*Math.PI/80),-24.7+2.7*t/80);
                //man.rotation.y = -0.55*Math.PI;
                //man.rotation.z = -0.2*Math.PI;
                this.man.rotation.x = -0.5*Math.PI+Math.PI/2*t/80;
                this.man.rotation.y = -0.27*Math.PI+0.27*Math.PI*t/80;
                this.man.rotation.z = -0.55*Math.PI+0.55*Math.PI*t/80;

                this.llegs.rotation.x = -Math.PI/6+ Math.PI/6*t/80;
                this.lllegs.rotation.x = -Math.PI/8+ Math.PI/8*t/80;
                this.rlegs.rotation.x = -Math.PI/6+ Math.PI/6*t/80;
                this.rlllegs.rotation.x = -Math.PI/8+ Math.PI/8*t/80;

                this.lllegs.rotation.y = 0;
                this.rlllegs.rotation.y = 0;

                this.larms.rotation.x = Math.PI- Math.PI*t/80;
                this.larms.rotation.z = -0.45*Math.PI+Math.PI*17/60*t/80;
                this.llarms.rotation.z = Math.PI*3/4 - Math.PI*7/12*t/80;

                this.rarms.rotation.x = Math.PI- Math.PI*t/80;
                this.rarms.rotation.z = 0.45*Math.PI-Math.PI*17/60*t/80;
            }

            else {
                this.state = 1;
                this.timer = 1000;
            }
        }
    


    }
}
