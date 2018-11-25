import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as THREE from 'three';
import { Sea } from './sea';
import { Sky } from './sky';
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
	renderer = new THREE.WebGLRenderer();
    scene = null;
    camera = null;
	mesh = null;
	sea: any;
	constructor(public navCtrl: NavController) {
		this.scene = new THREE.Scene();
	
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.z = 1000;
	
		const geometry = new THREE.BoxGeometry(200, 200, 200);
		const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
		this.mesh = new THREE.Mesh(geometry, material); // create the cube
	
		this.scene.add(this.mesh);
		this.createSea();
	}
	
	  ngAfterViewInit() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.container.nativeElement.appendChild(this.renderer.domElement);
		this.animate();
	  }

	  createSea(){
		this.sea = new Sea();
		// push it a little bit at the bottom of the scene
		this.sea.mesh.position.y = -600;
		// add the mesh of the sea to the scene
		this.scene.add(this.sea.mesh);
	}
	
	  animate() {
		window.requestAnimationFrame(() => this.animate());
		this.mesh.rotation.x += 0.01;
		this.mesh.rotation.y += 0.02;
		this.renderer.render(this.scene, this.camera);
	  }

}
