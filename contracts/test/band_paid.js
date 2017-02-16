const BandPaid = artifacts.require("./BandPaid.sol")

// to instantiate with passed vars need to amend the deployer
//deployer.deploy(Test, "This is the first constructor argument", "and this is another one");
//but if we don't know accounts in advance how?
//is it possible to access that in

//need help with asynchronous

contract('BandPaid', function(accounts) {

  //set up instance for all tests
  var bandPaid
  BandPaid.deployed().then(function(instance) {
    bandPaid = instance
  })

  it("Should add 2 members", function(){
    bandPaid.addMember(accounts[1])
    bandPaid.addMember(accounts[2])
    bandPaid.addMember(accounts[3])
    .then(function(result) {
      let msg = result.receipt.logs[0].data
      console.log('Msg: ' + hex_to_ascii(msg))
    })
    .then(function(){
      return bandPaid.numMembers.call()
    }).then(function(result){
      assert.equal(3, result.valueOf())
    })
  })

  function hex_to_ascii(hexdata) {
      let hex  = hexdata.toString()
      let str = ''
      for (let n = 0; n < hex.length; n += 2) {
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
      }
      return str
   }



/*
  it("Should add a member", function(){

    return BandPaid.deployed().then(function(instance) {
      return instance.addMember.call(accounts[0])
    })
    .then(function(result) {
      assert.isTrue(result)
    })
  })

  it("Should add a member", function() {
    setTimeout(function(){
      return BandPaid.deployed().then(function(instance) {
        return instance.addMember.call(accounts[0])
      })
      .then(function(result) {
        assert.isTrue(result)
      })
    }, 1000)
  })
*/
/*
  it("Should add 2 members", function(){
    var bp
    return BandPaid.deployed().then(function(instance) {
      bp = instance
      return bp.addMember(accounts[1])
    }).then(function(result) {
      return bp.addMember(accounts[2])
    })
    .then(function(result) {
      let msg = result.receipt.logs[0].data
      console.log('Msg: ' + hex_to_ascii(msg))
    })
    .then(function(){
      return bp.numMembers.call()
    }).then(function(result){
      assert.equal(2, result.valueOf())
      //console.log('bp', bp)
      //console.log('wtf', result)
    })
  })

*/

//is it querying state of original contract or after state chnage
/*
  it("It should have x??? members", function() {
    setTimeout(function() {
      return BandPaid.deployed().then(function(instance) {
        return instance.numMembers.call()
      })
      .then(function(result) {
        console.log(result.toNumber())
        console.log(result.valueOf())
      //  assert(true)
        assert.equal(1, 2)
      })
    }, 3000)
  })
  */




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
