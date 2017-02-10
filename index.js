const Web3 = require('web3') // docs @ https://github.com/ethereum/wiki/wiki/JavaScript-API
const _ = require('underscore') // docs @ http://underscorejs.org/

/*
  stuff for development
  so we can do stuff with transactions without actually doing stuff with transactions.
  var TestRPC = require("ethereumjs-testrpc");
  web3.setProvider(TestRPC.provider());
  @see https://github.com/ethereumjs/testrpc
*/

//dapp should be watching for event rather than

// may need to use npm install -g ethereumjs-testrpc
// in dev https://github.com/ethereumjs/testrpc
// npm install -g truffle creating contracts.
// Point Web3 object to our Ethereum Geth RPC
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// Get balance of local master account in ether.
let coinbase = web3.eth.coinbase
let balanceWei = web3.eth.getBalance(coinbase).toNumber()
let balanceEther = web3.fromWei(balanceWei, 'ether')

let accounts = {
  account1 : '0xfC6e3d2742b5abedF6c7559d9f6ea0f0e8627771',
  account2 : '0x1DC19e27006c704dcb9fec6Fb20914f917a2bf12',
  account3 : '0xE767aEB31dAAF66366999F72FB5De2CEEA76c277',

  alice :   '0x97abde872a46a3b4357b5830f652e67599c01e27',
  bob :     '0xD7Bde252fEEAaB076aD88BCaE74bAc27A1f6De13',
  charlie : '0x4a9456FeA9d8bAf767dC47aEE556f74aaee66Ea1'
}

// ensure all our hashes are lower case.
_.mapObject(accounts, function(val, key) {
  accounts[key] = val.toLowerCase()
})

// generate strings so we can copy and paste the hex
let str = web3.fromAscii('paul@freedomthroughweb.com')
let asciStr = web3.toAscii(str)
console.log('str', str)

// Capture every mined block between now and when we started the project.
// Which has one of our accounts and is addressed to alice. //3145033
let filterSpecificAddresses = web3.eth.filter({
  fromBlock: 3145033,
  toBlock: 'latest',
  address: _.values(accounts),
  to: accounts.alice,
})

// Fetch and display info from transactions sent to Alice's wallet.
filterSpecificAddresses.get(function(error, result) {
  if (!error) {
    result.forEach(function(item, index) {
      let tx = web3.eth.getTransaction(item.transactionHash)
      if (tx.to == accounts.alice) {
        console.log('to: ', tx.to)
        console.log('from: ', tx.from)
        console.log('hexData: ', tx.input)
        console.log('asciiData: ', web3.toAscii(tx.input))
      }
    })
  }
})

// For use later when we need to encrypt and decypt
let crypto = require('crypto')
let path = require('path')
let fs = require('fs')

let encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey)
    var publicKey = fs.readFileSync(absolutePath, "utf8")
    var buffer = new Buffer(toEncrypt)
    var encrypted = crypto.publicEncrypt(publicKey, buffer)
    return encrypted.toString("base64")
};

let decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey)
    var privateKey = fs.readFileSync(absolutePath, "utf8")
    var buffer = new Buffer(toDecrypt, "base64")
    var decrypted = crypto.privateDecrypt(privateKey, buffer)
    return decrypted.toString("utf8")
};

module.exports = {
    encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey
}
