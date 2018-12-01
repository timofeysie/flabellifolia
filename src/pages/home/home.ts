import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as THREE from 'three';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
	@ViewChild('rendererContainer') rendererContainer: ElementRef;
	@HostListener('window:resize', ['$event']) onesize(event) { this.handleWindowResize(event); }
	@HostListener('window:touchmove', ['$event']) onTouchMove(event) { this.handleOnTouchMove(event); }
		
	renderer = new THREE.WebGLRenderer();
	scene = null;
	camera = null;
	mesh = null;
	m_rotation_x: number;
	m_rotation_y: number;
	controls: any;
	HEIGHT;
	WIDTH;

	/**
	 *
	 * @param navCtrl 
	 */
	constructor(public navCtrl: NavController) {
		this.HEIGHT = window.innerHeight;
		this.WIDTH = window.innerWidth;
		
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.z = 1000;

		const geometry = new THREE.BoxGeometry(200, 200, 200);
		const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
		this.mesh = new THREE.Mesh(geometry, material); // create the cube

		this.scene.add(this.mesh);

		this.m_rotation_x = 0;
		this.m_rotation_y = 0;
	}

	handleOnTouchMove(event) {
		// here we are converting the mouse position value received 
		// to a normalized value varying between -1 and 1;
		// this is the formula for the horizontal axis:
		this.m_rotation_y = -1 - (event.targetTouches[0].clientX / this.WIDTH)*2;
		// for the vertical axis, we need to inverse the formula 
		// because the 2D y-axis goes the opposite direction of the 3D y-axis
		// changed 1 - (event...) to 1 + to make the vertical movements drag the cube correctly
		this.m_rotation_x = 1 + (event.targetTouches[0].clientY / this.HEIGHT)*2;
		this.animate();
	}
	
	handleWindowResize(event) {
		// update height and width of the renderer and the camera
		this.HEIGHT = window.innerHeight;
		this.WIDTH = window.innerWidth;
		this.renderer.setSize(this.WIDTH, this.HEIGHT);
		this.camera.aspect = this.WIDTH / this.HEIGHT;
		this.camera.updateProjectionMatrix();
	}

	swipe(event) {
		// console.log('swipe event',event.direction);
		// if (event.direction === 2) {
		// 	console.log('left');
		// 	this.m_rotation_y = -0.01;
		// } else if (event.direction === 4) {
		// 	console.log('right');
		// 	this.m_rotation_y = 0.01;
		// } else if (event.direction === 8) {
		// 	this.m_rotation_x = -0.1;
		// 	console.log('up');
		// } else if (event.direction === 16) {
		// 	console.log('down');
		// 	this.m_rotation_x = 0.01;
		// }
		// this.animate();
	}

	ngAfterViewInit() {
		this.renderer.setSize(this.WIDTH, this.HEIGHT);
		this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
		this.animate();
	}

	animate() {
		window.requestAnimationFrame(() => this.animate());
		this.mesh.rotation.x = this.m_rotation_x;
		this.mesh.rotation.y = this.m_rotation_y;
		this.renderer.render(this.scene, this.camera);
	}

}
