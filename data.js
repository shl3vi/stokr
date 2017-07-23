let data = {
  stocks: [
    {
      "Symbol": "WIX",
      "Name": "Wix.com Ltd.",
      "Change": "0.750000",
      "PercentChange": "+1.51%",
      "LastTradePriceOnly": "76.099998"
    },
    {
      "Symbol": "MSFT",
      "Name": "Microsoft Corporation",
      "PercentChange": "-2.09%",
      "Change": "-0.850006",
      "LastTradePriceOnly": "69.620003"
    },
    {
      "Symbol": "YHOO",
      "Name": "Yahoo! Inc.",
      "Change": "0.279999",
      "PercentChange": "+1.11%",
      "LastTradePriceOnly": "50.599998"
    }
  ],

  stocksDisplayOrder : {},

  initStocksDisplayOrder: function () {
    this.stocks.forEach((stock, index) => {
      index = parseInt(index);
      this.stocksDisplayOrder[index] = index;
    });
  },

  reorderStocksUp : function(index) {
    index = parseInt(index);
    if (index === 0){
      return;
    }

    utils.swapInArray(data.stocksDisplayOrder, index, index - 1);
  },

  reorderStocksDown : function(index) {
    index = parseInt(index);
    const lastIndex = data.stocksDisplayOrder.length - 1;
    if (index === lastIndex){
      return;
    }

    utils.swapInArray(data.stocksDisplayOrder, index, index + 1);
  }
};
