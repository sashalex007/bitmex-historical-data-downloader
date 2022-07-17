# Bitmex historical data downloader

A simple nodeJS script for downloading bitmex historical data (candles only). Data is formated for use with my Java backtesting simulator (coming soon).

1. `npm install`

2. Modify parameters `var opts = {
    'binSize': "1d", // String | Time interval to bucket by. Available options: [1m,5m,1h,1d].
    'partial': true, // Boolean | If true, will send in-progress (incomplete) bins for the current time period.
    'symbol': "XBTUSD", // String | Instrument symbol. Send a bare series (e.g. XBU) to get data for the nearest expiring contract in that series.  You can also send a timeframe, e.g. `XBU:monthly`. Timeframes are `daily`, `weekly`, `monthly`, `quarterly`, and `biquarterly`.
    'count': 750, // Number | Number of results to fetch.
    'start': 0, // Number | Starting point for results.
    'reverse': false, // Boolean | If true, will sort results newest first.
    'startTime': new Date(1501560000000) // Date | Starting date filter for results.
    // Date | Ending date filter for results.
};`

3. Run `node downloader_script.js`



