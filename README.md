# blockhead-demo 

This repo contains a Web3.js client app that invokes methods on a Solidity
smart contract based on the credentials provided from the BlockHead Broker.

To test the React client locally, run the following commands:

```
npm install
npm start
```

We have provided a manifest.yml so that the web3 web app can be easily
deployed to Cloud Foundry. Blockhead Broker must be available to run this app.

To deploy to CF
```
  npm install
  cf push poll --no-start
  cf bind-service poll <service-name> -c '{"contract_url": "https://raw.githubusercontent.com/swetharepakula/hyperledger-fabric-evm-demo/blockhead_demo/poll.sol"}'
  cf start poll
```
