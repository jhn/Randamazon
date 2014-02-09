var Buyer = function(items, budget) {
  this.secrets = require('../config/secrets');
  this.accounting = require("accounting");
  this.email = this.secrets.amazon.email;
  this.password = this.secrets.amazon.password;
  this.items = items;
  this.budget = Number(budget);
};

Buyer.prototype = {
  initializeCasper: function() {
  },

  run: function () {
    var casper = 'casperjs';
    var script = '~/code/hackathons/devfest/test/controllers/actualBuyer.js';
    var item = "http://www.amazon.com" + this.items[0].link;
    this.items.sort(function() {
      return .5 - Math.random();
    });

    console.log("Your budget is " + this.budget );
    var itemsToBuy = [];
    for (var i = 0; i < this.items.length && this.budget; i++) {
      var priceN = this.accounting.unformat(this.items[i].price)
      if (this.budget > priceN) {
        itemsToBuy.push(this.items[i]);
        this.budget -= priceN;
        console.log("Now: " + this.budget);
      }
    }

    if (itemsToBuy.length > 0) {
      var totalPrice = 0;
      console.log("There are " + itemsToBuy.length + " items to buy:");
      var _this = this;
      itemsToBuy.forEach(function(i){
        totalPrice += _this.accounting.unformat(i.price);
        console.log(i.name + ": " + _this.accounting.unformat(i.price));
      });
      console.log("Total price: " + totalPrice);
      console.log("Final budget: " + this.budget)
    } else {
      console.log("There are no items to buy.");
    }

    var exec = require('child_process').exec;
    var command = casper + ' ' + script + ' ' + item + ' ' + this.email + ' ' + this.password;

    console.log(command);

     // todo: actually buy it

     exec(command, function(error, stdout, stderr) {
             console.log(stdout);
     });
  }
};

module.exports = Buyer;
