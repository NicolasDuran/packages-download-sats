const packagesDownloadStats = require('./../index');

describe('Callbacks', function() {

  describe('fetchAllStats', function() {
    it('Invalid single package name', function(done) {
      packagesDownloadStats.fetchAllStats(null, function(err, stats) {
        if (err) {
          return done(err);
        };
        done();
      });
    });

    it('Invalid package name in array', function(done) {
      packagesDownloadStats.fetchAllStats([undefined, 'request', 'express'], function(err, stats) {
        if (err) {
          return done(err);
        };
        done();
      });
    });

    it('Single existing package', function(done) {
      packagesDownloadStats.fetchAllStats('express', function(err, stats) {
        if (err) {
          return done(err);
        };
        done();
      });
    });

    it('Array of existing packages', function(done) {
      packagesDownloadStats.fetchAllStats(['express', 'request', 'async'], function(err, stats) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('fetchMonthlyStats', function() {
    it('Single existing package', function(done) {
      packagesDownloadStats.fetchMonthlyStats('express', function(err, stats) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('Array of existing packages', function(done) {
      packagesDownloadStats.fetchMonthlyStats(['express', 'request', 'async'], function(err, stats) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

});
