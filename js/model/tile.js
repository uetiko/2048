define([ 'backbone', 'model/symbols', 'model/symbol' ], function(Backbone,
		Symbols, Symbol) {

	var Tile = Backbone.Model
			.extend({

				defaults : {
					value : 0,
					x : 0,
					y : 0
				},

				empty : function() {
					this.set('symbols', new Symbols());
					this.set('value', this.get('symbols').sum());
				},

				merge : function(oTile) {
					var oSymbols = oTile.get('symbols'), symbols = this
							.get('symbols'), matchedSymbol;
					for (var i = 0; i < oSymbols.length; i++) {
						var oSymbol = oSymbols.at(i);
						matchedSymbol = symbols.findWhere({
							'name' : oSymbol.get('name')
						});
						if (matchedSymbol) {
							matchedSymbol.set('value', matchedSymbol
									.get('value')
									+ oSymbol.get('value'));
						} else {
							matchedSymbol = new Symbol({
								name : oSymbol.get('name'),
								value : oSymbol.get('value')
							});
							symbols.add(matchedSymbol);
						}
					}
					this.set('value', this.get('symbols').sum());
					oTile.empty();
				},

				canMerge : function(oTile) {
					return this.get('value') == oTile.get('value')
							&& this.containSymbol(oTile);
				},

				containSymbol : function(oTile) {
					var oSymbols = oTile.get('symbols'), symbols = this
							.get('symbols'), matched;
					for (var i = 0; i < oSymbols.length; i++) {
						matched = symbols.findWhere({
							'name' : oSymbols.at(i).get('name')
						});
						if (matched) {
							return true;
						}
					}
					return false;
				},

				toString : function() {
					return this.get('x') + ' ' + this.get('y') + ' '
							+ this.get('value');
				}

			});

	return Tile;
});