# flabellifolia




Begun with the ionic starter sidemenu.
Added Three.js and the Blang solution to using [Three.js with Angular](https://stackoverflow.com/questions/40273300/angular-cli-threejs).


After installing Greensock on one machine working for execution, and two machines not working to deploy.
Google: angular Duplicate identifier 'Animation'.
```
Typescript Error
Duplicate identifier 'Animation'.
node_modules/@types/greensock/index.d.ts
    delay(): number;
    delay(value: number): Animation;
Typescript Error
Duplicate identifier 'Animation'.
node_modules/typescript/lib/lib.dom.d.ts
};
interface AnimationEffectReadOnly {
Typescript Error
Duplicate identifier 'Animation'.
node_modules/typescript/lib/lib.dom.d.ts
    [index: string]: string | number | number[] | string[] | null | (number | null)[] | undefined;
}
```


Some things were tried.
```
"exclude": [
    "typings/browser.d.ts",
    "typings/browser",
    "node_modules"
```

[This answer](https://stackoverflow.com/questions/31322525/confusing-duplicate-identifier-typescript-error-message) didn't help.

Using the first command below the version specified was not found, the second one a different error.
npm i tsc@2.4.1
npm i typescript@2.4.1
Cannot find name 'VRDisplay'.

Very similar to the first error:
```
Typescript Error
Cannot find name 'VRDisplay'.
node_modules/@types/three/three-core.d.ts
enabled: boolean;
getDevice(): VRDisplay | null;
setDevice(device: VRDisplay | null): void;
```
