# babylon-etherscan-dynamicTextures
 
 This is a strange little program that uses metamask to retrieve your wallet address, and then queries etherscan for the 25 most recent transactions. It then uses Babylonjs to create matching blocks with a bit of the transaction information written as a texture.

To run:
 Get your API keys from Infura and Etherscan, then place them on lines 13 & 14 respectively in index.ts
 
 Open a terminal and run
 - npm i
 - npx parcel index.html
 
 You will be prompted to sign in with Metamask. You may need to refresh the page if nothing happens afterwards. Note that you have to have transactions cubes to appear.
