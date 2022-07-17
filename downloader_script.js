var BitMexApi = require('bit_mex_api');
var fs = require('graceful-fs');


var apiInstance = new BitMexApi.TradeApi();
bitmexCandles = []

var opts = {
    'binSize': "1d", // String | Time interval to bucket by. Available options: [1m,5m,1h,1d].
    'partial': true, // Boolean | If true, will send in-progress (incomplete) bins for the current time period.
    'symbol': "XBTUSD", // String | Instrument symbol. Send a bare series (e.g. XBU) to get data for the nearest expiring contract in that series.  You can also send a timeframe, e.g. `XBU:monthly`. Timeframes are `daily`, `weekly`, `monthly`, `quarterly`, and `biquarterly`.
    'count': 750, // Number | Number of results to fetch.
    'start': 0, // Number | Starting point for results.
    'reverse': false, // Boolean | If true, will sort results newest first.
    'startTime': new Date(1501560000000) // Date | Starting date filter for results.
    // Date | Ending date filter for results.
};

bitmexCall()

function bitmexResponse(error, data, response) {
    if (error) {
        console.error(error);
        console.log('Rate limit exceeded, continuing in 10s...')
        setTimeout(bitmexCall, 10000);
    } else {
        if (data) {
            handleData(data);
        }
        else {
            console.log('Rate limit exceeded, continuing in 10s...')
            setTimeout(bitmexCall, 10000);
        }
    }
}

function bitmexCall() {
    apiInstance.tradeGetBucketed(opts, bitmexResponse)
}

function handleData(data) {
    if (bitmexCandles.length != 0) {
        bitmexCandles.splice(-1, 1)
    }

    for (var i = 0; i < data.length; i++) {
        let tick = data[i];
        var date = new Date(tick.timestamp);
        var time = date.getTime();
        var object = {};

        object.open = tick.open;
        object.close = tick.close;
        object.high = tick.high;
        object.low = tick.low;
        object.timestamp = tick.timestamp;
        object.time = time;
        object.volume = tick.volume;
        bitmexCandles.push(object);

        if (i + 1 == data.length) {
            opts.startTime = object.timestamp;
        }
    }
    console.log(bitmexCandles.length)

    if (data.length == opts.count) {
        console.log("------------------------")
        console.log("next")
        setTimeout(bitmexCall, 500);
    }
    else {
        console.log('Done')
        writeToFile(bitmexCandles);
    }
}

function writeToFile(data) {
    for (var i = 0; i < data.length; i++) {

        fs.appendFileSync(opts['symbol'] + '_' + opts['binSize'] +  '_' + data.length + '.txt', data[i].open + " " + data[i].close + " " + data[i].high + " " + data[i].low + " " + data[i].time + " " + data[i].volume + "\n", function (err) {
            if (err) return console.log(err);
        });
    }
    console.log(data.length + ' candles downloaded')
}