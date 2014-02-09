/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.postForm = function(req, res, next) {
  console.log(req.body);
  amazonProducts(req.body.wishlist, function(products){
    var Buyer = require('./buyer');
    var buyer = new Buyer(products, req.body.budget);
    buyer.initializeCasper();
    buyer.run();
    res.render('home', {
      title: 'Enjoy'
    });
  });

};

function amazonProducts(url, callback) {
  var exec = require('child_process').exec;
  var script_path = '~/code/hackathons/devfest/test/controllers/scraper.rb';
  var command = 'ruby ' + script_path + ' ' + url;
  exec(command, function(error, stdout, stderr) {
    var products = JSON.parse(stdout);
    callback(products);
  });
};

