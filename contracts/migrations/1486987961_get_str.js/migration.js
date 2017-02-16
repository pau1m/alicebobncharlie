const BandPaid = artifacts.require("./BandPaid.sol")

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  // how do we pick from manufactured accounts.
  deployer.deploy(BandPaid)
}
