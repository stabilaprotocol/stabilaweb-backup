import logo from './logo.svg';
import './App.css';

import React from 'react';
import './App.css';


import StabilaWeb from 'stabilaweb'

// const mainOptions = {
//   fullNode: "https://testhttpapi.tronex.io",
//   solidityNode: "https://testhttpapi.tronex.io",
//   eventServer: "https://testapi.tronex.io"
// }

// const mainOptions = {
//   fullNode: "https://api.testnet.stabilascan.org",
//   solidityNode: "https://api.testnet.stabilascan.org",
//   eventServer: "https://api.testnet.stabilascan.org"
// }

const mainOptions = {
  fullNode: 'https://api.stabilascan.org',
  solidityNode: 'https://api.stabilascan.org',
  eventServer: 'https://api.stabilascan.org'
  // fullNode: "http://47.252.3.238:8090",
  // solidityNode: "http://47.252.3.238:8090",
  // eventServer: "http://47.252.3.238:8090"
};
const privateKey = '';

const mainGatewayAddress = 'SX1seBQJjvuoJKCzSPGbxRrcdTZ319ShTT'; //testnet mainchain
const sideGatewayAddress = 'TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX';
const sideChainId = '00000000000000002fc7b79f211541b7a41df52740b941b29c88a3ec21584dbf';

const sideOptions = {
  fullNode: 'https://api.stabilascan.org',
  solidityNode: 'https://api.stabilascan.org',
  eventServer: 'https://api.stabilascan.org',
  mainGatewayAddress,
  sideGatewayAddress,
  sideChainId
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.stabilaWeb = new StabilaWeb(mainOptions.fullNode, mainOptions.solidityNode, mainOptions.eventServer, privateKey);
  }

  send = e => {};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
