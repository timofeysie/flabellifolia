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
        this.geom = new THREE.CylinderGeometry(600,600,1800,80,10);
        
        // rotate the geometry on the x axis
        this.geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        
        // create the material 
        var mat = new THREE.MeshPhongMaterial({
            color: 0x00FFFF,
            transparent:true,
            opacity:.5,
            //shading:FlatShading,
        });

        // To create an object in Three.js, we have to create a mesh 
        // which is a combination of a geometry and some material
        this.mesh = new THREE.Mesh(this.geom, mat);

        // Allow the sea to receive shadows
        this.mesh.receiveShadow = true; 
    }
}