const packagesDownloadStats = require('./../../index');
const expect = require('chai').expect;
describe('Promises', function() {

  describe('fetchAllStats', function() {
    it('Invalid single package name', function(done) {
      packagesDownloadStats.fetchAllStats('')
        .then(stats => {
          return done(new Error('This test should throw an error'));
        })
        .catch(err => {
          done();
        });
    });

    it('Invalid package name in array', function(done) {
      packagesDownloadStats.fetchAllStats([null, 'request', 'express'])
        .then(stats => {
          return done(new Error('This test should throw an error'));
        })
        .catch(err => {
          done();
        });
    });

    it('Single existing package', function(done) {
      packagesDownloadStats.fetchAllStats('express')
        .then(stats => {
          expect(stats).to.have.property('monthly');
          expect(stats).to.have.property('weekly');
          expect(stats).to.have.property('daily');
          done();
        })
        .catch(done);
    });

    it('Array of existing packages', function(done) {
      const packages = ['express', 'request', 'async'];
      packagesDownloadStats.fetchAllStats(packages)
        .then(stats => {
          packages.forEach(s => {
            expect(stats).to.have.property(s);
            expect(stats[s]).to.have.property('monthly');
            expect(stats[s]).to.have.property('weekly');
            expect(stats[s]).to.have.property('daily');
          });
          done();
        })
        .catch(done);
    });

    const methods = ['fetchMonthlyStats', 'fetchWeeklyStats', 'fetchDailyStats'];
    methods.forEach(methodName => {
      describe(methodName, function() {
        it('Empty array', function(done) {
          packagesDownloadStats[methodName]([])
            .then(s => {
              return done(new Error('This test was supposed to return an Error'));
            })
            .catch(err => {
              expect(err).to.be.an('error');
              done();
            });
        });

        it('Invalid single package name', function(done) {
          packagesDownloadStats[methodName](null)
            .then(s => {
              return done(new Error('This test was supposed to return an Error'));
            })
            .catch(err => {
              expect(err).to.be.an('error');
              done();
            });
        });

        it('Correct but not existing package', function(done) {
          packagesDownloadStats[methodName]('thispackagedoesntexist')
            .then(s => {
              return done(new Error('This test was supposed to return an Error'));
            })
            .catch(err => {
              expect(err).to.be.an('error');
              done();
            });
        });

        it('Invalid package name in array', function(done) {
          packagesDownloadStats[methodName]([undefined, 'request', 'express'])
            .then(s => {
              return done(new Error('This test was supposed to return an Error'));
            })
            .catch(err => {
              expect(err).to.be.an('error');
              done();
            });
        });

        it('Single existing package', function(done) {
          packagesDownloadStats[methodName]('express')
            .then(stats => {
              expect(stats).to.be.above(-1);
              done();
            })
            .catch(done);
        });

        it('Array of existing packages', function(done) {
          const packages = ['express', 'request', 'async'];
          packagesDownloadStats[methodName](packages)
            .then(stats => {
              packages.forEach(s => {
                expect(stats).to.have.property(s);
                expect(stats[s]).to.be.above(-1);
              });
              done();
            })
            .catch(done);
        });

        it('Array of size 1 of existing package', function(done) {
          packagesDownloadStats[methodName](['express'])
            .then(stats => {
              expect(stats).to.have.property('express');
              expect(stats.express).to.be.above(-1);
              done();
            })
            .catch(done);
        });
      });
    });
  });
});

