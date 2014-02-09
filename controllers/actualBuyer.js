var system = require('system');
var casper = require('casper').create({
    pageSettings: {
        loadImages: false,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20130404 Firefox/23.0"
    }
});

item = casper.cli.args[0];
email = 'johan.menac@gmail.com';
password = '';
// This reads in the values but fails to sign in
// email = casper.cli.args[1],
// password = casper.cli.args[2];

casper.on('run.complete', function() {
    this.echo('Job run completed');
}).on('run.start', function() {
    this.echo('Job run starting');
}).on('http.status.200', function(resource) {
    casper.echo('Retrieved: ' + resource.url + ' with status code 200');
}).on('open', function(location, settings) {
    casper.echo('Opened: ' + location + " with method: " + settings.method);
});

casper.start(item, function() {
    try {
        this.mouseEvent('click', 'div#oneClickSignIn a');
    }
    catch (e) {
        try {
            casper.echo('Class selector failed. Trying id.');
            this.mouseEvent('click', 'a#oneClickSignInLinkID');
        }
        catch (e) {
            casper.echo('ID selector failed. Trying without.');
            this.mouseEvent('click', 'a.oneClickSignInLink');
        }
    }
});

casper.then(function() {
    this.fill('form', {
      'email'    : email,
      'password' : password
    }, true);
});

casper.then(function() {
    casper.echo(this.getCurrentUrl());

    try {
        this.mouseEvent('click', '#oneClickSingleClick');
    }
    catch (e) {
      casper.echo('Buying failed');
        try {
            casper.echo('Do not lose hope. Trying different id now.');
            this.mouseEvent('click', 'a#oneClickSingleLink');
        }
        catch (e) {
            casper.echo('ID selector failed. Trying without.');
            this.mouseEvent('click', 'a.oneClickSignInLink');
            try {
                casper.echo('Class selector failed. Trying id.');
                this.mouseEvent('click', 'a#oneClickSignInLinkID');
            }
            catch (e) {
                casper.echo('ID selector failed. Trying without.');
                this.mouseEvent('click', 'a.oneClickSignInLink');
            }
        }
    }
});

casper.run();
