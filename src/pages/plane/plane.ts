import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as THREE from 'three';

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
	@HostListener('window:resize', ['$event'])
	onResize(event) { }
	scene;
	camera; 
	fieldOfView;
	aspectRatio
	nearPlane;
	farPlane;
	HEIGHT;
	WIDTH;
	renderer = new THREE.WebGLRenderer();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad PlanePage');
  }


	ngAfterViewInit() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.container.nativeElement.appendChild(this.renderer.domElement);
		this.createScene();
	}

  handleWindowResize() {
		// update height and width of the renderer and the camera
		this.HEIGHT = window.innerHeight;
		this.WIDTH = window.innerWidth;
		this.renderer.setSize(this.WIDTH, this.HEIGHT);
		this.camera.aspect = this.WIDTH / this.HEIGHT;
		this.camera.updateProjectionMatrix();
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
		
		// Listen to the screen: if the user resizes it
		// we have to update the camera and the renderer size
		//window.addEventListener('resize', handleWindowResize, false);
    }

}
