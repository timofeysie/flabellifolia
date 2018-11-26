import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as THREE from 'three';

/**
 * Generated class for the OceanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ocean',
  templateUrl: 'ocean.html',
})
export class OceanPage {
  @ViewChild('rendererContainer') container: ElementRef;
  _renderer; 
    _scene; 
    _camera; 
    _controls;
    _geometry;
    _shader; 
    _mesh;
    vertexShader;
    fragmentShader;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vertexShader = `
#define SCALE 10.0
varying vec2 vUv;
uniform float uTime;
float calculateSurface(float x, float z) {
    float y = 0.0;
    y += (sin(x * 1.0 / SCALE + uTime * 1.0) + sin(x * 2.3 / SCALE + uTime * 1.5) + sin(x * 3.3 / SCALE + uTime * 0.4)) / 3.0;
    y += (sin(z * 0.2 / SCALE + uTime * 1.8) + sin(z * 1.8 / SCALE + uTime * 1.8) + sin(z * 2.8 / SCALE + uTime * 0.8)) / 3.0;
    return y;
}
void main() {
    vUv = uv;
    vec3 pos = position;
    float strength = 1.0;
    pos.y += strength * calculateSurface(pos.x, pos.z);
    pos.y -= strength * calculateSurface(0.0, 0.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}  
`;
    
  this.fragmentShader = `
varying vec2 vUv;
uniform sampler2D uMap;
uniform float uTime;
uniform vec3 uColor;
void main() {
    vec2 uv = vUv * 10.0 + vec2(uTime * -0.05);

    uv.y += 0.01 * (sin(uv.x * 3.5 + uTime * 0.35) + sin(uv.x * 4.8 + uTime * 1.05) + sin(uv.x * 7.3 + uTime * 0.45)) / 3.0;
    uv.x += 0.12 * (sin(uv.y * 4.0 + uTime * 0.5) + sin(uv.y * 6.8 + uTime * 0.75) + sin(uv.y * 11.3 + uTime * 0.2)) / 3.0;
    uv.y += 0.12 * (sin(uv.x * 4.2 + uTime * 0.64) + sin(uv.x * 6.3 + uTime * 1.65) + sin(uv.x * 8.2 + uTime * 0.45)) / 3.0;

    vec4 tex1 = texture2D(uMap, uv * 1.0);
    vec4 tex2 = texture2D(uMap, uv * 1.0 + vec2(0.2));

    vec3 blue = uColor;

    gl_FragColor = vec4(blue + vec3(tex1.a * 0.9 - tex2.a * 0.02), 1.0);
}
`;
      this.initWorld();
      this.initScene();
    }
    
    ngAfterViewInit() {
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.nativeElement.appendChild(this._renderer.domElement);
    }
    
    //=====// World //========================================//     
        
    initWorld() {
      this._renderer = new THREE.WebGLRenderer();
      this._renderer.setPixelRatio(2);
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      this._renderer.setClearColor(0xffffff);
      this._renderer.setSize(window.innerWidth, window.innerHeight);

        
        this._scene = new THREE.Scene();
        
        this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);        
        this._camera.position.set(-20, 10, 21);
        this._camera.target = new THREE.Vector3(0, -5, 0);
        this._camera.lookAt(this._camera.target);

        this._controls = new THREE.OrbitControls(this._camera);
        this._controls.target = this._camera.target;
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.1;
        this._controls.rotateSpeed = 0.1;
        
        window.addEventListener('resize', this.resize, false);
        this.resize();
        requestAnimationFrame(this.render);
    }

    resize() {
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
    }

    render() {
        requestAnimationFrame(this.render);
        if (this._controls) this._controls.update();
        this._renderer.render(this._scene, this._camera);
    }
    
    //=====// Scene //========================================//     
    
    initScene() {
      this.initGeometry();
      this.initShader();
        this.initMesh();
        requestAnimationFrame(this.loop);
    }

    initGeometry() {
      this._geometry = new THREE.PlaneBufferGeometry(50, 50, 20, 20);
      this._geometry.rotateX(-Math.PI / 2);
    }

    initShader() {
        var uniforms = {
            uMap: {type: 't', value: null},
            uTime: {type: 'f', value: 0},
            uColor: {type: 'f', value: new THREE.Color('#0051da')},
        };

        this._shader = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            side: THREE.DoubleSide,
        });

        var textureLoader = new THREE.TextureLoader();
        textureLoader.load('https://cinemont.com/tutorials/zelda/water.png', function (texture) {
          this._shader.uniforms.uMap.value = texture;
           // texture.wrapS = texture.wrapT = THREE.REPEAT_WRAPPING;
        });
    }

    initMesh() {
      this._mesh = new THREE.Mesh(this._geometry, this._shader);
        this._scene.add(this._mesh);
    }

    loop(e) {
        requestAnimationFrame(this.loop);
        this._shader.uniforms.uTime.value = e * 0.001;
    }

  ionViewDidLoad() {
    //this._renderer.setSize(window.innerWidth, window.innerHeight);
    //this.container.nativeElement.appendChild(this._renderer.domElement);
  }

}
