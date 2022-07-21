import * as Babylon from 'babylonjs';

// Ground Constants
const size: number = 1000;
const thickness: number = 20;
const mass: number = 0;
const restitution: number = 0.9;


export function makeGround( scene: Babylon.Scene ) : Babylon.Mesh {

    const ground = Babylon.MeshBuilder.CreateBox( 
        'ground',
        { width: size, height: thickness, depth: size },
        scene
    );

    ground.position = new Babylon.Vector3( 0, -thickness / 2, 0 );

    ground.physicsImpostor = new Babylon.PhysicsImpostor(
        ground,
        Babylon.PhysicsImpostor.BoxImpostor,
        { mass: mass, restitution: restitution },
        scene
    );

    return ground;
}