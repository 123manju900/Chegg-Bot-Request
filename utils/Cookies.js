const fs = require('fs');


var log = require('./untils/logger.js')

// let useCookies = function(file){
//     fs.readFile(file, 'utf8' , (err, data) => {
//         if (err) {
//             log('Could not get Cookies From '+file, 'err');
//           return
//         }
//         if(data.length === 0){
//             log('No Cookies found in '+file, 'err');
//             return
//         } else {
//             log('Fetched Cookies From '+file, 'ok');
//             const cookiesString = fs.readFileSync(file);
//             const cookies = JSON.parse(cookiesString)
//             setTimeout(function () {
//                 return cookies
//               }, 5000)
            
//         }

//       })
     
// }







let saveCookies = function(file,CookieData){
    fs.readFile(file, 'utf8' , (err, data) => {
        if (err) {
            log('Could not Read old Cookies From '+file, 'err');
          return
        } else {
            fs.writeFileSync(file, '')
            fs.writeFileSync(file, JSON.stringify(CookieData, null, 2))
            log('Saved Cookies to '+file, 'ok');
            return
        }
      })

}


let clearCookies= function(file){
    fs.readFile(file, 'utf8' , (err, data) => {
        if (err) {
            log('Could not Read old Cookies From '+file, 'err');
          return
        } else {
            fs.writeFileSync(file, '')
            log('Cleared Cookies From '+file, 'ok');
            return
        }
      })

}


module.exports = {
    //useCookies,
    saveCookies,
    clearCookies
};