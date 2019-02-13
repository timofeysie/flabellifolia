import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as THREE from 'three';

/**
 * Generated class for the FlipBoxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flip-box',
  templateUrl: 'flip-box.html',
})
export class FlipBoxPage {
    @ViewChild('rendererContainer') rendererContainer: ElementRef;
	@HostListener('window:resize', ['$event']) onesize(event) { this.handleWindowResize(event); }
	@HostListener('window:touchmove', ['$event']) onTouchMove(event) { this.handleOnTouchMove(event); }
		
    container
    stats;
    camera;
    scene: any;
    renderer = new THREE.WebGLRenderer();
    cube;
    plane;
    targetRotationX = 0.5;
    targetRotationOnMouseDownX = 0;
    targetRotationY = 0.2;
    targetRotationOnMouseDownY = 0;
    mouseX = 0;
    mouseXOnMouseDown = 0;
    mouseY = 0;
    mouseYOnMouseDown = 0;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    slowingFactor = 0.25;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.init();
        this.animate();
    }

    ngAfterViewInit() {
		this.renderer.setSize(this.windowHalfX, this.windowHalfY);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        //this.stats.domElement.style.position = 'absolute';
        //this.stats.domElement.style.top = '0px';
        //this.container.appendChild( this.stats.domElement );
        this.animate();           
	}

    handleWindowResize(event) {
		// update height and width of the renderer and the camera
		this.windowHalfY = window.innerHeight; // height
		this.windowHalfX = window.innerWidth; // width
		this.renderer.setSize(this.windowHalfX, this.windowHalfY);
		this.camera.aspect = this.windowHalfX / this.windowHalfY;
		this.camera.updateProjectionMatrix();
	}

    init() {
        this.windowHalfY = window.innerHeight;
		this.windowHalfX = window.innerWidth;
        //container = document.createElement( 'div' );
        //document.body.appendChild( container );
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.y = 150;
        this.camera.position.z = 500;
        this.scene.add( this.camera );
        let materials = [];
        for ( let i = 0; i < 6; i ++ ) {
            materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
        }

        this.cube = new THREE.Mesh(  new THREE.BoxGeometry( 200, 200, 200 ) , new THREE.MeshFaceMaterial(materials) );
        this.cube.position.y = 150;
        this.cube.overdraw = true;
        this.scene.add( this.cube );    

        this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
        this.plane.rotation.x = - 90 * ( Math.PI / 180 );
        this.plane.overdraw = true;

        this.renderer = new THREE.WebGLRenderer();
        //this.renderer.setSize( window.innerWidth, window.innerHeight );
        //this.container.appendChild( this.renderer.domElement );
        // this.stats.domElement.style.position = 'absolute';
        // this.stats.domElement.style.top = '0px';
        // this.container.appendChild( this.stats.domElement );
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FlipBoxPage');
    }

    handleOnTouchMove(event) {
    }

    onDocumentMouseDown( event ) {
        event.preventDefault();
        this.mouseXOnMouseDown = event.clientX - this.windowHalfX;
        this.targetRotationOnMouseDownX = this.targetRotationX;
        this.mouseYOnMouseDown = event.clientY - this.windowHalfY;
        this.targetRotationOnMouseDownY = this.targetRotationY;
    }

     onDocumentMouseMove( event ) {
        this.mouseX = event.clientX - this.windowHalfX;
        this.targetRotationX = ( this.mouseX - this.mouseXOnMouseDown ) * 0.00025;
        this.mouseY = event.clientY - this.windowHalfY;
        this.targetRotationY = ( this.mouseY - this.mouseYOnMouseDown ) * 0.00025;
    }

     onDocumentMouseUp( event ) {
    //     document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    //     document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
    }

    onDocumentMouseOut( event ) {
    //     document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    //     document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    //     document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
    }


     animate1() {
        requestAnimationFrame( this.animate );
        this.render();
        //this.stats.update();
    }

    animate() {
		window.requestAnimationFrame(() => this.animate());
		this.renderer.render(this.scene, this.camera);
	}

    render() {
        this.rotateAroundWorldAxis(this.cube, new THREE.Vector3(0, 1, 0), this.targetRotationX);
        this.rotateAroundWorldAxis(this.cube, new THREE.Vector3(1, 0, 0), this.targetRotationY);
        this.targetRotationY = this.targetRotationY * (1 - this.slowingFactor);
        this.targetRotationX = this.targetRotationX * (1 - this.slowingFactor);
        this.renderer.render( this.scene, this.camera );
    }

     rotateAroundObjectAxis(object, axis, radians) {
        var rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationAxis(axis.normalize(), radians);
        object.matrix.multiply(rotationMatrix);
        object.rotation.setFromRotationMatrix( object.matrix );
    }

    rotateAroundWorldAxis( object, axis, radians ) {
        var rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationAxis( axis.normalize(), radians );
        rotationMatrix.multiply( object.matrix );                       // pre-multiply
        object.matrix = rotationMatrix;
        object.rotation.setFromRotationMatrix( object.matrix );
    }

}
