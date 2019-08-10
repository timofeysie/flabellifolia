import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as THREE from 'three';
import { OrbitControls } from 'three';

// import { Sea } from './sea';
// import { Sky } from './sky';
// import { Colors } from './colors';
/**
 * Generated class for the PlanePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plane',
  templateUrl: 'plane.html',
})
export class PlanePage implements AfterViewInit  {
	@ViewChild('container') container: ElementRef;
	@HostListener('window:resize', ['$event']) onResize(event) { this.resizeRendererToDisplaySize(); }
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    shadowLightAngle: number;
    shadowLightRadius: number;
    shadowLight1: THREE.DirectionalLight // createShadowLight(shadowLightAngle, shadowLightRadius);

	constructor(public navCtrl: NavController) {
		// this.createScene();
		// this.createLights();
		// //this.createBox();
		// this.createSky();
		// this.scene = new THREE.Scene();
		// this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		// this.camera.position.z = 1000;
		// const geometry = new THREE.BoxGeometry(200, 200, 200);
		// const material = new THREE.MeshBasicMaterial({color: Colors.WHITE, wireframe: false});
		// this.mesh = new THREE.Mesh(geometry, material); // create the cube
		// this.scene.add(this.mesh);
        // this.createSea();
        //const canvas = document.querySelector('#container');
        //const renderer = new THREE.WebGLRenderer({canvas});
        
	}

	ngAfterViewInit() {
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.shadowMap.enabled = true;
        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 100;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.y = 15;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#B4B4B4');
		// this.renderer.setSize(window.innerWidth, window.innerHeight);
		// this.container.nativeElement.appendChild(this.renderer.domElement);
        // this.animate();
        const controls = new THREE.OrbitControls(this.camera, this.container.nativeElement);
        controls.target.set(0, 0, 0);
        controls.update();

        //add light
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        this.scene.add(ambientLight);

        // where?
        for (let degree = 0; degree<=360; degree+=30) {
            this.createCube(5, degree);
        }

        // plane
        const planeSize = 20;
        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshLambertMaterial({
        color: 'lightgray',
        });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.receiveShadow = true;
        plane.rotation.x = this.deg(-90);
        this.scene.add(plane);

        this.shadowLightAngle = 0;
        this.shadowLightRadius = 8;
        this.shadowLight1 = this.createShadowLight(this.shadowLightAngle, this.shadowLightRadius);
	}

	animate() {
		//this.mesh.rotation.x += 0.01;
		//this.mesh.rotation.y += 0.02;
		// this.sky.mesh.rotation.z += .001;
		// this.sea.moveWaves();
		// Tell the renderer that the geometry of the sea has changed.
		// In fact, in order to maintain the best level of performance,
		// three.js caches the geometries and ignores any changes
		// unless we add this line
		//this.mesh.geometry.verticesNeedUpdate=true;
		// The above line will cause a console error (everything seems to work fine without it):
		//
		// core.js:1449 ERROR Error: Uncaught (in promise): TypeError: Cannot read property 'geometry' of null
		// TypeError: Cannot read property 'geometry' of null
		//   at PlanePage.webpackJsonp.103.PlanePage.animate (plane.ts:69)
		// this.sea.mesh.rotation.z += .002;
		// this.renderer.render(this.scene, this.camera);
		// window.requestAnimationFrame(() => this.animate());
	}

  render(time: any) {
    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    time *= 0.001;
    this.shadowLightAngle += 0.3;
    const shadowLightPositionX = Math.cos(this.deg(this.shadowLightAngle)) * this.shadowLightRadius;
    const shadowLightPositionZ = Math.sin(this.deg(this.shadowLightAngle)) * this.shadowLightRadius;
    this.shadowLight1.position.set(shadowLightPositionX, 3, shadowLightPositionZ);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
    // this.renderer.render(this.scene, this.camera);
		// window.requestAnimationFrame(() => this.animate());
  }

	// createSky(){
	// 	this.sky = new Sky();
	// 	this.sky.mesh.position.y = -600;
	// 	this.scene.add(this.sky.mesh);
	// }

	// createLights() {
	// 	// A hemisphere light is a gradient colored light;
	// 	// the first parameter is the sky color, the second parameter is the ground color,
	// 	// the third parameter is the intensity of the light
	// 	this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
  //
	// 	// A directional light shines from a specific direction.
	// 	// It acts like the sun, that means that all the rays produced are parallel.
	// 	this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  //
	// 	// Set the direction of the light
	// 	this.shadowLight.position.set(150, 350, 350);
  //
	// 	// Allow shadow casting
	// 	this.shadowLight.castShadow = true;
  //
	// 	// define the visible area of the projected shadow
	// 	this.shadowLight.shadow.camera.left = -400;
	// 	this.shadowLight.shadow.camera.right = 400;
	// 	this.shadowLight.shadow.camera.top = 400;
	// 	this.shadowLight.shadow.camera.bottom = -400;
	// 	this.shadowLight.shadow.camera.near = 1;
	// 	this.shadowLight.shadow.camera.far = 1000;
  //
	// 	// define the resolution of the shadow; the higher the better,
	// 	// but also the more expensive and less performant
	// 	this.shadowLight.shadow.mapSize.width = 2048;
	// 	this.shadowLight.shadow.mapSize.height = 2048;
  //
	// 	let ambientLight = new THREE.AmbientLight(0xdc8874, .5);
	// 	this.scene.add(ambientLight);
  //
	// 	// to activate the lights, just add them to the scene
	// 	this.scene.add(this.hemisphereLight);
	// 	this.scene.add(this.shadowLight);
	// }
  //
	// createBox() {
	// 	const geometry = new THREE.BoxGeometry(200, 200, 200);
	// 	const material = new THREE.MeshBasicMaterial({color: Colors.WHITE, wireframe: true});
	// 	this.mesh = new THREE.Mesh(geometry, material); // create the cube
	// 	this.scene.add(this.mesh);
	// }
  //
	// createScene() {
	// 	// Get the width and the height of the screen,
	// 	// use them to set up the aspect ratio of the camera
	// 	// and the size of the renderer.
	// 	this.HEIGHT = window.innerHeight;
	// 	this.WIDTH = window.innerWidth;
  //
	// 	// Create the scene
	// 	this.scene = new THREE.Scene();
  //
	// 	// Add a fog effect to the scene; same color as the
	// 	// background color used in the style sheet
	// 	this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  //
	// 	// Create the camera
	// 	this.aspectRatio = this.WIDTH / this.HEIGHT;
	// 	this.fieldOfView = 60;
	// 	this.nearPlane = 1;
	// 	this.farPlane = 10000;
	// 	this.camera = new THREE.PerspectiveCamera(
	// 		this.fieldOfView,
	// 		this.aspectRatio,
	// 		this.nearPlane,
	// 		this.farPlane
	// 	);
  //
	// 	// Set the position of the camera
	// 	this.camera.position.x = 0;
	// 	this.camera.position.z = 200;
	// 	this.camera.position.y = 100;
  //
	// 	// Create the renderer
	// 	this.renderer = new THREE.WebGLRenderer({
	// 		// Allow transparency to show the gradient background
	// 		// we defined in the CSS
	// 		alpha: true,
  //
	// 		// Activate the anti-aliasing; this is less performant,
	// 		// but, as our project is low-poly based, it should be fine :)
	// 		antialias: true
	// 	});
  //
	// 	// Define the size of the renderer; in this case,
	// 	// it will fill the entire screen
	// 	this.renderer.setSize(this.WIDTH, this.HEIGHT);
  //
	// 	// Enable shadow rendering
	// 	this.renderer.shadowMap.enabled = true;
	// 	//this.createBox();
	// 	this.createSea();
	// }
  //
	/**
     * This is from the original plane demo.
     * The new way is to use the resizeRendererToDisplaySize fn.
	 * Listen to the screen: if the user resizes it
	 * we have to update the camera and the renderer size
 	 * @param event
 	*/
	// handleWindowResize(event) {
		// update height and width of the renderer and the camera
		// this.HEIGHT = window.innerHeight;
		// this.WIDTH = window.innerWidth;
		// this.renderer.setSize(this.WIDTH, this.HEIGHT);
		// this.camera.aspect = this.WIDTH / this.HEIGHT;
		// this.camera.updateProjectionMatrix();
	// }
  //
	//   createSea(){
	// 	this.sea = new Sea();
	// 	// push it a little bit at the bottom of the scene
	// 	this.sea.mesh.position.y = -600;
	// 	// add the mesh of the sea to the scene
	// 	this.scene.add(this.sea.mesh);
	// }

  deg(degree) {
    return degree / 180 * Math.PI;
  }

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio;
    const height = canvas.clientHeight * pixelRatio;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  }


  createShadowLight(shadowLightAngle, shadowLightRadius) {
    const shadowLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    const shadowLightPositionX = Math.cos(this.deg(shadowLightAngle)) * shadowLightRadius;
    const shadowLightPositionZ = Math.sin(this.deg(shadowLightAngle)) * shadowLightRadius;
    shadowLight.position.set(shadowLightPositionX, 3, shadowLightPositionZ);
    shadowLight.target.position.set(0, 0, 0);
    shadowLight.castShadow = true;
    shadowLight.shadow.mapSize.width = 2000;
    shadowLight.shadow.mapSize.height = 2000;

    shadowLight.shadow.camera.left = -8;
    shadowLight.shadow.camera.right = 8;
    shadowLight.shadow.camera.far = 30;

    this.scene.add(shadowLight);
    this.scene.add(shadowLight.target);

    return shadowLight;
  }

    createCube(radius, degree) {
      const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
      const cubeMat = new THREE.MeshLambertMaterial({color: 'white'});
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.x = Math.cos(this.deg(degree)) * radius;
      cube.position.z = Math.sin(this.deg(degree)) * radius;
      cube.position.y = 0.5;
      cube.rotation.y = this.deg(-degree);
      cube.castShadow = true;
      cube.receiveShadow = true;
      this.scene.add(cube);
    }

}

// ===========================================================

// 'use strict';

// function deg(degree) {
//   return degree / 180 * Math.PI;
// }

//function main() {
  // const canvas = document.querySelector('#c');
  // const renderer = new THREE.WebGLRenderer({canvas});
  // renderer.shadowMap.enabled = true;
  // const fov = 75;
  // const aspect = 2;
  // const near = 0.1;
  // const far = 100;
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.y = 15;
  //
  // const scene = new THREE.Scene();
  // scene.background = new THREE.Color('#B4B4B4');
  //
  // const controls = new THREE.OrbitControls(camera, canvas);
  // controls.target.set(0, 0, 0);
  // controls.update();
  //
  // //add light
  // const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
  // scene.add(ambientLight);

  //
  // function createShadowLight(shadowLightAngle, shadowLightRadius) {
  //   const shadowLight = new THREE.DirectionalLight(0xFFFFFF, 1);
  //   const shadowLightPositionX = Math.cos(deg(shadowLightAngle)) * shadowLightRadius;
  //   const shadowLightPositionZ = Math.sin(deg(shadowLightAngle)) * shadowLightRadius;
  //   shadowLight.position.set(shadowLightPositionX, 3, shadowLightPositionZ);
  //   shadowLight.target.position.set(0, 0, 0);
  //   shadowLight.castShadow = true;
  //   shadowLight.shadow.mapSize.width = 2000;
  //   shadowLight.shadow.mapSize.height = 2000;
  //
  //   shadowLight.shadow.camera.left = -8;
  //   shadowLight.shadow.camera.right = 8;
  //   shadowLight.shadow.camera.far = 30;
  //
  //   scene.add(shadowLight);
  //   scene.add(shadowLight.target);
  //
  //   return shadowLight;
  // }

  // let shadowLightAngle = 0;
  // let shadowLightRadius = 8;
  //
  // const shadowLight1 = createShadowLight(shadowLightAngle, shadowLightRadius);

  // function createCube(radius, degree) {
  //   const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
  //   const cubeMat = new THREE.MeshLambertMaterial({color: 'white'});
  //   const cube = new THREE.Mesh(cubeGeo, cubeMat);
  //   cube.position.x = Math.cos(deg(degree)) * radius;
  //   cube.position.z = Math.sin(deg(degree)) * radius;
  //   cube.position.y = 0.5;
  //   cube.rotation.y = deg(-degree);
  //   cube.castShadow = true;
  //   cube.receiveShadow = true;
  //   scene.add(cube);
  // }

  // for (let degree = 0; degree<=360; degree+=30) {
  //   createCube(5, degree);
  // }

  // // plane
  // const planeSize = 20;
  // const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  // const planeMat = new THREE.MeshLambertMaterial({
  //   color: 'lightgray',
  // });
  // const plane = new THREE.Mesh(planeGeo, planeMat);
  // plane.receiveShadow = true;
  // plane.rotation.x = deg(-90);
  // scene.add(plane);

  // function resizeRendererToDisplaySize(renderer) {
  //   const canvas = renderer.domElement;
  //   const pixelRatio = window.devicePixelRatio;
  //   const width = canvas.clientWidth * pixelRatio;
  //   const height = canvas.clientHeight * pixelRatio;
  //   const needResize = canvas.width !== width || canvas.height !== height;
  //   if (needResize) {
  //     renderer.setSize(width, height, false);
  //   }
  //   return needResize;
  // }

  // function render(time) {
  //   if (resizeRendererToDisplaySize(renderer)) {
  //     const canvas = renderer.domElement;
  //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //     camera.updateProjectionMatrix();
  //   }
  //
  //   time *= 0.001;
  //   shadowLightAngle += 0.3;
  //   const shadowLightPositionX = Math.cos(deg(shadowLightAngle)) * shadowLightRadius;
  //   const shadowLightPositionZ = Math.sin(deg(shadowLightAngle)) * shadowLightRadius;
  //   shadowLight1.position.set(shadowLightPositionX, 3, shadowLightPositionZ);
  //
  //
  //   renderer.render(scene, camera);
  //   requestAnimationFrame(render);
  // }
  //requestAnimationFrame(render);
//}

