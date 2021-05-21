const fs = require('fs');
var log = require(__dirname+'/utils/logger.js')



let toHTML = function(file, data){
    fs.writeFile(file, data, function (err) {
        if (err){
            log(err,'err')
        }
        //log('Wrote '+file,'ok')
      })
}


module.exports = toHTML;