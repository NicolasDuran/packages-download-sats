const packagesDownloadStats = require('./../../index');

describe('Promises', function() {

  describe('fetchAllStats', function() {
    it('Invalid single package name', function(done) {
      packagesDownloadStats.fetchAllStats('')
        .then(function(stats) {
          return done();
        })
        .catch(done);
    });

    it('Invalid package name in array', function(done) {
      packagesDownloadStats.fetchAllStats([null, 'request', 'express'])
        .then(function(stats) {
          return done();
        })
        .catch(done);
    });

    it('Single existing package', function(done) {
      packagesDownloadStats.fetchAllStats('express')
        .then(function(stats) {
          return done();
        })
        .catch(done);
    });

    it('Array of existing packages', function(done) {
      packagesDownloadStats.fetchAllStats(['express', 'request', 'async'])
        .then(function(stats) {
          return done();
        })
        .catch(done);
    });
  });

  describe('fetchMonthlyStats', function() {
    it('Single existing package', function(done) {
      packagesDownloadStats.fetchMonthlyStats('express')
        .then(function(stats) {
          return done();
        })
        .catch(done);
    });

    it('Array of existing packages', function(done) {
      packagesDownloadStats.fetchMonthlyStats(['express', 'request', 'async'])
        .then(function(stats) {
          return done();
        })
        .catch(done);
      });
  });

});
