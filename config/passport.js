var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var secrets = require('./secrets');
var _ = require('underscore');

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
var flash = require('express-flash');
  res.redirect('/login');
};

exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];
  if (_.findWhere(req.user.tokens, { kind: provider })) next();
  else res.redirect('/auth/' + provider);
};
