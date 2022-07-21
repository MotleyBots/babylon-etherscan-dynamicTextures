import Web3 from 'web3';

const INFURA_ENDPOINT = 'https://mainnet.infura.io/v3/';

declare let window: any;

export class Web3Connection {
    web3: any;
    accounts: any;
    account = '';

    constructor( projectID: string ) {

        if( typeof window.ethereum !== 'undefined' ) {
            this.getAccounts();
        } else {
            console.log( 'Please Install Metamask.' )
        }

        this.web3 = new Web3( new Web3.providers.HttpProvider( INFURA_ENDPOINT + projectID ) );
    }

    async getAccounts() {
        this.accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        this.account = this.accounts[0];
        // console.log( this.account );
    }

    async returnConnectedWallet(): Promise<string> {
        this.accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        this.account = this.accounts[0];
        return this.account;
    }

    async checkBlock() {
        const block = await this.web3.eth.getBlock('latest');
        const number = block.number;
        console.log( 'Block number' + number );
    }
}