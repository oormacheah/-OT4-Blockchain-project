const PaperManagement = artifacts.require("PaperManagement");

module.exports = function(deployer) {
	deployer.deploy(PaperManagement);
};
