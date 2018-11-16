import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as THREE from 'three';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = null;
    camera = null;
    mesh = null;
  
  /**
   *
   * @param navCtrl 
   */
  constructor(public navCtrl: NavController) {
    this.scene = new THREE.Scene();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
        
    // from the carrot demo
    // this.container.appendChild( this.renderer.domElement ); // [ts] Property 'appendChild' does not exist on type 'ElementRef'. [2339]
    // this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .1, 1000 );
    // this.camera.position.set( 0, 1.2, 3 );
    // this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color( 0x9cd5ff );
    // this.aLight = new THREE.AmbientLight( 0x68503a );
    // this.scene.add( this.aLight );
    // this.dLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    // this.dLight.position.set( 1, 0.5, 1 );
    // this.scene.add( this.dLight );
  }

  ngAfterViewInit() {
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }

}
