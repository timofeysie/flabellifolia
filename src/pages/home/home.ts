import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as THREE from 'three';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  // @ViewChild('rendererContainer') container: ElementRef;
  // renderer: any;
  // camera: any;
  // scene: any;
  // aLight: any;
  // dLight: any;

  @ViewChild('rendererContainer') rendererContainer: ElementRef;

    renderer = new THREE.WebGLRenderer();
    scene = null;
    camera = null;
    mesh = null;
  
  /**
   * [ts] Constructor implementation is missing. [2390]
   * constructor HomePage(navCtrl: NavController): HomePage (+1 overload)
   * @param navCtrl 
   */
  constructor(public navCtrl: NavController) {
    console.log('ctor');
    this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;

        const geometry = new THREE.BoxGeometry(200, 200, 200);
        const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);

        this.scene.add(this.mesh);
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

    
    // this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setPixelRatio( window.devicePixelRatio );
    // this.renderer.setSize( window.innerWidth, window.innerHeight );
    // //this.container.appendChild( this.renderer.domElement ); // [ts] Property 'appendChild' does not exist on type 'ElementRef'. [2339]
    // this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, .1, 1000 );
    // this.camera.position.set( 0, 1.2, 3 );
    // this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color( 0x9cd5ff );
    // this.aLight = new THREE.AmbientLight( 0x68503a );
    // this.scene.add( this.aLight );
    // this.dLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    // this.dLight.position.set( 1, 0.5, 1 );
    // this.scene.add( this.dLight );


    //window.addEventListener( 'resize', this.resize(), false );
    //this.renderer.setAnimationLoop( this.loop() );
  // }

//   //var container = document.getElementById( 'container' );

//   Carrot() {
//     THREE.Group.call( this );
//     // orange
//     var carrotPath = new THREE.Path();
//     carrotPath.quadraticCurveTo( 2, 3, 2.5, 15 );
//     carrotPath.quadraticCurveTo( 2.7, 18, 0, 18 );
//     var carrotPoints = carrotPath.getPoints();
//     var carrotGeo = new THREE.LatheGeometry( carrotPoints, 16 );
//     var carrotMat = new THREE.MeshToonMaterial({
//       color: 0xff7800,
//       shininess: 2,
//       skinning: true
//     });
//     var carrotMesh = new THREE.SkinnedMesh( carrotGeo, carrotMat );
//     carrotMesh.scale.setScalar( 0.1 );
//     //this.add( carrotMesh );
//     // skin weights
//     var segmentHeight = 2;
//     for ( var i = 0; i < carrotGeo.vertices.length; i ++ ) {
//       var vertex = carrotGeo.vertices[ i ];
//       var y = Math.max(vertex.y, 0.01);
//       var skinIndex = Math.floor( y / segmentHeight );
//       var skinWeight = ( y % segmentHeight ) / segmentHeight;
//       carrotGeo.skinIndices.push( new THREE.Vector4( skinIndex, skinIndex + 1, 0, 0 ) );
//       carrotGeo.skinWeights.push( new THREE.Vector4( 1 - skinWeight, skinWeight, 0, 0 ) );
//     }
//     // skeleton bones
//     var bones = this.bones = [];
//     var prevBone = new THREE.Bone();
//     bones.push( prevBone );
//     for ( var i = 0; i < 9; i++ ) {
//       var bone = new THREE.Bone();
//       bone.position.y = segmentHeight;
//       bones.push( bone );
//       prevBone.add( bone );
//       prevBone = bone;
//     }
//     var skeleton = new THREE.Skeleton( bones );
//     carrotMesh.add( bones[ 0 ] );
//     carrotMesh.bind( skeleton );

//     let skeletonHelper = new THREE.SkeletonHelper( carrotMesh );
//     this.scene.add( skeletonHelper );
//     skeletonHelper.visible = false;
//     skeletonHelper = skeletonHelper;
    
//     // stem

//     var stemGroup = new THREE.Group();
//     bones[ bones.length - 1 ].add( stemGroup );

//     var stemPath = new THREE.Path();
//     stemPath.quadraticCurveTo( 1, 2, 0, 6 );
//     var stemPoints = stemPath.getPoints()

//     var stemGeo = new THREE.LatheBufferGeometry( stemPoints, 16 );
//     var stemMat = new THREE.MeshToonMaterial({
//       color: 0x049e00,
//       shininess: 2
//     });

//     var stem = new THREE.Mesh( stemGeo, stemMat );
//     stemGroup.add( stem );

//     var stem2 = stem.clone();
//     stem2.rotation.x = Math.PI / 7;
//     stemGroup.add( stem2 );

//     var stem3 = stem.clone();
//     stem3.rotation.z = Math.PI / 6;
//     stem3.rotation.x = - Math.PI / 8;
//     stemGroup.add( stem3 );

//     var stem4 = stem.clone();
//     stem4.rotation.z = -Math.PI / 6;
//     stem4.rotation.x = - Math.PI / 8;
//     stemGroup.add( stem4 );

//     // eyes
    
//     var eyeGeo = new THREE.SphereBufferGeometry(0.5);
//     var eyeMat = new THREE.MeshToonMaterial({
//       color: 0xffffff
//     });

//     var eyeR = new THREE.Mesh( eyeGeo, eyeMat );
//     eyeR.position.z = 2.2;
//     eyeR.position.x = -0.8;
//     eyeR.scale.y = 1.5;

//     var pupilMat = new THREE.MeshToonMaterial({
//       color: 0x444444,
//       shininess: 100,
//       specular: 0xffffff
//     });

//     var pupil = new THREE.Mesh( eyeGeo, pupilMat );
//     pupil.scale.setScalar(0.6);
//     pupil.position.z = .3;
//     eyeR.add( pupil );

//     var eyeL = eyeR.clone();
//     eyeL.position.x = 1;

//     bones[7].add( eyeL, eyeR );
    
//     // mouth

//     var mouthShape = new THREE.Shape();
//     mouthShape.moveTo( -4, 0 );
//     mouthShape.quadraticCurveTo( 0, -1, 4, 0 );
//     mouthShape.quadraticCurveTo( 3.5, -3, 0, -3 );
//     mouthShape.quadraticCurveTo( -3.5, -3, -4, 0 );
//     var mouthGeo = new THREE.ShapeBufferGeometry( mouthShape );
//     var mouthMat = new THREE.MeshBasicMaterial({ color: 0x5e2f00 });
//     var mouth = new THREE.Mesh( mouthGeo, mouthMat );
//     mouth.scale.setScalar( 0.4 )
//     mouth.position.z = 2.4;
//     bones[6].add( mouth );
//   }

// this.Carrot.prototype = Object.create( THREE.Group.prototype );
// Carrot.prototype.constructor = Carrot;

// Carrot.prototype.updateRotation = function( rotation ) {

// 	var bones = this.bones;

// 	for (var i = 0; i < bones.length; i++) {
// 		bones[i].rotation.z = rotation;
// 	}

// };

// Carrot.prototype.updatePosition = function( position ) {

// 	var bones = this.bones;

// 	for (var i = 1; i < bones.length; i++) {
// 		bones[i].position.y = position;
// 	}

// 	bones[0].scale.x = 2 / position * 2 / position;
// 	bones[0].scale.z = 2 / position * 2 / position;

// };

// // ----------------------------------------------------------------

// var carrot = new Carrot();
// scene.add( carrot );

// var mouse = new THREE.Vector2();

// renderer.domElement.addEventListener('mousemove', mousemove, false);
// function mousemove(e){
// 	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

// 	carrot.updateRotation( - mouse.x * Math.PI / 32 );
// 	carrot.updatePosition( mouse.y * 0.4 + 2 );
// }

// var target = { y: 2 * Math.PI };

// var tween = new TWEEN.Tween( carrot.rotation )
// 	.to( target, 500 )
// 	.easing( TWEEN.Easing.Quadratic.InOut )
// 	.onComplete(function(){
// 		carrot.rotation.y = 0;
// 	});

// renderer.domElement.addEventListener('mousedown', mousedown, false);
// function mousedown(){

// 	if ( !tween.isPlaying() ) {

// 		var dir = Math.random() < 0.5 ? -1 : 1;
// 		target.y *= dir;
// 		tween.to( target );

// 		tween.start();
// 	}

// }

// // ---------------------------------------------------------------


// resize() {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// }

// renderer.setAnimationLoop( loop );

// loop() {

// 	TWEEN.update();
	
// 	renderer.render( scene, camera );

// }

}
