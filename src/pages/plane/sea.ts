import * as THREE from 'three';
//import { Colors } from './colors';

export class Sea {
    geom: any;
    mesh: any;
    waves: any;
    /** Steps to create an obj:
     * create a geometry
     * create a material
     * pass them into a mesh
     * add the mesh to our scene
     */

    constructor() {
        // create the geometry (shape) of the cylinder;
        // the parameters are: 
        // radius top,                       600
        // radius bottom,                    600
        // height,                           800
        // number of segments on the radius,  40
        // number of segments vertically      10
        this.geom = new THREE.CylinderGeometry(700,600,800,60,10);
        //var geom = new THREE.CylinderGeometry(600,600,800,40,10);
        this.geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        this.geom.mergeVertices(); // by merging vertices we ensure the continuity of the waves
        var l = this.geom.vertices.length; // get the vertices
        // create an array to store new data associated to each vertex
        this.waves = [];
        for (var i=0; i<l; i++){
            var v = this.geom.vertices[i]; // get each vertex & store some data associated to it
            this.waves.push({y:v.y,
                x:v.x,
                z:v.z,
                ang:Math.random()*Math.PI*2, // a random angle
                amp:5 + Math.random()*15, // a random distance
                speed:0.016 + Math.random()*0.032 // a random speed between 0.016 and 0.048 radians/frame
            });
        };
        var mat = new THREE.MeshPhongMaterial({
            color: 0x00FFFF,
            transparent:true,
            opacity:.8,
            //shading:THREE.FlatShading, // Argument of type ... is not assignable to ...
            // Object literal may only specify known properties, and 
            // 'shading' does not exist in type 'MeshPhongMaterialParameters'. [2345]
        });
        this.mesh = new THREE.Mesh(this.geom, mat);
        this.mesh.receiveShadow = true;
    }

    moveWaves() {
        var verts = this.mesh.geometry.vertices; // get the vertices
        var l = verts.length;
        for (var i=0; i<l; i++){
            var v = verts[i];
            var vprops = this.waves[i]; // get data associated to it & update the position
            v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
            v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
            vprops.ang += vprops.speed; // increment the angle for the next frame
        }
    }
}
