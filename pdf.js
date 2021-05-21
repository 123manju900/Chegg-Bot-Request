const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const fs = require('fs')
var log = require(__dirname+'/utils/logger.js')
const imagesToPdf = require("images-to-pdf")




fs.readFile(__dirname+'/PDFS/pdfsURL.txt', 'utf8', function(err, data) {
    if (err) throw err;
    log('URLs Loaded from: ' + '/PDFS/pdfsURL.txt');
    let data_toarray = data.split('\n')
    main(data_toarray)
})




async function main(data){
  let array_length = data.length
  let x = 0

  while(x<=array_length-1){
    global.browser = await puppeteer.launch({headless: true,args: ['--no-sandbox']});
    global.page = await browser.newPage();
    log('Browser Deployed.', 'init')
    const cookiesString = await fs.readFileSync('./allCookies.json');
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);
    log('Cookies Loaded to Browser.', 'info')
    await page.goto(data[x], {waitUntil: 'networkidle2'});
    log('Generating PDF for: '+ data[x],'info')


                    //question
                    try {
                      const element_question = await page.$('body > div.chg-body.no-nav.no-subnav.header-nav > div.chg-container.center-content > div.chg-container-content > div.chg-global-content > div > div.parent-container.question-headline > div.main-content.question-page > div.dialog-question > div.question.txt-small > div.txt-body.question-body.mod-parent-container');        // declare a variable with an ElementHandle
                      await element_question.screenshot({path: __dirname+'/PDFS/question.png'});
                  } catch (error) {
                      log('Error on Answer Screenshot','err')
                  }
                  //answer
                  try {
                      const element_answer = await page.$('body > div.chg-body.no-nav.no-subnav.header-nav > div.chg-container.center-content > div.chg-container-content > div.chg-global-content > div > div.parent-container.question-headline > div.main-content.question-page > div.dialog-question > div.answers-wrap > ul > li > div.answer.txt-small.mod-parent-container > div.txt-body.answer-body');        // declare a variable with an ElementHandle
                      await element_answer.screenshot({path: __dirname+'/PDFS/answer.png'});
                  } catch (error) {
                      log('Error on Answer Screenshot', 'err')
                  }
  
  
                  //generate pdf
                  await imagesToPdf([__dirname+'/PDFS/question.png', __dirname+'/PDFS/answer.png'], __dirname+"/PDFS/"+makeid(10)+".pdf")





    browser.close()
    log('Closed. TASK: '+x)
    x++
  }
  await fs.writeFileSync(__dirname+'/PDFS/pdfsURL.txt', '', function(){console.log('')})
  log('PDF URLS CLEARED','ok')
}






function makeid(length) {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 return result.join('');
}