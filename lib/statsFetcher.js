'use strict';

const request = require('request-promise');

const baseUrl = 'https://api.npmjs.org/downloads/point';
const timings = {
  monthly: 'last-month',
  weekly: 'last-week',
  daily: 'last-day'
};

function fetchStats(timing, packages, cb) {
  if (!packages || !timing) {
    const err = new Error('Function called with package or timing equal to undefined/null/empty-string');

    if (cb) return cb(err);
    return Promise.reject(err);
  }

  let isPackagesArray = Array.isArray(packages);
  let packagesStr = packages;
  if (isPackagesArray) {
    if (!packages.length) {
      const err = new Error('Function called with empty packages array');

      return Promise.reject(err);
      if (cb) return cb(err);

    } else if (packages.some(s => !s)) {
      const err = new Error('Function called with packages array containing undefined/null/empty-string');

      if (cb) return cb(err);
      return Promise.reject(err);
    }
    packagesStr = packages.join(',');
  }

  const resultPromise = request(`${baseUrl}/${timing}/${packagesStr}`, {json: true})
    .then(s => {
      if (s.error) {
        return Promise.reject(new Error(s.error));
      }
      //this case is particular because we want the result to be formated
      //the same way it is when we provide the api wirh a package array with length > 1
      if (isPackagesArray && packages.length === 1) {
        return {
          [packages[0]]: s.downloads
        };
      } else if (isPackagesArray) {
        for (const pkg in s) {
          s[pkg] = s[pkg].downloads;
        }
        return s;
      } else {
        return s.downloads;
      }
    });

  if (cb) {
    return resultPromise
      .then(s => cb(null, s))
      .catch(e => cb(e));
  } else {
    return resultPromise;
  }
}

class packagesStatsFetcher {
  fetchMonthlyStats(packages, cb) {
    return fetchStats(timings.monthly, packages, cb);
  }

  fetchWeeklyStats(packages, cb) {
    return fetchStats(timings.weekly, packages, cb);
  }

  fetchDailyStats(packages, cb) {
    return fetchStats(timings.daily, packages, cb);
  }

  fetchAllStats(packages, cb) {
    const allStatsPromise = Promise.all([
      this.fetchMonthlyStats(packages),
      this.fetchWeeklyStats(packages),
      this.fetchDailyStats(packages)
    ])
    .then(promiseValues => {
      const monthlyStats = promiseValues[0];
      const weeklyStats = promiseValues[1];
      const dailyStats = promiseValues[2];

      const packagesStats = {};
      if (Array.isArray(packages)) {
        packages.forEach(pkg => {
          packagesStats[pkg] = {
            monthly: monthlyStats[pkg],
            weekly: weeklyStats[pkg],
            daily: dailyStats[pkg]
          };
        });
      } else {
        packagesStats.monthly = monthlyStats;
        packagesStats.weekly = weeklyStats;
        packagesStats.daily = dailyStats;
      }
      return packagesStats;
    });

    if (cb) {
      return allStatsPromise.then(s => cb(null, s)).catch(e => cb(e));
    } else {
      return allStatsPromise;
    }
  }
}

module.exports = new packagesStatsFetcher();
