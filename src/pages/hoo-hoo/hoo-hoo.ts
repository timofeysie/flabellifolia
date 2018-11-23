import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Power1, Bounce } from 'gsap/all';
import * as THREE from 'three';
import { Bird } from './bird';

/**
 * We must declare a generic variable called TweenMax or the project won’t compile.
 */
declare var TweenMax: any;

@Component({
  selector: 'hoo-hoo',
  templateUrl: 'hoo-hoo.html'
})
export class HooHooPage  implements OnInit {
	@HostListener('document:mousemove', ['$event']) 
	onMouseMove(event) {
		console.log('mouse move',event);
		this.mousePos = {x:event.clientX, y:event.clientY};
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		console.log("Width: " + event.target.innerWidth);
		this.HEIGHT = window.innerHeight;
		this.WIDTH = window.innerWidth;
		this.windowHalfX = this.WIDTH / 2;
		this.windowHalfY = this.HEIGHT / 2;
		this.renderer.setSize(this.WIDTH, this.HEIGHT);
		this.camera.aspect = this.WIDTH / this.HEIGHT;
		this.camera.updateProjectionMatrix();
	}
  	@ViewChild('mushroom') box: ElementRef;
  	selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  ngOnInit(): void {
    this.init();
this.createLights();
this.createFloor();
this.createBirds();
this.loop();
  }

  doIt(): void {
    TweenMax.fromTo(this.box.nativeElement, 2, {x: 20}, {x: 440, ease: Power1.easeOut});
    TweenMax.fromTo(this.box.nativeElement, 2, {y: 20}, {y: 440, ease: Bounce.easeOut});
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HooHooPage, {
      item: item
    });
  }


	//THREEJS RELATED VARIABLES 
	scene;
	camera;
	controls;
	fieldOfView;
	aspectRatio;
	nearPlane;
	farPlane;
	shadowLight;
	backLight;
	light;
	renderer;
	container;


	//SCENE
	floor; 
	bird1; 
	bird2;
	bird3;

	//SCREEN VARIABLES

	HEIGHT;
	WIDTH;
	windowHalfX;
	windowHalfY;
	mousePos = {x:0,y:0};


//INIT THREE JS, SCREEN AND MOUSE EVENTS

  init() {
	this.scene = new THREE.Scene();
	this.HEIGHT = window.innerHeight;
	this.WIDTH = window.innerWidth;
	this.aspectRatio = this.WIDTH / this.HEIGHT;
	this.fieldOfView = 60;
	this.nearPlane = 1;
	this.farPlane = 2000; 
	this.camera = new THREE.PerspectiveCamera(
	this.fieldOfView,
	this.aspectRatio,
	this.nearPlane,
	this.farPlane);
	this.camera.position.z = 1000;  
	this.camera.position.y = 300;
	this.camera.lookAt(new THREE.Vector3(0,0,0));    
	this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
	this.renderer.setPixelRatio(window.devicePixelRatio); 
	this.renderer.setSize(this.WIDTH, this.HEIGHT);
	this.renderer.shadowMapEnabled = true;

	this.container = document.getElementById('world');
	this.container.appendChild(this.renderer.domElement);

	this.windowHalfX = this.WIDTH / 2;
	this.windowHalfY = this.HEIGHT / 2;

	//window.addEventListener('resize', this.onWindowResize(), false);
	//document.addEventListener('mousemove', handleMouseMove, false);
	//document.addEventListener('touchstart', handleTouchStart, false);
	//document.addEventListener('touchend', handleTouchEnd, false);
	//.addEventListener('touchmove',this.handleTouchMove, false);
	/*
	controls = new THREE.OrbitControls( camera, renderer.domElement);
	//*/
	}

	handleTouchStart(event) {
		console.log('fhandleTouchStart',event);
	if (event.touches.length > 1) {
		event.preventDefault();
			this.mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
	}
	}

	handleTouchEnd(event) {
		console.log('handleTouchEnd',event);
		this.mousePos = {x:this.windowHalfX, y:this.windowHalfY};
	}

	handleTouchMove(event) {
		console.log('handleTouchMove',event);
		if (event.touches.length == 1) {
			event.preventDefault();
				this.mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
		}
	}

createLights() {
  this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)
  
  this.shadowLight = new THREE.DirectionalLight(0xffffff, .8);
  this.shadowLight.position.set(200, 200, 200);
  this.shadowLight.castShadow = true;
  this.shadowLight.shadowDarkness = .2;
 	
  this.backLight = new THREE.DirectionalLight(0xffffff, .4);
  this.backLight.position.set(-100, 200, 50);
  this.backLight.shadowDarkness = .1;
  this.backLight.castShadow = true;
 	
  this.scene.add(this.backLight);
  this.scene.add(this.light);
  this.scene.add(this.shadowLight);
}


 //*   
createFloor(){ 
  this.floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000), new THREE.MeshBasicMaterial({color: 0xe0dacd}));
  this.floor.rotation.x = -Math.PI/2;
  this.floor.position.y = -33;
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);
}

createBirds(){
  this.bird1 = new Bird();
  this.bird1.threegroup.position.x = 0;
  this.scene.add(this.bird1.threegroup);
  
  this.bird2 = new Bird();
  this.bird2.threegroup.position.x = -250;
  this.bird2.side = "right";
  this.bird2.threegroup.scale.set(.8,.8,.8);
  this.bird2.threegroup.position.y = -8;
  this.scene.add(this.bird2.threegroup);
  
  this.bird3 = new Bird();
  this.bird3.threegroup.position.x = 250;
  this.bird3.side = "left";
  this.bird3.threegroup.scale.set(.8,.8,.8);
  this.bird3.threegroup.position.y = -8;
  this.scene.add(this.bird3.threegroup);
}


loop(){
  var tempHA = (this.mousePos.x - this.windowHalfX)/200;
  var tempVA = (this.mousePos.y - this.windowHalfY)/200;
  var userHAngle = Math.min(Math.max(tempHA, -Math.PI/3), Math.PI/3);
  var userVAngle = Math.min(Math.max(tempVA, -Math.PI/3), Math.PI/3);
  this.bird1.look(userHAngle,userVAngle);
  
  if (this.bird1.hAngle < -Math.PI/5 && !this.bird2.intervalRunning){
    this.bird2.lookAway(true);
    this.bird2.intervalRunning = true;
    this.bird2.behaviourInterval = setInterval(function(){
      this.bird2.lookAway(false);
      }, 1500);
  }else if (this.bird1.hAngle > 0 && this.bird2.intervalRunning){
    this.bird2.stare();
    clearInterval(this.bird2.behaviourInterval);
    this.bird2.intervalRunning = false;

  }else if (this.bird1.hAngle > Math.PI/5 && !this.bird3.intervalRunning){
    this.bird3.lookAway(true);
    this.bird3.intervalRunning = true;
    this.bird3.behaviourInterval = setInterval(function(){
      this.bird3.lookAway(false);
    }, 1500);
  }else if (this.bird1.hAngle < 0 && this.bird3.intervalRunning){
    this.bird3.stare();
    clearInterval(this.bird3.behaviourInterval);
    this.bird3.intervalRunning = false;
  }
  
  this.bird2.look(this.bird2.shyAngles.h, this.bird2.shyAngles.v);
  this.bird2.bodyBird.material.color.setRGB(this.bird2.color.r,this.bird2.color.g,this.bird2.color.b);
  
  this.bird3.look(this.bird3.shyAngles.h, this.bird3.shyAngles.v);
  this.bird3.bodyBird.material.color.setRGB(this.bird3.color.r,this.bird3.color.g,this.bird3.color.b);
  
  this.render();
  //requestAnimationFrame(this.loop());
}

render(){
  //controls.update();
  this.renderer.render(this.scene, this.camera);
}



}
