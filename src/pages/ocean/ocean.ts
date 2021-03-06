import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as THREE from 'three';
import { Sea } from './sea';
import { Sky } from './sky';
import { Colors } from './colors';
/**
 * Generated class for the PlanePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'ocean-plane',
  templateUrl: 'ocean.html',
})
export class OceanPage implements AfterViewInit  {
	@ViewChild('container') container: ElementRef;
	@HostListener('window:resize', ['$event']) onResize(event) { this.handleWindowResize(event); }
	
	HEIGHT;
	WIDTH;
	fieldOfView;
	aspectRatio;
	nearPlane;
	farPlane;
	renderer = new THREE.WebGLRenderer({alpha: true});
    scene = null;
    camera = null;
	mesh = null;
	sea: any;
	sky: any;
	hemisphereLight;
	shadowLight;
	constructor(public navCtrl: NavController) {
		this.createScene();
		this.createLights();
		this.createSky();
	}

	ngAfterViewInit() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.container.nativeElement.appendChild(this.renderer.domElement);
		this.animate();
	}

	animate() {
		this.sky.mesh.rotation.z += .001;
		this.sea.moveWaves();
		// Tell the renderer that the geometry of the sea has changed.
		// In fact, in order to maintain the best level of performance, 
		// three.js caches the geometries and ignores any changes
		// unless we add this line
		//this.mesh.geometry.verticesNeedUpdate=true;
		// The above line will cause a console error (everything seems to work fine without it):
		// core.js:1449 ERROR Error: Uncaught (in promise): TypeError: Cannot read property 'geometry' of null
		// TypeError: Cannot read property 'geometry' of null
		//   at PlanePage.webpackJsonp.103.PlanePage.animate (plane.ts:69)
		this.sea.mesh.rotation.z += .002;
		this.renderer.render(this.scene, this.camera);
		window.requestAnimationFrame(() => this.animate());
	}

	createSky(){
		this.sky = new Sky();
		this.sky.mesh.position.y = -600;
		this.scene.add(this.sky.mesh);
	}

	createLights() {
		// A hemisphere light is a gradient colored light; 
		// the first parameter is the sky color, the second parameter is the ground color, 
		// the third parameter is the intensity of the light
		this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
		
		// A directional light shines from a specific direction. 
		// It acts like the sun, that means that all the rays produced are parallel. 
		this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
	
		// Set the direction of the light  
		this.shadowLight.position.set(150, 350, 350);
		
		// Allow shadow casting 
		this.shadowLight.castShadow = true;
	
		// define the visible area of the projected shadow
		this.shadowLight.shadow.camera.left = -400;
		this.shadowLight.shadow.camera.right = 400;
		this.shadowLight.shadow.camera.top = 400;
		this.shadowLight.shadow.camera.bottom = -400;
		this.shadowLight.shadow.camera.near = 1;
		this.shadowLight.shadow.camera.far = 1000;
	
		// define the resolution of the shadow; the higher the better, 
		// but also the more expensive and less performant
		this.shadowLight.shadow.mapSize.width = 2048;
		this.shadowLight.shadow.mapSize.height = 2048;

		let ambientLight = new THREE.AmbientLight(0xdc8874, .5);
		this.scene.add(ambientLight);
		
		// to activate the lights, just add them to the scene
		this.scene.add(this.hemisphereLight);  
		this.scene.add(this.shadowLight);
	}

	createBox() {
		const geometry = new THREE.BoxGeometry(200, 200, 200);
		const material = new THREE.MeshBasicMaterial({color: Colors.WHITE, wireframe: true});
		this.mesh = new THREE.Mesh(geometry, material); // create the cube
		this.scene.add(this.mesh);
	}

	createScene() {
		// Get the width and the height of the screen,
		// use them to set up the aspect ratio of the camera 
		// and the size of the renderer.
		this.HEIGHT = window.innerHeight;
		this.WIDTH = window.innerWidth;
	
		// Create the scene
		this.scene = new THREE.Scene();
	
		// Add a fog effect to the scene; same color as the
		// background color used in the style sheet
		this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
		
		// Create the camera
		this.aspectRatio = this.WIDTH / this.HEIGHT;
		this.fieldOfView = 60;
		this.nearPlane = 1;
		this.farPlane = 10000;
		this.camera = new THREE.PerspectiveCamera(
			this.fieldOfView,
			this.aspectRatio,
			this.nearPlane,
			this.farPlane
		);
		
		// Set the position of the camera
		this.camera.position.x = 0;
		this.camera.position.z = 200;
		this.camera.position.y = 100;
		
		// Create the renderer
		this.renderer = new THREE.WebGLRenderer({ 
			// Allow transparency to show the gradient background
			// we defined in the CSS
			alpha: true, 
	
			// Activate the anti-aliasing; this is less performant,
			// but, as our project is low-poly based, it should be fine :)
			antialias: true 
		});
	
		// Define the size of the renderer; in this case,
		// it will fill the entire screen
		this.renderer.setSize(this.WIDTH, this.HEIGHT);
		
		// Enable shadow rendering
		this.renderer.shadowMap.enabled = true;
		//this.createBox();
		this.createSea();
	}

	/**
	 * Listen to the screen: if the user resizes it
	 * we have to update the camera and the renderer size
 	 * @param event 
 	*/
	handleWindowResize(event) {
		console.log('event',event);
		// update height and width of the renderer and the camera
		this.HEIGHT = window.innerHeight;
		this.WIDTH = window.innerWidth;
		this.renderer.setSize(this.WIDTH, this.HEIGHT);
		this.camera.aspect = this.WIDTH / this.HEIGHT;
		this.camera.updateProjectionMatrix();
	}

	  createSea(){
		this.sea = new Sea();
		// push it a little bit at the bottom of the scene
		this.sea.mesh.position.y = -600;
		// add the mesh of the sea to the scene
		this.scene.add(this.sea.mesh);
	}

}
