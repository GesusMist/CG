/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";

import { waterbox } from "./water1.js";
import { Island } from "./Island.js";
import { palmTree } from "./palmTree.js";
import { Cow } from "./cow.js";
import { Grass } from "./grass.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { CrystalBall } from "./crystalBall.js";
import { Excavator } from "./excavator.js";
import { nightsky } from "./nightsky.js";
import {  Airport, Helicopter} from "./helicopter.js";
import { chairs } from "./chairs.js";
import { Man } from "./man.js";
import{bee} from "./bee.js";
import{Swing} from "./swing.js";
import{sign} from "./sign.js";
/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */
let parentOfCanvas = document.getElementById("div1");
// make the worlda
let world = new GrWorld({
    where: parentOfCanvas,
    width: 800,
    height: 800,
    lightBrightness: 0.05, 
    groundplanecolor:"#2382da",
    groundplanesize: 400 // make the ground plane big enough for a world of stuff
});

let loader = new T.CubeTextureLoader();
loader.setPath("./images/skybox/");
let textureCube = loader.load([
    "posx.jpg", "negx.jpg",
    "posy.jpg", "negy.jpg",
    "posz.jpg", "negz.jpg"
]);


world.renderer.shadowMap.enabled = true;
world.renderer.shadowMap.type = T.PCFSoftShadowMap;

const directlight = new T.DirectionalLight(0xffffff, 0.6);
directlight.position.set(-50, 100, 50);
directlight.castShadow = true;
directlight.shadow.bias = -0.001;
directlight.shadow.mapSize.width = 2048;
directlight.shadow.mapSize.height = 2048;
directlight.shadow.camera.near = 0;
directlight.shadow.camera.far = 400;
directlight.shadow.camera.left = -200;
directlight.shadow.camera.right = 200;
directlight.shadow.camera.top = 200;
directlight.shadow.camera.bottom = -100;
world.scene.add(directlight);

world.scene.background = textureCube;
world.groundplane;
world.camera.position.set(-120, 20, -120);
world.camera.lookAt(0, 20, 0);
//world.scene.fog = new T.FogExp2(0x89b3ff, 0.002);
let night = new nightsky();
world.add(night);

let water = new waterbox(800,800);


let island = new Island();
//island.objects[0].receiveShadow = true;
world.add(island);

let palm1 = new palmTree(-60,0);
palm1.objects[0].position.set(-55,0,0);
world.add(palm1);

let palm2 = new palmTree(-60,0);
palm2.objects[0].position.set(-56,0,5);
world.add(palm2);

let palm3 = new palmTree(42.4,-42.4);
palm3.objects[0].position.set(40,0,-40);
world.add(palm3);

let palm4 = new palmTree(0,-60);
palm4.objects[0].position.set(0,0,-55);
world.add(palm4);

let palm5 = new palmTree(0,-60);
palm5.objects[0].position.set(5,0,-56);
world.add(palm5);

let cow = new Cow(-40,20,15);
world.add(cow);
let cow2 = new Cow(-40,20,15);
world.add(cow2);

let grass = new Grass(-40,20,15);
world.add(grass);

let objloader = new OBJLoader();
let statue = await objloader.loadAsync("./objects/statue.obj")
statue.scale.set(0.1,0.1,0.1);
statue.position.set(47,1.8,-20);
statue.rotateY(-Math.PI/3);
world.scene.add(statue);


let tloader = new T.TextureLoader();
let objloader1 = new OBJLoader();
let houseObj = await objloader1.loadAsync("./objects/house.obj")

let house = new T.Mesh(houseObj.children[0].geometry, new T.MeshStandardMaterial({
    map: tloader.load("./textures/wood.jpg"),}));
world.scene.add(house);
house.scale.set(1,1,1);
house.position.set(-20,1.8,-40);
house.rotation.y =-3*Math.PI/4-0.5;


let excavator = new Excavator();
excavator.objects[0].scale.set(5,5,3);
excavator.objects[0].position.set(25,1.8,52);
world.add(excavator);


let airport = new Airport();
world.add(airport);

let helicopter = new Helicopter();
helicopter.objects[0].position.set(0,20,0);
helicopter.setScale(6);
world.add(helicopter);


let aloader = new OBJLoader();
let chairs1 = new chairs(await aloader.loadAsync("./objects/chairs.obj"));
chairs1.objects[0].position.set(-52,2,-20);
world.add(chairs1);

let man = new Man();
world.add(man)

let bee1 = new bee();
bee1.objects[0].scale.set(3,3,3);
world.add(bee1);

let swing = new Swing();
swing.objects[0].position.set(-8,2.3,-55);
swing.objects[0].rotation.y = Math.PI*0.55;

swing.setScale(3);
world.add(swing);

let sign1 = new sign();
sign1.objects[0].position.set(-10,2.3,55);
sign1.objects[0].rotation.y = Math.PI*0.55;
world.add(sign1);

//let crystalball = new CrystalBall(world);
//crystalball.objects[0].position.set(0,20,0);
//world.add(crystalball);
// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
//main(world);

//sun
//let selflight = new T.SpotLight(0xFDFBE3, 1, 1, 20);
//selflight.target.position.set(0, 0, 0);
//selflight.position.set(33, 330, 0);
//selflight.castShadow = true;
//world.scene.add(selflight);
//let sun1 = new sun(selflight);
//world.add(sun1);

// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
//highlight("SimpleHouse-5");
//highlight("Helicopter-0");
////highlight("Track Car");
//highlight("MorphTest");
world.scene.traverse((obj) => {
    if (obj instanceof T.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
world.add(water);

highlight("helicopter-1");
highlight("Cow-1");
highlight("Coconut-1");
highlight("Mr.Copper");
highlight("Swing-0");
///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
