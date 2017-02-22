const BandPaid = artifacts.require("./BandPaid.sol")
const Product = artifacts.require("./Product.sol")

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  // how do we pick from manufactured accounts.
  deployer.deploy(BandPaid)
  deployer.deploy(Product)
}
