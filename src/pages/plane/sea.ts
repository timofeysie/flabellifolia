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
        // important: by merging vertices we ensure the continuity of the waves
        this.geom.mergeVertices();
        var l = this.geom.vertices.length; // get the vertices
        // create an array to store new data associated to each vertex
        this.waves = [];
        for (var i=0; i<l; i++){
            // get each vertex
            var v = this.geom.vertices[i];
            // store some data associated to it
            this.waves.push({y:v.y,
                x:v.x,
                z:v.z,
                // a random angle
                ang:Math.random()*Math.PI*2,
                // a random distance
                amp:5 + Math.random()*15,
                // a random speed between 0.016 and 0.048 radians / frame
                speed:0.016 + Math.random()*0.032
            });
        };
        var mat = new THREE.MeshPhongMaterial({
            color: 0x00FFFF,
            transparent:true,
            opacity:.8,
            //shading:THREE.FlatShading,
        });
        this.mesh = new THREE.Mesh(this.geom, mat);
        this.mesh.receiveShadow = true;
    }

    moveWaves() {
        // get the vertices
        var verts = this.mesh.geometry.vertices;
        var l = verts.length;
        
        for (var i=0; i<l; i++){
            var v = verts[i];
            
            // get the data associated to it
            var vprops = this.waves[i];
            
            // update the position of the vertex
            v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
            v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
    
            // increment the angle for the next frame
            vprops.ang += vprops.speed;
        }
    
    }
}
