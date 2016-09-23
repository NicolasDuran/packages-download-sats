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

    if (cb && typeof cb === 'function') return cb(err);
    throw err;
  }

  let isPackagesArray = Array.isArray(packages);
  if (isPackagesArray) {
    if (!packages.length) {
      const err = new Error('Function called with empty packages array');

      if (cb && typeof cb === 'function') return cb(err);
      throw err;

    } else if (packages.some(s => !s)) {
      const err = new Error('Function called with packages array containing undefined/null/empty-string');

      if (cb && typeof cb === 'function') return cb(err);
      throw err;
    } else if (packages.length === 1) {
      //Array of size 1 shouldn't be treated as array
      isPackagesArray = false;
    }
    packages = packages.join(',');
  }

  const resultPromise = request(`${baseUrl}/${timing}/${packages}`, {json: true})
    .then(s => {
      if (isPackagesArray) {
        for (const pkg in s) {
          s[pkg] = s[pkg].downloads;
        }
        return s;
      } else {
        return s.downloads;
      }
    });

  if (cb && typeof cb === 'function') {
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
    .then(([monthlyStats, weeklyStats, dailyStats]) => {
      const packagesStats = {};
      if (Array.isArray(packages) && packages.length > 1) {
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

    if (cb && typeof cb === 'function') {
      return allStatsPromise.then(s => cb(null, s)).catch(e => cb(e));
    } else {
      return allStatsPromise;
    }
  }
}

module.exports = new packagesStatsFetcher();
