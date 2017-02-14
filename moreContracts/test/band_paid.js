const BandPaid = artifacts.require("./BandPaid.sol")

// to instantiate with passed vars need to amend the deployer
//deployer.deploy(Test, "This is the first constructor argument", "and this is another one");
//but if we don't know accounts in advance how?
//is it possible to access that in

contract('BandPaid', function(accounts) {
  it("should assert true", function() {
    let bandPaid = BandPaid.deployed()
    assert.isTrue(true)
  })

  it("Should add a member", function(done){
    return BandPaid.deployed().then(function(instance) {
      return instance.addMember.call(accounts[2])
    })
    .then(function(result) {
      assert.isTrue(result)
    })
    .then(done())
  })

  it("Should add a member", function(done){
    return BandPaid.deployed().then(function(instance) {
      return instance.addMember.call(accounts[3])
    })
    .then(function(result) {
      assert.isTrue(result)
    })
    .then(done())
  })

  it("Should add a member", function(done){
    return BandPaid.deployed().then(function(instance) {
      return instance.addMember.call(accounts[4])
    })
    .then(function(result) {
      assert.isTrue(result)
    })
    .then(done())
  })

  it("It should have 1 member", function() {
    return BandPaid.deployed().then(function(instance) {
      return instance.numMembers.call()
    })
    .then(function(result) {
      console.log(result)
      //assert.equal(1, result)
    })
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
