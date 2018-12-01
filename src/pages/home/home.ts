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
	/**
	 *
	 * @param navCtrl 
	 */
	constructor(public navCtrl: NavController) {
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
		//console.log('handleOnTouchMove',event);
		//this.swipe(event);
	}
	
	handleWindowResize(event) {
		this.swipe(event);
		console.log('handleWindowResize',event);
	}

	swipe(event) {
		console.log('swipe event',event.direction);
		if (event.direction === 2) {
			console.log('left');
			this.m_rotation_y = -0.01;
		} else if (event.direction === 4) {
			console.log('right');
			this.m_rotation_y = 0.01;
		} else if (event.direction === 8) {
			this.m_rotation_x = -0.1;
			console.log('up');
		} else if (event.direction === 16) {
			console.log('down');
			this.m_rotation_x = 0.01;
		}
		this.animate();
	}

	ngAfterViewInit() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
		this.animate();
	}

	animate() {
		window.requestAnimationFrame(() => this.animate());
		this.mesh.rotation.x += this.m_rotation_x;
		this.mesh.rotation.y += this.m_rotation_y;
		this.renderer.render(this.scene, this.camera);
	}

}
