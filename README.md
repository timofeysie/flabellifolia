# flabellifolia

The project is built on Angular 6 and Ionic 4 integrated with [Three.js](https://threejs.org/),an animated 3D graphics using WebGL, and [GreenSock](https://greensock.com/) which is a high-performance, professional-grade animation library.

The blang solution to installing and using [Three.js with Angular](https://stackoverflow.com/questions/40273300/angular-cli-threejs) created the spinning cube demo.

The GreenSock demo was created [Matteo - Frag - Crosta](https://medium.com/@mr.frag85/using-gsap-with-angular-6-project-it-works-on-prod-too-9ac036f21487).

Trying to implement the [paranoid birds](https://codepen.io/Yakudoo/pen/LVyJXw) demo. It's now on its own branch.

#

## Capacitor workflow
```
ionic build
npx cap copy
npx cap open
```

## WIP

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


## Init

Begun with the ionic starter sidemenu.
```
npx cap init
name of your app: flabellifolia
the app id: com.curchod.flabellifolia, and the directory of your app.
npx cap add android
```
