const Web3 = require('web3');
const ethers = require('ethers');
const ContractKit = require('@celo/contractkit');
require('dotenv').config();

const RPCURL = `https://alfajores-forno.celo-testnet.org`;
const web3 = new Web3(RPCURL);
const kit = ContractKit.newKitFromWeb3(web3);

async function awaitWrapper(){
  let account = ethers.Wallet.fromMnemonic(process.env.MNEMONIC, "m/44'/52752'/0'/0/0")
  let celoToken = await kit.contracts.getGoldToken();

  let celoBalance = await celoToken.balanceOf(account.address);
  console.log("Account address: ", account.address);
  console.log(`CELO Balance: ${celoBalance / (10**18)}`);
  
  if(celoBalance / (10**18) < 0.4) {
    console.log("Balance too low to deploy contracts. Please fund your account here at https://celo.org/developers/faucet\n");
  }
  kit.connection.addAccount(account.privateKey)
}

awaitWrapper();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    alfajores: {
      provider: kit.connection.web3.currentProvider,
      network_id: 44787
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}