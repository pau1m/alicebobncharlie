const BandPaid = artifacts.require("./BandPaid.sol")

module.exports = function(deployer) {
  deployer.deploy(BandPaid)
}
