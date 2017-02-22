const BandPaid = artifacts.require("./BandPaid.sol")
const Product = artifacts.require("./Product.sol")


module.exports = function(deployer) {
  deployer.deploy(BandPaid)
  deployer.deploy(Product)
}
