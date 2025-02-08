var validatorUtilities = require('./validator');
const validator = require("./validator");
var ChainUtilities = function ChainUtilities(){

  var self = this;

  this.isValidChain = isValidChain;

  function isValidChain(chain){
    if(chain.length>0){
      for (var i = 1; i < chain.length; i++) {
        var lastBlockHash = validatorUtilities.calculateHash(chain[i-1].transaction[0]);
        if(lastBlockHash !== chain[i].previousHash){
            console.log("1er if")
          return false;
        }
        if(validatorUtilities.generateProof(chain[i].transaction[0]) !== chain[i].proof){
            console.log("2e if")
          return false;
        }
        if (chain[i].index === undefined || chain[i].timestamp === undefined ||
            chain[i].transaction === undefined || chain[i].transaction === [] ||
            chain[i].proof === undefined || chain[i].previousHash === undefined){
            console.log("3e if")
            return false
        }
      }
    }
    return true;
  }

  if(ChainUtilities.caller != ChainUtilities.getInstance){
		throw new Error("This object cannot be instanciated");
	}

};


ChainUtilities.instance = null;
ChainUtilities.getInstance = function(){
	if(this.instance === null){
		this.instance = new ChainUtilities();
	}
	return this.instance;
};

module.exports = ChainUtilities.getInstance();
