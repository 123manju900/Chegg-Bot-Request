var log = require('./untils/logger.js')
var toHTML = require('./untils/toHTML.js')
var toLog = require('./untils/toLog.js')
var accurateTime = require('./untils/accurateTime.js')
var toDiscord = require('./untils/toDiscord.js')
var cookies = require('./untils/Cookies')
var unixTime = require('./untils/unix.js')

var saveCookies = cookies.saveCookies
var useCookies = cookies.useCookies
var clearCookies = cookies.clearCookies




//LOG = log('Message Contents','Type of log')
log('This is a Success log','ok')
log('This is a Error log','err')

//toHtml = toHTML(fileName, Rawhtml)
toHTML('website.html','<p>Sample Paragraph</p>')

//ToLog = toLog(data)
toLog('User requested x data')

//AccurateTime = Time from time.is w/ delay
accurateTime()

//toDiscord = toDiscord('Message Contents','Type of Message')
// Will error if you dont have config.json filled out
toDiscord('The Test worked','ok')



//saveCookies will save your current session to a json file. First it will delete old data
//will need to make the json file before hand
saveCookies('Cookies.json','cookie: dfgdgdgdgd')


//usecookie will return your current cookies from saved file hopefully lol
//useCookies('Cookies.json')

//clearCookies clears your saved cookies
clearCookies('Cookies.json')


//Unix.js Should be more accurate then the previous time file
unixTime()

