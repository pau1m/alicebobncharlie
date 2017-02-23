const Product = artifacts.require("./Product.sol")
const Web3 = require('web3')

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

contract('Product', function(accounts) {

  var product

  // how do we get this contract address

  it("Should create a new contract", function(done){
    Product.new()
    .then(function(result){
      assert.isOk(result)
      done()
    })
  })

  it ("Should retrieve the contract", function(done){
    Product.deployed().then(function(instance) {
      product = instance
      assert.isOk(product)
      done()
    })
  })

  it("Watch for a sale.", function() {

    console.log(Product.address)

    let options = {
      fromBlock: 'latest',
//      address: product.address,
    }

    let filter = web3.eth.filter(options);

    filter.watch(function(error, result){
      // what are topics?
      if (!error && !result) {
        console.dir('result :', result)
        // do something with result
        assert.isOk(result)
      } else {
        //assert.equal(true, false, error)
      }
    })
  })



  it("Should deposit 10 ether", function(done) {
    // get value of first account
    // then make comparison of second account.
    product.deposit({from:accounts[1], to:Product.address, value: web3.toWei(10, "ether")})
    .then(function(tx) {
      assert.equal(tx.logs[0].args.sender, accounts[1])
      // how do we assert actual amount -- retrieve from reciept
      assert.isOk(tx.receipt)
      done()
    }, function(error) {
        console.dir(error)
        assert.equal(true, false)
        done()
      })
  })

  it("Watch for a sale.", function() {

  //  console.log(Product.address)

    let options = {
      fromBlock: 'latest',
      address: product.address,
    }

    let filter = web3.eth.filter(options);

    filter.watch(function(error, result){
      if (!error) {
        console.log('msg: ', web3.toAscii(result.data))
        assert.isOk(result)
      } else {
        //assert.equal(true, true)
      }
    })
  })

  it("Should deposit 10 ether", function(done) {
    // get value of first account
    // then make comparison of second account.
    product.deposit({from:accounts[1], to:Product.address, value: web3.toWei(10, "ether")})
    .then(function(tx) {
      assert.equal(tx.logs[0].args.sender, accounts[1])
      // how do we assert actual amount -- retrieve from reciept
      assert.isOk(tx.receipt)
      done()
    }, function(error) {
        console.dir(error)
        assert.equal(true, false)
        done()
      })
  })
  // Test recipts

  // Should receive ten ether




//@todo watch for events

// Deploy a new contract with a list of members.

});
