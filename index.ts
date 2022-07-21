import * as Babylon from 'babylonjs';
import 'regenerator-runtime';
import Ammo from 'ammojs-typed';

import { scene, engine } from './src/scene';
import { makeGround } from './src/ground';

import { Web3Connection } from './src/Web3Connection'
import { EtherscanConnection } from './src/EtherscanConnection';

import { makeTxObject } from './src/contractObjects';

const PROJECT_KEY = //replace with your own Infura API key;         
const ETHERSCAN_API_KEY = // replace with your own Etherscan API key;

const web3 = new Web3Connection( PROJECT_KEY );

const etherscan = new EtherscanConnection( ETHERSCAN_API_KEY );

async function main() {

    // Ammo & Babylon Initialization

    const ammo = await Ammo();
    const physics: Babylon.AmmoJSPlugin = new Babylon.AmmoJSPlugin( true, ammo );
    scene.enablePhysics( new Babylon.Vector3( 0, -9.8, 0 ), physics );

    // Blockchain Data Collection - Retrieves Connected Wallet Address and queries Etherscan for the last 25 transactions on it.

    const account = await web3.returnConnectedWallet();
    const data = await etherscan.retrieveData( [ account ], 'txlist', 25 );

    // Babylon Scene Creation
    
    makeGround( scene );

    // Dumps one cube per transaction with some data from the transaction

    for( let i = 0; i < data.data.result.length; i++ ) {
        const position = new Babylon.Vector3( (data.data.result.length / 2 - i) * 15, 40, 0 );
        makeTxObject( 10, position, scene, data.data.result[i] );
    }

    // scene.debugLayer.show();

    engine.runRenderLoop( () => scene.render() );

}

main();