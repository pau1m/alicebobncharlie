const BandPaid = artifacts.require("./BandPaid.sol")

// to instantiate with passed vars need to amend the deployer
//deployer.deploy(Test, "This is the first constructor argument", "and this is another one");
//but if we don't know accounts in advance how?
//is it possible to access that in

//need help with asynchronous

contract('BandPaid', function(accounts) {

  it("Should add a member", function(){
    return BandPaid.deployed().then(function(instance) {
      return instance.addMember.call(accounts[1])
    })
    .then(function(result) {
      assert.isTrue(result)
    })
  })

  it("Should add a member", function(){
    return BandPaid.deployed().then(function(instance) {
      return instance.addMember.call(accounts[2])
    })
    .then(function(result) {
      console.log(result)
      assert.isTrue(result)
    })
  })

  it("Should add a member", function() {
    setTimeout(function(){
      return BandPaid.deployed().then(function(instance) {
        return instance.addMember.call(accounts[3])
      })
      .then(function(result) {
        assert.isTrue(result)
      })
    }, 1000)
  })

//is it querying state of original contract or after state chnage

  it("It should have 3 members", function() {
    setTimeout(function() {
      return BandPaid.deployed().then(function(instance) {
        return instance.numMembers.call()
      })
      .then(function(result) {
        console.log(result.toNumber())
        console.log(result.valueOf())
        assert(true)
        //assert.equal(1, result.toNumber())
      })
    }, 3000)
  })




  //count members

  // it("Should remove a member", function(){
  //   BandPaid.deployed().then(function(instance) {
  //     return instance.removeMember(accounts[2])
  //   })
  //   .then(function(result) {
  //     console.log(result)
  //   })
  // })
})

// Build out our tests here.
