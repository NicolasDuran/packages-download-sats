Packages download statistics
============================
> Get daily/weekly/monthly download stats of npm packages


# Installation

``` sh
$ npm install packages-download-stats
```


# Usage

## With callbacks

### Get all stats (monthly/weekly/daily)
``` javascript
const packagesDownloadStats = require('packages-download-stats');

packagesDownloadStats.fetchAllStats('express', function(err, stats) {
  if (err) {
    throw err;
  }
  console.log(stats);
});
// { monthly: 7152400, weekly: 1748949, daily: 308025 }


packagesDownloadStats.fetchAllStats(['express', 'request', 'async'], function(err, stats) {
  if (err) {
    throw err;
  }
  console.log(stats);
});
/* 
{ 
  express: { monthly: 7152400, weekly: 1748949, daily: 308025 },
  request: { monthly: 17370394, weekly: 4112755, daily: 764052 },
  async: { monthly: 38006169, weekly: 8594132, daily: 1532744 } 
} 
*/
```

### Get specific stat 
```javascript
//Works with fetchMonthlyStats, fetchWeeklyStats, fetchDailyStats
packagesDownloadStats.fetchMonthlyStats('express', function(err, stats) {
  if (err) { 
    throw err;
  }
  console.log(stats);
});
// 7152400

packagesDownloadStats.fetchMonthlyStats(['express', 'request', 'async'], function(err, stats) {
  if (err) {
    throw err;
  }
  console.log(stats);
});
//{ async: 38006169, express: 7152400, request: 17370394 }
```


## With promises

### Get all stats (monthly/weekly/daily)
``` javascript
const packagesDownloadStats = require('packages-download-stats');

const packagesDownloadStats = require('./../index');

packagesDownloadStats.fetchAllStats(['express', 'request', 'async'])
  .then(function(stats) {
    console.log(stats);
  })
  .catch(function(err) { /* ... */ });
/* 
{ 
  express: { monthly: 7152400, weekly: 1748949, daily: 308025 },
  request: { monthly: 17370394, weekly: 4112755, daily: 764052 },
  async: { monthly: 38006169, weekly: 8594132, daily: 1532744 } 
} 
*/

packagesDownloadStats.fetchAllStats('express')
  .then(function(stats) {
    console.log(stats);
  })
  .catch(function(err) { /* ... */ });
// { monthly: 7152400, weekly: 1748949, daily: 308025 }
```

### Get a specific stat 
```javascript
packagesDownloadStats.fetchMonthlyStats('express')
  .then(function(stats) {
    console.log(stats);
  })
  .catch(function(err) { /* ... */ });
// 7152400

packagesDownloadStats.fetchMonthlyStats(['express', 'request', 'async'])
  .then(function(stats) {
    console.log(stats);
  })
  .catch(function(err) { /* ... */ });
//{ async: 38006169, express: 7152400, request: 17370394 }
```



## License

[MIT license](http://opensource.org/licenses/MIT).