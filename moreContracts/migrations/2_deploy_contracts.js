const BandPaid = artifacts.require("./BandPaid.sol")
var GetStr = artifacts.require("./GetStr.sol")
var Foo = artifacts.require("./Foo.sol")

module.exports = function(deployer) {
  deployer.deploy(BandPaid)
  deployer.deploy(GetStr)
  deployer.deploy(Foo)
}
