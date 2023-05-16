import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";


/** @type {number} */ let HelicopterCount = 0;
export class Airport extends GrObject {
    constructor(x,z,r) {
        let port = new T.Group();
        let mesh = new T.Mesh(
            new T.CylinderGeometry(20,20,2,32),
            new T.MeshStandardMaterial({
                color: "#FFFFFF",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        mesh.position.y = 1.01;
        port.add(mesh);
        let mesh2 = new T.Mesh(
            new T.CylinderGeometry(18,18,2,32),
            new T.MeshStandardMaterial({
                color: "#777777",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        mesh2.position.y = 1.05;
        port.add(mesh2);

        let hleft = new T.Mesh(
            new T.BoxGeometry(22,1,1),
            new T.MeshStandardMaterial({
                color: "#FFFFFF",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        hleft.position.set(0,1.7,6.5);
        port.add(hleft);

        let hright = hleft.clone();
        hright.position.set(0,1.7,-6.5);
        port.add(hright);

        let htop = new T.Mesh(
            new T.BoxGeometry(1,1,14),
            new T.MeshStandardMaterial({
                color: "#FFFFFF",
                roughness: 0.8,
                metalness: 0.2,
            })
        );
        htop.position.set(0,1.7,0);
        port.add(htop);
        


        super(`airport-${++HelicopterCount}`, port);
        
    }

    stepWorld(delta, timeOfDay) {
    }

}

/** @type {number} */ let HeliCount = 0;
export class Helicopter extends GrObject {
    constructor(x,z,r) {
        let thecolor = "black";
        let helicopter = new T.Group();
        let body = new T.BoxGeometry(0.6, 0.6, 0.6);
        let bodyMesh = new T.Mesh(
            body,
            new T.MeshStandardMaterial({ color: thecolor, roughness: 0.9 })
        );
        bodyMesh.position.set(0, 0, 0);
        helicopter.add(bodyMesh);

        let rotor = new T.BoxGeometry(0.1, 0.1, 0.1);
        let rotorMesh = new T.Mesh(
            rotor,
            new T.MeshStandardMaterial({ color: thecolor, roughness: 0.9 })
        );
        rotorMesh.position.set(0, 0, 0.3);
        helicopter.add(rotorMesh);

        let tail = new T.BoxGeometry(0.1, 0.1, 1);
        let tailMesh = new T.Mesh(
            tail,
            new T.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 })
        );
        tailMesh.position.set(0, 0, -0.8);
        helicopter.add(tailMesh);

        let head = new T.BoxGeometry(0.1, 0.4, 0.1);
        let headMesh = new T.Mesh(
            head,
            new T.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 })
        );
        headMesh.position.set(0, 0.4, 0);
        helicopter.add(headMesh);

        let propellers = new T.Group();
        propellers.position.set(0, 0.6, 0);
        helicopter.add(propellers);
        for (let i = 0; i < 2; i++) {
            let propeller = new T.BoxGeometry(2, 0.1, 0.1);
            let propellerMesh = new T.Mesh(
                    propeller,
                    new T.MeshStandardMaterial({ color: thecolor, roughness: 0.9 })
                );
            propellerMesh.position.set(0, 0, 0);
            propellerMesh.rotateY(Math.PI *i/2);
            propellers.add(propellerMesh);
        }
        propellers.rotateY(Math.PI / 4);

        let propeller2s = new T.Group();
        propeller2s.position.set(0, 0.6, -1.3);
        helicopter.add(propeller2s);
        for (let i = 0; i < 2; i++) {
            let propeller2 = new T.BoxGeometry(1, 0.1, 0.1);
            let propeller2Mesh = new T.Mesh(
                    propeller2,
                    new T.MeshStandardMaterial({ color: thecolor, roughness: 0.9 })
                );
            propeller2Mesh.position.set(0, 0, 0);
            propeller2Mesh.rotateY(Math.PI *i/2);
            propeller2s.add(propeller2Mesh);
        }

        propeller2s.rotateZ(Math.PI / 2);
        propeller2s.translateX(-0.55);
        propeller2s.rotateY(Math.PI / 4);

        let lfoot = new T.Mesh( new T.CylinderGeometry(0.05,0.05,1)
        , new T.MeshStandardMaterial({color: "#FFFFFF", roughness: 0.8, metalness: 0.2,}));
        lfoot.position.set(0.3,-0.6,0);
        lfoot.rotateX(Math.PI/2);
        helicopter.add(lfoot);

        let rfoot = lfoot.clone();
        rfoot.position.set(-0.3,-0.6,0);
        helicopter.add(rfoot);

        let connect = new T.Mesh( new T.CylinderGeometry(0.05,0.05,0.5)
        , new T.MeshStandardMaterial({color: "#FFFFFF", roughness: 0.8, metalness: 0.2,}));
        connect.position.set(0.19,-0.42,0);
        connect.rotation.z =(Math.PI/5);
        helicopter.add(connect);

        let connect2 = connect.clone();
        connect2.position.set(-0.19,-0.42,0);
        connect2.rotation.z =-(Math.PI/5);
        helicopter.add(connect2);



        super(`helicopter-${++HeliCount}`,helicopter);
        this.body = bodyMesh;
        this.helicopter = helicopter;
        this.rotor = rotorMesh;
        this.propellers1 = propellers;
        this.propellers2 = propeller2s;
        this.tail = tailMesh;
        this.time = 0;
        this.rideable = helicopter;
        
    }

    stepWorld(delta, timeOfDay) {
        this.time += delta/16;
        let theta = this.time/100;
        this.propellers1.rotateY(delta/1.7);
        this.propellers2.rotateY(delta/23);

        this.helicopter.lookAt(70*Math.cos(1.3*theta), 45+15*Math.cos(0.7*theta), 70*Math.sin(theta));
        this.helicopter.position.set(70*Math.cos(1.3*theta), 45+15*Math.cos(0.7*theta), 70*Math.sin(theta))
    }

}

