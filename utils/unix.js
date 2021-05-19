const fetch = require('node-fetch');
var moment = require('moment');
const cheerio = require('cheerio');
var log = require('./untils/logger');


let unixTime = function(){
    var start = new Date();
    fetch('https://time.is/Unix_time_now')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body);
        let accurate_time = $('#clock').text()
        var end = new Date()
        let delay = (end-start) / 1000
        let accurate_unix_time = Number(accurate_time)+delay
        //console.log(accurate_unix_time)
        let local_unix_time = moment().unix()

        let diff = (accurate_unix_time-local_unix_time) * 1000

        log('Your Local Machine is off by: '+diff+' MS','info')
        //log('Local Machine Time: '+moment.unix(local_unix_time).format("dddd, MMMM Do YYYY, h:mm:ss:SSS a    "),'info')
        //log('Time.is Time: '+moment.unix(accurate_unix_time).format("dddd, MMMM Do YYYY, h:mm:ss:SSS a    "),'info')


 
    });
    
}


module.exports = unixTime;