const fs = require('fs');
var log = require('./untils/logger')
var moment = require('moment');


let toLog = function(data){
    var time = moment().format('dddd, MMMM Do YYYY, h:mm:ss a    ');
    fs.appendFile('LOG.txt', time+data+'\n', function (err) {
        if (err){
            log(err,'err')
        }
        log('Wrote Data to ./LOG.txt','log')
      })
}

module.exports = toLog;