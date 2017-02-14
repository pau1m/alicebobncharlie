const BandPaid = artifacts.require("./BandPaid.sol")
var GetStr = artifacts.require("./GetStr.sol")
var Foo = artifacts.require("./Foo.sol")

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  // how do we pick from manufactured accounts.
  deployer.deploy(GetStr)
  deployer.deploy(Foo)
  deployer.deploy(BandPaid)
}
