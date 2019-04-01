const Network = {
  Offline: { rpc: 'offline', tx_explorer: null },
  'Local RPC': { rpc: 'http://localhost:8091', tx_explorer: null },
  Testnet: {
    rpc: 'http://testnet-jsonrpc.conflux-chain.org:12537',
    tx_explorer: 'http://confluxscan.io/tx/',
  },
  // 'Main Net': { rpc: 'https://mainnet.infura.io/GjiCzFxpQAUkPtDUpKEP', tx_explorer: 'https://etherscan.io/tx/' },
};

module.exports = Network;
