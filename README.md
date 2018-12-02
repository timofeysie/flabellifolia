# flabellifolia

The project was started with Angular 5 and Ionic 3 integrated with [Three.js](https://threejs.org/),an animated 3D graphics using WebGL, and [GreenSock](https://greensock.com/) which is a high-performance, professional-grade animation library.

The blang solution to installing and using [Three.js with Angular](https://stackoverflow.com/questions/40273300/angular-cli-threejs) created the spinning cube demo.  This shows how to set up Three.js using the cube demo from the three.js.org website example page with Angular instead of vanilla JavaScript.

The GreenSock demo was created from the [Matteo - Frag - Crosta](https://medium.com/@mr.frag85/using-gsap-with-angular-6-project-it-works-on-prod-too-9ac036f21487).

See the respective sections below to solve the issues that came up during the basic setup of Three.js and GreenSock.

Tried to implement the [paranoid birds](https://codepen.io/Yakudoo/pen/LVyJXw) demo failed. It's now on its own branch now.
Currently following [this tutorial](https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/) by [Karim Maaloul](https://codepen.io/Yakudoo/).  This should provide the solutions to the issues that came up trying to implement something more ambitious like the paranoid birds.




#

## Table of Contents

1. [Capacitor workflow](#capacitor-workflow)
1. [Making the cube demo respond to clicking, swiping and dragging](#)
1. [Not part of core](#)
1. [3d Model Importing & Other Resources](#3d-Model-Importing-&-Other-Resources)
1. [The Plane demo](#the-Plane-demo)
1. [The Paranoid Birds demo](#the-Paranoid-Birds-demo)
1. [Setting up Three.js](#setting-up-Three.js)
1. [Setting up GreenSock](#setting-up-GreenSock)
1. [Starting the project](#starting-the-project)


#


## Capacitor workflow
The project uses [Capacitor](https://capacitor.ionicframework.com/) to build and deploy the app.  These are the basic workflow commands:
```
ionic build
npx cap copy
npx cap open
```

## The Owl and the flashlight

Starting out implementing the GreenSock demo [flashlight 🔦 effect at haunted house](https://codepen.io/slyka85/pen/gQMzdJ) by [Anya Melnyk](https://codepen.io/slyka85/).

The svg credit for the scene goes to [Freepik] (https://www.freepik.com/free-vector/halloween-background-design-with-haunted-house-and-cemetery_3214325.htm).

After setting up a best guess of an Angular version of the pen, here is the first error:
```
Error: Uncaught (in promise): Error: Cannot tween a null target.
Error: Cannot tween a null target.
    at viewWrappedDebugError (http://localhost:8100/build/vendor.js:10180:15)
```
OK, that was because the HostListener element is not available in the constructor.  The SVG is OK, but the dark layer doesn't settle in.  Also, on mouse drag, we get this error:
```
ERROR TypeError: Cannot read property 'left' of undefined
```

Same cause of the one above.  Not sure what this is doing:
```
this.parentOffset = this.flashlight.nativeElement.parent().offset(); 
```

From the original handleMouseMove function:
```
    let parentOffset = flashLight.parent().offset(); 
    let cursorX = (Modernizr.touch ? e.changedTouches[0].clientX : e.clientX) - parentOffset.left;
```

We don't use [Modernizr](https://modernizr.com/) now that we evergreen browsers.  Modernizr is a lib to detect features in browsers and lets JavaScript avoid using unimplemented features or use a workaround such as a shim to emulate them.  Its initial release date is 1 July 2009, the very beginning of the current era of front end development.  NodeJS had just been release a few months earlier on the back of V8 the JavaScript engine that propelled JavaScript into a formidable language.

Still, when people choose names, they should avoid ones that will sound dated.  Like 'Modern Art' (another unfortunate name like 'New Town') which is a period extending roughly from the 1860s to the 1970s.  I bet they wont be calling it Modern Art a few hundred years from now.  Unless they wanted Modernizr to serve its purpose and then die, in which case, that's fine.

Rant over, the next error is:
```
TypeError: this.flashlight.nativeElement.parent is not a function
    at OwlPage.webpackJsonp.201.OwlPage.ngAfterViewInit (owl.ts:37)
```

The native element is the div with the #flashlight hook, and it's parent of course if the div with the container class:
```
<div class="container">
    <svg viewBox="0 0 753.6 500.2">
    ...
    </svg>
<div class="dark-layer" #flashlight></div>
```

The activity that we need to support is first showing the full image, then transitioning the flashlight layer to black/fully opaque, then showing the flashlight which is like a hole thru that to imitate a flashlight in the darkness.  We should be able to re-create that using first of all an Angular animation, and then fixing the radial-gradient to create the flashlight effect.

The third feature to support is making the owl slightly larger to pop out when the flashlight centers on it.  This is the part the daughter loves the most.

We don't really need tween max to do this kind of thing.  I'm sure tween max was a good solution before the Web Animations API support.  Especially with Angular which uses the standard, simple transitions don't need any extra libraries.  A simple CSS transition will do.  React has various animation libs available.  With React you need a lib to blow your nose.  The most popular animation lib is based on the old AngularJS animations which are years out of date now.  But that's what you get for having such a severely segmented front end solution.

Anyhow, rant over, GreenSock still has a place in front end development with gravity and bouncing (as seen in the mushroom demo) and other animation techniques that the web animation API doesn't support.  We just don't need those features for this page.

So implementing Angular animations can be accomplished by [reading the docs](https://angular.io/guide/animations).  IN brief, you wire BrowserAnimationsModule into the app.module imports array, add the specific animation parts you want to use in the class.  In our case we use:
```
import { trigger, state, style, animate, transition } from '@angular/animations';
```

Then add the animation to the @Component decorator:
```
  animations: [ trigger('stateOpacity', [
      state('false', style({ opacity: '0' })),
      state('true',  style({ opacity: '1' })),
      transition('0 => 1', animate('1200ms ease'))])]
```  

Then we add the hook onto the div we want to transition:
```
[@stateOpacity]="transitionOpacity" 
```

And turn that transitionOpacity to true in the init function, and we have our fade to black.

Next up, the spotlight.  The tween max approach from the demo is like this:
```
TweenMax.set(this.flashlight, {
  background:`
    radial-gradient(circle at ${this.cursorX}px ${this.cursorX}px, 
    transparent 0, 
    rgba(0,0,0,0.3) 2vw, 
    rgba(0,0,0,0.5) 3vw, 
    rgba(0,0,0,0.7) 4vw, 
    rgba(0,0,0,0.85) 7vw, 
    rgba(0,0,0,0.95) 15vw )
  `
});
```

I think we want to use touch move again for this.  Since it will be on a device, the user should be able to drag around the spotlight.  There are no mouse-overs on mobile after all.

So we first get the x and y in the drag function, then use the native element to set the style shown above.

I've never used radial-gradient before, so the first attempt:
```
	handleOnTouchMove(event) {
		this.cursorX = event.changedTouches[0].clientX;
		this.cursorY = event.changedTouches[0].clientY;
		let bg = `(radial-gradient: (circle at ${this.cursorX}px ${this.cursorX}px, transparent 0, rgba(0,0,0,0.3) 2vw, rgba(0,0,0,0.5) 3vw, rgba(0,0,0,0.7) 4vw, rgba(0,0,0,0.85) 7vw, rgba(0,0,0,0.95) 15vw )`; 
		this.renderer.setStyle(this.flashlight.nativeElement, 'background', bg);
	}
```

Gives this SASS error:
```
Invalid CSS after "..., transparent 0": expected ":", was ", rgba(0,0,0,0.3) 2"
src/pages/owl/owl.scss
  pointer-events: none;
  background: (radial-gradient: circle at 50px 50px, transparent 0, rgba(0,0,0,0.3) 2vw, rgba(0,0,0,0.5) 3vw, rgba(0,0,0,0.7) 4vw, rgba(0,0,0,0.85) 7vw, rgba(0,0,0,0.95) 15vw );
}
```

Thats from the owl.scss file where we want to create a default flashlight effect before the user tries to touch the screen to drag it around.  If we add ```transparent: 0``` then the same error moves to the next part.  This is obviously a difference between how tween max sets styles, and CSS/SCSS does.

Had the formatting a little off.  This works for our default spotlight:
```
background: 
    radial-gradient(circle at 50px 50px, 
    transparent 0,
    rgba(0,0,0,0.3) 2vw,
    rgba(0,0,0,0.5) 3vw,
    rgba(0,0,0,0.7) 4vw,
    rgba(0,0,0,0.85) 7vw,
    rgba(0,0,0,0.95) 15vw )
```


## Making the cube demo respond to clicking, swiping and dragging

The event used in other pages to listen to DOM events would be something like:
```
	@HostListener('window:resize', ['$event'])
	onResize(event) { ... code from the tutorial ... }
```

The touch event would look similar:
```
@HostListener('window:touchmove', ['$event']) onTouchMove(event) { this.handleOnTouchMove(event); }
```		

However, only the window resize event works. The Ionic way to get gestures would looke like this:
```
  <div #rendererContainer
    (swipe)="swipe($event)"
    class="sexy"></div>
```

This does work and returns an extensive object like this:
```
angle: -165.9253545408312
center: {x: 262, y: 264}
changedPointers: [PointerEvent]
deltaTime: 578
deltaX: -351
deltaY: -88
direction: 8
distance: 361.86323383289437
eventType: 4
isFinal: true
isFirst: false
maxPointers: 1
offsetDirection: 2
overallVelocity: -0.6072664359861591
overallVelocityX: -0.6072664359861591
overallVelocityY: -0.1522491349480969
pointerType: "mouse"
pointers: []
preventDefault: ƒ ()
rotation: 0
scale: 1
srcEvent: PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
target: canvas
timeStamp: 1543606460385
type: "swipe"
velocity: -0.008620689655172414
velocityX: 0
velocityY: -0.008620689655172414
```

This could be really useful to move something around in a naturalistic manner.  The actual direction and the velocity, angle, distance could all influence the way the cube rotates.

Or we could just use the basic direction shown above as 8.  What is 8?
```
DIRECTION_NONE         1
DIRECTION_LEFT         2
DIRECTION_RIGHT        4
DIRECTION_UP           8
DIRECTION_DOWN         16
DIRECTION_HORIZONTAL   6
DIRECTION_VERTICAL     24
DIRECTION_ALL          30
```

Now the big question: is is the object that moves, or the camera?  Have to ask the promised one (from The Matrix).  In one example that rotates the boat, they do this:
```
var controls = new THREE.OrbitControls( camera );
```

All the examples seem to show the camera moving, not the object.  Since this is a learning exercise, lets start with that then.

Or not.  Remember the problem with OrbitControls?
```
Error: Uncaught (in promise): TypeError: __WEBPACK_IMPORTED_MODULE_2_three__.OrbitControls is not a constructor
TypeError: __WEBPACK_IMPORTED_MODULE_2_three__.OrbitControls is not a constructor
    at new HomePage (http://localhost:8100/build/main.js:483:25)
    at createClass (http://localhost:8100/build/vendor.js:12855:20)
```

Looking at the docs for the object3d.rotation, it is a Euler object.
Looking at the docs for the Euler object, there is an example like this:
```
let a = new THREE.Euler(0,1,1.57, 'XYZ');
let b = new THREE.Vector3(1,0,1);
b.applyEuler(a);
```

Assuming b is our new object.  If we do this:
```
this.mesh.applyEuler(a);
```

We get this error:
```
core.js:1449 ERROR Error: Uncaught (in promise): TypeError: this.mesh.applyEuler is not a function
TypeError: this.mesh.applyEuler is not a function
```

So going with what works, we can use the swipe event to modify the offset variables and we can rotate the cube left, right, up and down.  Up and down don't seem easy to trigger the swipe.  Using the browser emulation mode, the handleOnTouchMove function gets called.  Have to try it all out on a device.

The event is a huge object.  This looks like the useful part of it:
```
targetTouches: TouchList
0: Touch
clientX: 57.8369140625
clientY: 367.6318359375
force: 1
identifier: 0
pageX: 57.8369140625
pageY: 367.6318359375
radiusX: 14.375
radiusY: 14.375
rotationAngle: 0
screenX: 247.26953125
screenY: 495.10546875
```

Since the swipe event is not really going to provide fine grained enough input, we should probably move on to using that.  Using handleOnTouchMove along with the formula in the plane demo to convert the mouse position value received to a normalized value varying between -1 and 1 worked well.  We did have to reverse the x and y values, and reverse the +/- operators used in the formula.  But now we have a dragable cube that works in any direction.

We might want to re-instate the drifting cube spin and combine that with the drag to set the direction the spin continues at.  Or we could move on to something else.  Turns out to be something else.  The daughter's fav: the owl flashlight!


## Not part of core

[This answer](https://discourse.threejs.org/t/orbitcontrols-issue-with-angular-6/5092) from the Three.js forum gives a hint of how to solve the orbital error.  The answer says *OrbitControls is no part of the core. You have to transform the class into a module and import it separately.*  

So there we go.  That means modifying the library in node_modules or somewhere else and make the same changes each time it is upgraded.  This would also rule out running the app as an Angular site that gets built on the server.

The error in questions:
```
TypeError: three__WEBPACK_IMPORTED_MODULE_1__.OrbitControls is not a constructor
```

Another thing [about OrbitControls](https://stackoverflow.com/questions/39441654/three-js-rotate-cube-using-your-mouse) says *You need to set camera.position.z larger than zero. That's why you can't use OrbitControls.*


The code that caused this error is on another branch now.

[This example](https://github.com/mrdoob/three.js/blob/master/examples/models/gcode/benchy.gcode) has a small tugboat that could be modified to be our ferryboat.



## 3d Model Importing & Other Resources

The [Three.js docs](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models) recommend using glTF (GL Transmission Format). Both .GLB and .GLTF versions of the format are well supported.

A few loaders (ObjectLoader and JSONLoader) are included by default.  The bad news is that currently three.js examples are not available as ES modules (import … from '…'). Several workarounds are discussed in #9562.  This [issue link](https://github.com/KhronosGroup/glTF/issues/9562) leads to a 404 error on GitHub.  How old are the docs that we are looking at?

The docs show two methods for loading the loaders libs:
```
// global script
<script src="GLTFLoader.js"></script>

// commonjs
var THREE = window.THREE = require('three');
require('three/examples/js/loaders/GLTFLoader');

var loader = new THREE.GLTFLoader();
loader.load( 'path/to/model.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );
```

The docs provide a list of possible tools that can export the glTF format:
```
glTF-Blender-Exporter by the Khronos Group - We like Blender!
COLLADA2GLTF by the Khronos Group - CLI COLLADA to glTF converter
FBX2GLTF by Facebook - CLI to convert of 3D model assets on the FBX file format to glTF.
OBJ2GLTF by Analytical Graphics Inc -CLI  tool to convert OBJ assets to glTF
Substance Painter by Allegorithmic - 30 day trial
Modo by Foundry - 30 day trial
Toolbag by Marmoset - 30 day trial
```

Three.js also has a link to [an online editor](https://threejs.org/editor/) which looks like it has all that we would need.

The Three.js [forum](https://discourse.threejs.org/) has some good activity.  Looking at [some examples](https://laustep.github.io/stlahblog/frames/threejs_index.html) created by Stéphane Laurent, a mathmetician, right now.  Math and art do not usually go together, but here they do.  Stéphane made a [tutorial](https://laustep.github.io/stlahblog/posts/threejsTorus.html) posted on June 26, 2018 on drawing a torus with three.js.

[Here](http://davidscottlyons.com/threejs-intro) is great intro to many of the concepts and math that are key to working with 3D and Three.js.


## The Plane demo

Following [this tutorial](https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/) by the great [Karim Maaloul](https://codepen.io/Yakudoo/).  Since we are using Ionic, we can run the following command to add a page to the app:
```
ionic g page plane
```

If this was just an Angular app, we could use the Angular CLI to do the same thing.  Ionic uses Angular out of the box, which means it uses TypeScript.  There are a few differences between using this set up as opposed to a standard HTML page with JavaScipt.  That's what this page is all about.  Discovering those differences and learning more about Three.js along the way.

We still need to add the page to the app.module in the usual way, and add it to the links that show up in the side menu in the app.component.ts file.

After adding the basic create scene, we are getting this error:
```
TypeError: Cannot read property 'appendChild' of null
```

That's because there is no container yet.  This should be the DOM element that contains the scene.

In Angular, similar to the spinning cube demo on the home page, we would have to do something like this:
```
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
...
export class PlanePage  implements AfterViewInit  {
  @ViewChild('container') container: ElementRef;
...
  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }
```

And in our template we use this to create the DOM element to hook into:
```
<div #container></div>
```

This will replace this code form the tutorial:
```
		// Add the DOM element of the renderer to the 
		// container we created in the HTML
		this.container = document.getElementById('world');
		this.container.appendChild(this.renderer.domElement);
```

If we weren't using a framework like Angular, that would be one way to set things up.

The next error we get is:
```
Error: Uncaught (in promise): TypeError: Cannot read property 'setSize' of undefined
TypeError: Cannot read property 'setSize' of undefined
```

This is because we haven't set up the renderer yet.  In the cube demo, we create the renderer like this:
```
renderer = new THREE.WebGLRenderer();
```

After this, there are no more errors and we get a rendered black square on our page.

Next we create our own handleWindowResize function.
```
	@HostListener('window:resize', ['$event'])
	onResize(event) { ... code from the tutorial ... }
```

For the first object discussed, we create a separate class and put all the work done there in the constructor.  We import that class in plane.ts and put the create sea function there.

Not sure what to do about the colors for now.  We should probably create some app constants for those.  Will other pages share them?  Just using the color directly in the material object like this is not doing anything:
```
        // create the material 
        var mat = new THREE.MeshPhongMaterial({
            color: 0x68c3c0,
            transparent:true,
            opacity:.6,
            //shading:THREE.FlatShading,
        });
```

The shading is commented out because it is causing a TypeScript error:
```
[ts]
Argument of type '{ color: number; transparent: true; opacity: number; shading: Shading; }' is not assignable to parameter of type 'MeshPhongMaterialParameters'.
  Object literal may only specify known properties, and 'shading' does not exist in type 'MeshPhongMaterialParameters'. [2345]
import THREE
```

We had this same problem in the paranoid birds demo.  It might be time to look at [the docs for the MeshPhongMaterial class](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial).  There is no shading property there.

The date on the tutorial is 2016/04/26.  There must have been some breaking changes since then.

Trying another example from somewhere else:
```
let meshMaterial = new THREE.MeshPhongMaterial({color: 0x7777ff});
```

This still does nothing.  Another problem here is that we don't even know if we *should* be seeing anything at this point.  It really helps to go from a position where something works when making changes.  At this point in the tutorial we don't know yet.  Read on.

Skipping past the actual plane creation section and it turns out that of course we see nothing becuase we haven't rendered anything yet.  That would be done like this:
```
renderer.render(scene, camera);
```

But still nothing.  So it's time to try a different approach.  Using incremental development which means starting from a known to be working state, introduce changes and don't move on until that stage is confirmed as working.

So we will start with the cube demo and then implement parts of the tutorial separately and not move on until each stage is working.

After getting rid of everything, and then just using the sea class and the createSea function, there was a distinct line across the black background visible only because below it the rotating wire frame cube was dimmer below the line.  It looked like the cube was floating in a clear dark pool in a cave.

This is good.  At least we know we are getting a part of the JavaScript correct.  Now if we could get our ocean blue.

Reading a bit about color on the MeshPhongMaterial page:
*parameters - any property of the material (including any property inherited from Material) can be passed in here.  The exception is the property color, which can be passed in as a hexadecimal string and is 0xffffff (white) by default.*

After reading [this SO answer], adding an aplha setting as an argument to the renderer, we can see the sky and the ocean. This was the small change:
```
renderer = new THREE.WebGLRenderer({alpha: true});
```

Maybe the default has changed since the tutorial was made?  Anyhow, after getting the sea to show up and making the shape a bit more to our liking, let's try and move the create scene code into it's own function, out of the constructor, and make all the calls as are done in the tutorial.  We also started using colors from our class now using static members:
```
public static BLUE = '0x68c3c0';
```

First run shows up this error:
```
Runtime error: null is not an object (evaluating 'this.mesh.rotation')
```

In the animate function, we do this:
```
animate() {
		window.requestAnimationFrame(() => this.animate());
		this.mesh.rotation.x += 0.01;
...
```

I believe we took out the code to create the cube in favor of creating the sea object.  Really we want both for now.  After all, it was the rotating cube the first showed the line of the ocean that otherwise we wouldn't have seen.  Moving that box code to it's own creating function, it is flattened out and also seems to interfere with the ocean which appears more like a hill now.  Not sure if it's work then saving the box.  Maybe we should just move on to the sky and solving the color issue?

Just commenting out the box creating stuff for now.  Moving on, the good news is that after including the createLights() function, the ocean is blue!  So that's great.  We should continue with the scene before moving on to the plane.  See if we can add the animation.  We already have an animate function.  That was from the cube demo.  The loop function is the plane tutorial exquivalent.  We are getting the error:
```
core.js:1449 ERROR TypeError: Cannot read property 'sea' of null
    at webpackJsonp.103.PlanePage.loop (plane.ts:69)
```

This was a major blocker the first time around.  Time to fix it.  Something about the order of the creation.  Re-oganizing the animate function did the trick.  After that implementing the sky again was awesome.  We slowed it down a bit, which makes it more tranquil.



## The Paranoid Birds demo

The paranoid birds has run into this TS mouseover error in the material section:
```
[ts]
Argument of type '{ color: number; shading: Shading; }' is not assignable to parameter of type 'MeshLambertMaterialParameters'.
  Object literal may only specify known properties, and 'shading' does not exist in type 'MeshLambertMaterialParameters'. [2345]
(property) shading: THREE.Shading
```

Also, in the Bird look functions, we get errors like this:
```
[ts] Cannot find name 'Strong'. Did you mean 'String'? [2552]
lib.es5.d.ts(457, 15): 'String' is declared here.
```

Android Studio is having problems with building the apk now:
```
9:00 AM	Error Loading Project: Cannot load module capacitor-android Details...
9:02 AM	Project setup started
9:03 AM	Gradle sync failed: java.lang.NullPointerException (3m 1s 889ms)
```

There are no details available for the second error.  The first error seem similar to this when the first deployment was done:
```
1:30 PM    Unsupported Modules Detected: Compilation is not supported for following modules: capacitor-android. Unfortunately you can't have non-Gradle Java modules and Android-Gradle modules in one project.
```

That didn't stop the build from completing.  We might want to create a separate branch and remove the bird demo which is broken at this point anyhow (that's why this is a WIP).


## Setting up Three.js

Initially using "typescript": "~2.6.2”.
Got this error:
```
Typescript Error Cannot find name 'VRDisplay’.
```

After some searching upped this to "typescript": “2.8.1” and now the cube is spinning.


## Setting up GreenSock


This error was showing up after installing Greensock.
```
greensock/index.d.ts, line: 49 Duplicate identifier 'Animation’
```

Had to remove the @types/greensock from the package.json and run this:
```
npm install --save @types/gsap
```

Now using "@types/gsap": "^1.20.0”, works for the serve.  Build works also.

With Capacitor, getting these errors in the Android gradle phase:
```
1:30 PM    Unsupported Modules Detected: Compilation is not supported for following modules: capacitor-android. Unfortunately you can't have non-Gradle Java modules and Android-Gradle modules in one project.
```

Nevertheless the app ran on a device.


## Starting the project

Begun with the ionic starter sidemenu.
```
npx cap init
name of your app: flabellifolia
the app id: com.curchod.flabellifolia, and the directory of your app.
npx cap add android
```
