define(
  [
    'jquery',
    'chance'
  ], function($, Chance) {
  var StoreModel = function(storeType) {
    this.type = storeType;
    this.chance = new Chance();

    this.init = function(SolrSystem) {
      this.assets = this.chance.natural({min: 1000, max: 10000});
      this.setPrices();
    }

    // Strength is the strength of the solr system we're in
    this.setPrices = function(strength) {
      // The maximum strength a solr system can begin with is 150. Scale by this.
      var relativeStrength = strength / 150;
      switch(this.type) {
        case 'fuel':
          this.pricePerUnit = 8;
        case 'food':
          this.pricePerUnit = 5;
        case 'weapons':
          this.pricePerUnit = 2;
        case 'repairs':
          this.pricePerUnit = 10;
      }
      this.pricePerUnit *= relativeStrength;
    }

    // Return the number we should add to the strength of the solr system
    this.sellGoods = function(numSold) {
       this.assets -= numSold;
       return 0.5 * (numSold * pricePerUnit);
    }
	}

  return StoreModel;
});
