import * as THREE from 'three';
//import { Colors } from './colors';

export class Sea {
    geom: any;
    mesh: any;
    /** Steps to create an obj:
     * create a geometry
     * create a material
     * pass them into a mesh
     * add the mesh to our scene
     */
    
    constructor() {
        // create the geometry (shape) of the cylinder;
        // the parameters are: 
        // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
        this.geom = new THREE.CylinderGeometry(600,600,800,40,10);
        
        // rotate the geometry on the x axis
        this.geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        
        // create the material 
        var mat = new THREE.MeshPhongMaterial({
            color: 0x68c3c0,
            transparent:true,
            opacity:.6,
            //shading:FlatShading,
        });

        let meshMaterial = new THREE.MeshPhongMaterial({color: 0x7777ff});

        // To create an object in Three.js, we have to create a mesh 
        // which is a combination of a geometry and some material
        this.mesh = new THREE.Mesh(this.geom, meshMaterial);

        // Allow the sea to receive shadows
        this.mesh.receiveShadow = true; 
    }
}