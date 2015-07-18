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
      this.solrSystem = SolrSystem;
      this.setPrices();
    }

    this.setPrices = function() {
      // The maximum strength a solr system can begin with is 150. Scale by this.
      var relativeStrength = this.solrSystem.strength / 150;
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

    this.sellGoods = function(numSold) {
       this.assets -= numSold;
       this.solrSystem.strength += 0.5 * (numSold * pricePerUnit);
    }
	}

  return StoreModel;
});
