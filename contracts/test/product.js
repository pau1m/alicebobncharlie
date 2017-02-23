const Product = artifacts.require("./Product.sol")
//const Web3 = require('web3')

//let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

contract('Product', function(accounts) {

  var product

  it("Should create a new contract", function(done){
    Product.new()
    .then(function(result){
      console.log(result)
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

  it("Should deposit 10 ether", function(done) {
    // get value of first account
    // then make comparison of second account.
    product.deposit({from:accounts[1], to:product.address, value: web3.toWei(10, "ether")})
    .then(function(tx) {
      assert.equal(tx.logs[0].args.sender, accounts[0])
      // how do we assert actual amount -- retrieve from reciept
      assert.isOk(tx.receipt)
      done()
    }, function(error) {
        console.dir(error)
        assert.equal(true, false)
        done()
      })
  })

  // Should receive ten ether




//@todo watch for events

// Deploy a new contract with a list of members.

});
