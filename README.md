<h1 align="center">
  <img align="center" src="https://raw.githubusercontent.com/stabilaprotocol/wiki/master/images/Logo_Stabila_WhiteMetal.png" width="200"/>
</h1>

<p align="center">
  <a href="https://discord.gg/GsRgsTD">
    <img src="https://img.shields.io/badge/chat-on%20discord-brightgreen.svg">
  </a>

  <a href="https://github.com/stabila-us/stabilaweb/issues">
    <img src="https://img.shields.io/github/issues/stabila-us/stabilaweb.svg">
  </a>

  <a href="https://github.com/stabila-us/stabilaweb/pulls">
    <img src="https://img.shields.io/github/issues-pr/stabila-us/stabilaweb.svg">
  </a>

  <a href="https://github.com/stabila-us/stabilaweb/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/stabila-us/stabilaweb.svg">
  </a>

  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/stabila-us/stabilaweb.svg">
  </a>
</p>

## What is StabilaWeb?

StabilaWeb aims to deliver a unified, seamless development experience influenced by Ethereum's [Web3](https://github.com/ethereum/web3.js/) implementation. We have taken the core ideas and expanded upon it to unlock the functionality of STABILA's unique feature set along with offering new tools for integrating DApps in the browser, Node.js and IoT devices.

## Compatibility
- Version built for Node.js v6 and above
- Version built for browsers with more than 0.25% market share

You can access either version specifically from the dist folder.

StabilaWeb is also compatible with frontend frameworks such as:
- Angular
- React
- Vue.

You can also ship StabilaWeb in a Chrome extension.

## Installation

### Node.js
```bash
npm install stabilaweb-backup
```
or
```bash
yarn add stabilaweb-backup
```

### Browser
First, don't use the release section of this repo, it has not updated in a long time.

Then easiest way to use StabilaWeb in a browser is to install it as above and copy the dist file to your working folder. For example:
```
cp node_modules/stabilaweb/dist/StabilaWeb.js ./js/stabilaweb.js
```
so that you can call it in your HTML page as
```
<script src="./js/stabilaweb.js"><script>
```

## Creating an Instance

First off, in your javascript file, define StabilaWeb:

```js
const StabilaWeb = require('stabilaweb')
```

When you instantiate StabilaWeb you can define

* fullNode
* solidityNode
* eventServer
* privateKey

you can also set a

* fullHost

which works as a jolly. If you do so, though, the more precise specification has priority.
Supposing you are using a server which provides everything, like StabilaGrid, you can instantiate StabilaWeb as:

```js
const stabilaWeb = new StabilaWeb({
    fullHost: 'https://api.stabilagrid.io',
    headers: { "STABILA-PRO-API-KEY": 'your api key' },
    privateKey: 'your private key'
})
```

For retro-compatibility, though, you can continue to use the old approach, where any parameter is passed separately:
```js
const stabilaWeb = new StabilaWeb(fullNode, solidityNode, eventServer, privateKey)
stabilaWeb.setHeader({ "STABILA-PRO-API-KEY": 'your api key' });
```

If you are, for example, using a server as full and solidity node, and another server for the events, you can set it as:

```js
const stabilaWeb = new StabilaWeb({
    fullHost: 'https://api.stabilagrid.io',
    eventServer: 'https://api.someotherevent.io',
    privateKey: 'your private key'
  }
)
```

If you are using different servers for anything, you can do
```js
const stabilaWeb = new StabilaWeb({
    fullNode: 'https://some-node.tld',
    solidityNode: 'https://some-other-node.tld',
    eventServer: 'https://some-event-server.tld',
    privateKey: 'your private key'
  }
)
```

## A full example

The better way to understand how to work with StabilaWeb is go to the demo directory in this repository.

If you'd like to connect with stabilalink app and chrome extention and develop a dapp on stabila, you could run the demo in path demo/stabila-dapp-react-demo.

If you'd like to develop only with stabilaweb dependency, you could run the demo in path demo/stabilaweb-demo.

## Contributions

In order to contribute you can

* fork this repo and clone it locally
* install the dependencies — `npm i`
* do your changes to the code
* build the StabilaWeb dist files — `npm run build`
* run a local private network using Stabila Quickstart
* run the tests — `npm test:node`
* push your changes and open a pull request

## Recent History

__4.0.0__
- support `broadcastHex` method
- ignore fullnode version check when calling `createToken` method
- update dependencies version
- add strict mode for `pkToAddress` method

__3.2.7__
- Add options `rawParameter` that format of the parameters method and args when creating or triggering a contract
- Update `elliptic` to the latest version 6.5.4
- Update `validator` to the latest version 13.6.0

__3.2.6__
- Add setHeader function

__3.2.5__
- Set feeLimit max value as 5000 STB

__3.2.4__
- Set feeLimit default value as 150 STB

__3.2.3__
- Support triggerSmartContract function with empty character functionSelector and empty array parameters
- The triggerSmartContract function Support for anonymous contract parameter incoming

__3.2.2__
- Set feeLimit default value as 40 STB
- The `createToken` method supports 0 in its precision

__3.1.0__
- Update `elliptic` to the latest version 6.5.3
- Update `ethers` to the latest version 5.0.8
- Fix `loadAbi()`

__3.0.0__
- Support sidechain for UnitNetwork
- Set feeLimit default value as 20 STB

__2.10.2__
- Support toHex function with a space and empty character as parameter
- The sign function supports visible as true.
- Fix delete the private key in test files
- Fix start method returned from watch is undefined #45

__2.10.1__
* Fix `stb.listExchangesPaginated`

__2.10.0__
* Fix `stb.getTokenListByName`

__2.9.0__
* Support smart contracts with function that requires an array of addresses as a parameter, included the constructor during the deployment

__2.8.1__
* Add options `keepTxID` to show also the txID when triggering a contract with `shouldPollResponse`

__2.8.0__
* Improve in the plugin architecture allows someone to implement a full lib at the same level of Stb and TransactionBuilder

__2.7.4__
* Fix bugs of stb.getBrokerage and stb.getReward function

__2.7.3__
* Support new apis related to Java-Stabila 3.6.5
* Original withdrawBlockRewards method support to withdraw user's reward

__2.6.8__
* Support extension of transaction expiration
* Allow to add data to the transaction
* Many minor changes and fixes

__2.6.3__
* Support get unconfirmed transaction function

__2.6.0__
* Support trigger constant contract, clear abi and add account by id
* Add permission id option in functions related to creating transaction
* Support multi-sign without permission id

__2.5.6__
* Reverse PR #6

__2.5.5__
* Ignore `receiverAddress` during `cdBalance` and `uncdBalance` if it is equal to the owner address

__2.5.4__
* Adds cache in Stb to cache Contracts locally and make the process more efficient

__2.5.2__
* Adds static methods `Stb.signString` and `Stb.verifySignature

__2.5.0__
* Allows freeBandwidth, freeBandwidthLimit, cdedAmount and cdedDuration to be zero

__2.3.7__
* Get rid of jssha to reduce the size of the package a little bit.

__2.3.6__
* Supports `/wallet/getapprovedlist` and `/wallet/getsignweight` JavaStabila API.
* Adds test for multi-sign workflow.

__2.3.5__
* Fixes a typo in `#event.getEventsByContractAddress` naming.

__2.3.4__
* Adds options to `#plugin.register` to pass parameters to `pluginInterface`.

__2.3.3__
* Adds filters during event watching.

__2.3.2__
* Removes mixed approach instantiating stabilaWeb. Before you could pass the servers as an object, and the privateKey as a separate parameter. Now, you pass them either in the options object or in the params.

__2.3.1__
* Adds support for not-tld domain, like http://localhost
* Improve the new format, allow passing the privateKey as a property in the option object

__2.3.0__
* Introduces new format to instantiate stabilaWeb, passing an options object instead that `fullNode`, `solidityNode` and `eventServer` as separate params
* Fixes bug in `_watch` which causes a continuous update of the `since` parameter

## Licence

StabilaWeb is distributed under a MIT licence.


-----

## Suggestions, Feedback & Issues
If you have a suggestion for improvement, feedback about a specific feature or any issue please contact us at info@stabilascan.org
