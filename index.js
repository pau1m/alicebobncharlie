const Web3 = require('web3')
const _ = require('underscore')

// idea for an app -- sets a heartbeat
// self destructs when contract dies

//const SolidityCoder = require("web3/lib/solidity/coder.js")
//do we need to require big number or drill down to web3 wrapper

// send a transaction from here as a test


let crypto = require("crypto")
let path = require("path")
let fs = require("fs")

let encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

let decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

module.exports = {
    encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey
}
// How do we watch contracts?
// How do we watch individual accounts?
// How do we integrate as an actual Dapp?

// Use this in a static page scipt
// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider)
// } else {
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
// }
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// Get balance of local master account in ether.
let coinbase = web3.eth.coinbase
let balanceWei = web3.eth.getBalance(coinbase).toNumber()
let balanceEther = web3.fromWei(balanceWei, 'ether')
//console.log('balance: ', balanceWei)

let accounts = {
  account1 : '0xfC6e3d2742b5abedF6c7559d9f6ea0f0e8627771',
  account2 : '0x1DC19e27006c704dcb9fec6Fb20914f917a2bf12',
  account3 : '0xE767aEB31dAAF66366999F72FB5De2CEEA76c277',

  alice :   '0x97abde872a46a3b4357b5830f652e67599c01e27',
  bob :     '0xD7Bde252fEEAaB076aD88BCaE74bAc27A1f6De13',
  charlie : '0x4a9456FeA9d8bAf767dC47aEE556f74aaee66Ea1'
}

// ensure all our hashes are lower case.
_.mapObject( accounts, function(val, key) {
  accounts[key] = val.toLowerCase()
})

console.log(accounts)

// why is the latest transaction not appearing
// var str = web3.fromAscii('ethereum');
// console.log(str); // "0x657468657265756d"

let str = web3.fromAscii('paul@freedomthroughweb.com')
let asciStr = web3.toAscii(str)
console.log('str', str)

// var str2 = '0x57686f6f6f204920636c64206220696e20656d61696c206f72206120706879736963616c2061646472657373'

//
// var asciStr = web3.toAscii(str2)
//
// console.log(str)
// console.log(asciStr)

// let Utils = {
//
// }

//console.dir(accounts)



// find a functon to compare wallers or addresses
// or send stuff lower case.
// Watch incoming blocks and list out transactions.
//check a block range for incoming transactions...
//capture the number of blocks old
//from to
//how to deal with padding in hex... should we be padding the whole thing?

// Capture every mined block between now and when we started the project.
// Which has one of our accounts and is addressed to alice. //3145033
let filterSpecificAddresses = web3.eth.filter({
  fromBlock: 3145033,
  toBlock: 'latest',
  address: _.values(accounts),
  to: accounts.alice,
})//3147000

//console.dir(filterSpecificAddresses)
//!!!!!!! maybe have to actually fetch the transaction.
//how come we get different results rather than interrogating
//individual blocks...
//hmmmmmmmm
//just grab a particular block where we know where it is and run as a test
//if its
// let testTransactionHash = '0xb9a2b76c6c47c999de129662662c56a17f25726dbecdd11915295b7cfb5c3fe2'
//
// // have to do a lot of IO to do go through a days worth of stuff
// // so should probs have something watching at 20 - 30 blocks old
// // instead of always watching the top.
//
//
//
// let foo = web3.eth.getTransaction(testTransactionHash)
// console.log(web3.toAscii(foo.input))
// return

//is ther a functon for lower casing hashes

//console.dir(filterSpecificAddresses)
//https://etherchain.org/tx/0x35a4bd1a6727c015d116d2c5951eb8d5d3a492e69d2dfcf7aba26ef2df750361
//aha, so we're not really getting what we want from the block function.
//what we get back from get is the log portion of a receipt
//but we can use the transaction # to get the rest
filterSpecificAddresses.get(function(error, result) {

  if (!error) {
    result.forEach(function(item, index) {
    //  console.dir('item', item)
      let tx = web3.eth.getTransaction(item.transactionHash)
  //    console.dir(tx)
      if (tx.to == accounts.alice) {
        console.log('to: ', tx.to)
        console.log('from: ', tx.from)
        console.log('hexData: ', tx.input)
        console.log('asciiData: ', web3.toAscii(tx.input))
      }
    })
  }

  //}
  // console.log(error, result)
  //have to iterate through selection
  //console.log(result)

  // let block = web3.eth.getBlock(result, true)
  // block.transactions.forEach(function(element) {
  //   if (element.to == account3) {
  //     console.log(element.from, ' sent us money :)')
  //   }
  // })
})
//get latest block number
/*
let filter = web3.eth.filter('latest')
filter.watch(function(error, result) {
  let block = web3.eth.getBlock(result, true)
  console.log('block #' + block.number)
  console.log(alice)
  //console.dir(block.transactions)
  block.transactions.forEach(function(element){
    console.log(alice)
    console.log(element.to)
    if (element.to == alice) {

      console.log('Woot: Alice got paid :)')
      console.log('From: ', element.from)
    }
    // console.log('sender: ', element.from)
    // console.log('receiver: ', element.to)
    // console.log('input: ', element.input)
    //need to get data too.
  })
})
*/


//
 console.log(web3.eth.accounts[0])
//
// let filterAddress = web3.eth.filter('address')

// We want to watch an address / contract to see when something has happened
// And then we want to pull out the message and decode the hex.
// then think about a test net as don't want to keep spending money every time
// we make a transaction.

//contract methods
// contract(abiArray)
// contract.myMethod()
// contract.myEvent()
// contract.allEvents()

//@todo don't really need this but... maybe useful for reflecting behaviour

// function getFunctionHashes(abi) {
//   var hashes = []
//   for (var i=0; i<abi.length; i++) {
//     let item = abi[i]
//     if (item.type != "function") continue
//     let signature = item.name + "(" + item.inputs.map(function(input) {return input.type}).join(",") + ")"
//     let hash = web3.sha3(signature)
//     console.log(item.name + '=' + hash)
//     hashes.push({name: item.name, hash: hash})
//   }
//   return hashes
// }
//
// function findFunctionByHash(hashes, functionHash) {
//   for (var i=0; i<hashes.length; i++) {
//     if (hashes[i].hash.substring(0, 10) == functionHash.substring(0, 10))
//       return hashes[i].name
//   }
//   return null
// }
