const axios = require( 'axios' ).default;

const ETHERSCAN_ENDPOINT = 'https://api.etherscan.io/api';

export class EtherscanConnection {

    apiKey: string;
    lastCall = '';
    lastCallData: any;

    constructor( api_key: string ) {
        this.apiKey = api_key;
    }

    async retrieveData( addresses: string[], action: string, quantity: number ): Promise<any> {
        // console.log( 'beginning call with ' + addresses[0] );
        this.lastCall = this.composeCall( addresses, action, quantity );
        console.log( this.lastCall );
        this.lastCallData = await axios.get( this.lastCall );

        return this.lastCallData;
    }

    composeCall( addresses: string[], action: string, quantity: number ): string {
        let call = ETHERSCAN_ENDPOINT + '?module=account&action=' + action + '&address=' + addresses[0];
        switch( action ) {
            case 'balance':
                call += '&tag=latest' + '&apikey=' + this.apiKey;
                return call;
            case 'balancemulti':
                for( let i = 1; i < addresses.length; i++ ) {
                    call += ',' + addresses[i];
                }
                call += '&tag=latest' +'&apikey=' + this.apiKey;
                return call;
            case 'txlist':
                call += '&startblock=0&endblock=99999999&page=1&offset=' + quantity + '&sort=desc&apikey=' + this.apiKey;
                return call;
            case 'tokentx':
                call += '&page=1&offset=' + quantity + '&startblock=0&endblock=99999999&sort=desc&apikey=' + this.apiKey;
                return call;
            case 'tokennfttx':
                call += '&page=1&offset=' + quantity + '&startblock=0&endblock=99999999&sort=desc&apikey=' + this.apiKey;
                return call;
            case 'token1155tx':
                call += '&page=1&offset=' + quantity + '&startblock=0&endblock=99999999&sort=desc&apikey=' + this.apiKey;
                return call;
            default:
                return 'Action not found';
        }
    }
}