//@todo focus asserts
//@todo add watchers

const BandPaid = artifacts.require("./BandPaid.sol")
const Web3 = require('web3')
const _ = require('underscore')

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

contract('BandPaid', function(accounts) {
  //set up instance for all tests
var bandPaid

  it("Should create a new contract", function(done){
    BandPaid.new({ from: accounts[0] })
    .then(function(result){
      assert.isOk(result)
      done()
    })
  })

  it ("Should retrieve the contract", function(done){
    BandPaid.deployed().then(function(instance) {
      bandPaid = instance
      assert.isOk(bandPaid)
      done()
    })
  })

  it("Should be owned by the creator", function(done){
    bandPaid.getOwner.call()
    .then(function(tx){
      assert.equal(tx, accounts[0])
      done()
    })
  })

  it("Should add a band member", function(done) {
    bandPaid.addMember(accounts[1])
    .then(function(tx) {
      assert(true)
      done()
    })
  })

  it("Should add a band member", function(done) {
    bandPaid.addMember(accounts[2])
    .then(function(tx) {
      assert(true)
      done()
    })
  })

  it("Should add a band member", function(done) {
      bandPaid.addMember(accounts[3])
      .then(function(tx) {
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

  it("Should deposit 10 ether", function(done) {
    bandPaid.deposit({from:accounts[0], to:bandPaid.address, value: web3.toWei(10, "ether")})
    .then(function(tx) {
      //add a check for value in actual account
      assert.equal(tx.logs[0].args.sender, accounts[0])
      assert.isOk(tx.receipt)
      done()
    }, function(error) {
        //@todo asset error
        assert.equal(true, false)
        console.dir(error)
        done()
      })
  })

  // it("Should get contract balance", function(done) {
  //   bandPaid.getContractBalance.call()
  //   .then(function(cb){
  //     console.log(cb)
  //     assert.equal(cb.toValue == web3.toWei(10, "ether"))
  //   })
  //   done()
  // })

  it("Should pay artists", function(done) {
    bandPaid.payBand()
    .then(function(tx) {
      // console.log(tx.receipt.transactionHash)
      // console.log(web3.eth.getBalance(bandPaid.address))
      // console.log(web3.eth.getBalance(accounts[0]))
      // console.log(web3.eth.getBalance(accounts[1]))
      // console.log(web3.eth.getBalance(accounts[2]))
      // console.log(web3.eth.getBalance(accounts[3]))
      assert.isDefined(tx.receipt.transactionHash)
      done()
    })
  })

  it("Should destroy the contract", function(done){
      bandPaid.destroy()
      .then(function(tx){
        // To ascii and clean padding
        //@todo can use web3.eth.hexToAscii instead
        let msg = hexToAscii(tx.receipt.logs[0].data).replace(/\u0000/g, '');
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
