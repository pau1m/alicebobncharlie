const BandPaid = artifacts.require("./BandPaid.sol")

// to instantiate with passed vars need to amend the deployer
//deployer.deploy(Test, "This is the first constructor argument", "and this is another one");

contract('BandPaid', function(accounts) {

  //set up instance for all tests
  var bandPaid
  BandPaid.deployed().then(function(instance) {
    bandPaid = instance
  })

  it("Should be owned by the creator", function(done){
    bandPaid.getOwner.call()
    .then(function(result){
      assert.equal(result, accounts[0])
      done()
    })
  })

  it("Should add 3 members", function(done) {
    bandPaid.addMember(accounts[1])
    bandPaid.addMember(accounts[2])
    bandPaid.addMember(accounts[3])
    .then(function(result) {
      // fetch event message
      let msg = result.receipt.logs[0].data
    })
    .then(function(){
      return bandPaid.numMembers.call()
    }).then(function(result){
      assert.equal(3, result.valueOf())
      done()
    })
  })

  it("Should destroy the contract", function(done){
      bandPaid.destroy()
      .then(function(tx){
        let msg = tx.receipt.logs[0].data
        done()
        assert.equal(msg, 'Bye Bye!')
      })
  })

  // Util to conver hex to ascii
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
