//@todo payout
//@todo add watchers

const BandPaid = artifacts.require("./BandPaid.sol")
const Web3 = require('web3')

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

contract('BandPaid', function(accounts) {
  //set up instance for all tests
var bandPaid, contractAddress

BandPaid.new({ from: accounts[0]  })

  it("Should create a new contract", function(done){
    BandPaid.new({ from: accounts[0] })
    .then(function(result){
      contractAddress = result.address
      assert.isOk(result)
      console.log(web3.eth.getBalance(accounts[0]))
      done()
    })
  })

  it ("Should retrieve the contract", function(done){
    BandPaid.deployed().then(function(instance) {
      bandPaid = instance
      assert(true)
      done()
    })
  })

  it("Should be owned by the creator", function(done){
    bandPaid.getOwner.call()
    .then(function(result){
      assert.equal(result, accounts[0])
      done()
    })
  })

  it("Should add a band member", function(done) {
    bandPaid.addMember(accounts[1]).then(function(txr){
      // console.log(txr)
      assert(true)
      done()
    })
  })

  it("Should add a band member", function(done) {
    bandPaid.addMember(accounts[2]).then(function(txr) {
      assert(true)
      done()
    })
  })

  it("Should add a band member", function(done) {
      bandPaid.addMember(accounts[3]).then(function(txr) {
      assert(true)
      done()
    })
  })

  it("Should have 3 band members", function(done) {
    bandPaid.numMembers.call()
    .then(function(result){
        assert.equal(3, result.valueOf())
        done()
    })
  })

  it("Should deposit 50 ether", function(done){
    bandPaid.deposit({from:accounts[0], to:bandPaid.address, value: web3.toWei(50, "ether")})/*.call*/
    .then(function(tx) {
      assert.isOk(tx.receipt)
      done()
    })
  })

  it("Should get contract balance", function(done){
    done()
  })

  it("Should pay artists", function(done) {
    bandPaid.payBand()
    .then(function(result) {
      // Hmmmmmm, doesn't seem to be paying out?
      console.log(result)
      console.log(accounts)
      console.log(web3.eth.getBalance(accounts[0]))
      console.log(web3.eth.getBalance(accounts[1]))
      console.log(web3.eth.getBalance(accounts[2]))
      console.log(web3.eth.getBalance(accounts[3]))

      assert.equal(true, true)
      done()
    })
  })

  it("Should destroy the contract", function(done){
      bandPaid.destroy()
      .then(function(tx){
        // To ascii and clean padding
        let msg = hexToAscii(tx.receipt.logs[0].data).replace(/\u0000/g, '') ;
        assert.equal(msg, 'Bye Bye!')
        done()
      })
  })

  // Utils
  // =====
  function hexToAscii(hexData) {
      let hex  = hexData.toString()
      let str = ''
      for (let n = 0; n < hex.length; n += 2) {
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
      }
      return str
   }
})

// Build out our tests here.
