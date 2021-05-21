const fs = require('fs');
var log = require('C:/Users/blake/Documents/GitHub/Chegg-Bot-Request/utils/logger.js')



let toHTML = function(file, data){
    fs.writeFile(file, data, function (err) {
        if (err){
            log(err,'err')
        }
        //log('Wrote '+file,'ok')
      })
}


module.exports = toHTML;