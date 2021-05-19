const fetch = require('node-fetch');
var moment = require('moment');
const cheerio = require('cheerio');
var log = require('./untils/logger')

let accurateTime = function(){
    var start = new Date();
    fetch('https://time.is/')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body);
        let accurate_time = $('#clock').text()
        var end = new Date()
        let delay = end-start
        log('Accurate Time From Time.is: '+accurate_time+' With a Response Delay of '+delay+' MS','info')
        
    });
    
}


module.exports = accurateTime