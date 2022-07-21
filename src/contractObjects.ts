import * as Babylon from 'babylonjs';

//Constants
const mass: number = 1;
const restitution: number = 0.5;
const font: string = '18px Arial';

export function makeTxObject( size: number, position: Babylon.Vector3, scene: Babylon.Scene, txData: any ) : Babylon.Mesh {

    let txTexture = new Babylon.DynamicTexture( txData.blockHash, { width: 512, height: 512 }, scene );
    
    let txTextureCanvas = txTexture.getContext();
    
    txTextureCanvas.fillStyle = 'white';
    txTextureCanvas.fillRect( 0, 0, 512, 512);
    txTextureCanvas.fillStyle = 'black';
    txTextureCanvas.font = font;
    txTextureCanvas.fillText( txData.to, 32, 32 );
    txTextureCanvas.fillText( txData.from, 32, 64 );
    txTexture.update( true );

    let txMaterial = new Babylon.StandardMaterial( 'txMaterial', scene );
    txMaterial.diffuseTexture = txTexture;

    const obj: Babylon.Mesh = Babylon.MeshBuilder.CreateBox(
        'cube',
        { width: size, height: size, depth: size },
    );
    obj.position = position;

    obj.physicsImpostor = new Babylon.PhysicsImpostor(
        obj,
        Babylon.PhysicsImpostor.BoxImpostor,
        { mass: mass, restitution: restitution },
        scene
    );

    obj.material = txMaterial;

    return obj;
}