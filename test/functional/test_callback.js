const packagesDownloadStats = require('./../../index');
const expect = require('chai').expect;

describe('Callbacks', function() {
  describe('fetchAllStats', function() {
    it('Invalid single package name', function(done) {
      packagesDownloadStats.fetchAllStats(null, function(err, stats) {
        expect(err).to.be.an('error');
        expect(stats).to.be.an('undefined');
        done();
      });
    });

    it('Correct but not existing package', function(done) {
      packagesDownloadStats.fetchAllStats('thispackagedoesntexist', function(err, stats) {
        expect(err).to.be.an('error');
        expect(stats).to.be.an('undefined');
        done();
      });
    });

    it('Invalid package name in array', function(done) {
      packagesDownloadStats.fetchAllStats([undefined, 'request', 'express'], function(err, stats) {
        expect(err).to.be.an('error');
        expect(stats).to.be.an('undefined');
        done();
      });
    });

    it('Single existing package', function(done) {
      packagesDownloadStats.fetchAllStats('express', function(err, stats) {
        if (err) return done(err);
        expect(stats).to.have.property('monthly');
        expect(stats).to.have.property('weekly');
        expect(stats).to.have.property('daily');
        done();
      });
    });

    it('Array of size 1 with existing package', function(done) {
      packagesDownloadStats.fetchAllStats(['express'], function(err, stats) {
        if (err) return done(err);
        expect(stats).to.have.property('express');

        expect(stats.express).to.have.property('monthly');
        expect(stats.express).to.have.property('weekly');
        expect(stats.express).to.have.property('daily');
        done();
      });
    });

    it('Array of existing packages', function(done) {
      const packages = ['express', 'request', 'async'];
      packagesDownloadStats.fetchAllStats(packages, function(err, stats) {
        if (err) return done(err);
        packages.forEach(s => {
          expect(stats).to.have.property(s);
          expect(stats[s]).to.have.property('monthly');
          expect(stats[s]).to.have.property('weekly');
          expect(stats[s]).to.have.property('daily');
        });
        done();
      });
    });
  });

  describe('fetchMonthlyStats', function() {
    it('Single existing package', function(done) {
      packagesDownloadStats.fetchMonthlyStats('express', function(err, stats) {
        if (err) return done(err);
        expect(stats).to.be.above(-1);
        done();
        });
      });

    it('Array of size 1 of existing package', function(done) {
      packagesDownloadStats.fetchMonthlyStats(['express'], function(err, stats) {
        expect(stats).to.have.property('express');
        done(err);
      });
    });

    it('Array of existing packages', function(done) {
      packagesDownloadStats.fetchMonthlyStats(['express', 'request', 'async'], function(err, stats) {
        expect(stats).to.have.property('express');
        expect(stats).to.have.property('request');
        expect(stats).to.have.property('async');
        done(err);
      });
    });
  });

});
