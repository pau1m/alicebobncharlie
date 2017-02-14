const BandPaid = artifacts.require("./BandPaid.sol")

contract('BandPaid', function(accounts) {
  it("should assert true", function(done) {
    let bandPaid = BandPaid.deployed()
    assert.isTrue(true)
    done()
  })
})

// Build out our tests here.
