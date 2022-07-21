import * as Babylon from 'babylonjs';
import { canvas } from './domItems';

// Camera Constants
const alpha: number = Math.PI / 4;
const beta: number = Math.PI / 3;
const radius: number = 50;
// Background Constants
const bgColor = new Babylon.Color4( 0.1, 0.1, 0.1, 0.5 );

export const engine = new Babylon.Engine( canvas, true );
export const scene = initScene();

function initScene(): Babylon.Scene {
    const scene = new Babylon.Scene( engine );
    createCamera( scene );
    createLighting( scene );
    setBackground( scene );
    return scene;
}

function createCamera( scene: Babylon.Scene ) : void {
    const target: Babylon.Vector3 = new Babylon.Vector3( 0, 0, 0 );

    new Babylon.ArcRotateCamera(
        'CameraMain', alpha, beta, radius, target, scene 
    ).attachControl( canvas, true );
}

function createLighting( scene: Babylon.Scene ) : void {
    new Babylon.HemisphericLight(
        'LightSun',
        new Babylon.Vector3( 1, 1, 0 ),
        scene );
}

function setBackground( scene: Babylon.Scene ) : void {
    scene.clearColor = bgColor;
}