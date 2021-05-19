const fs = require('fs')
var log = require(__dirname+'/utils/logger.js')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())



fs.readFile(__dirname+'/cookies.json', 'utf8' , (err, data) => {
  if (err) {
      log(err, 'err')
    return
  }
  if(data.length === 0){
      //console.log('No Cookies')
      log('No Cookies Sending to Login', 'init')

      ///input login here
      login()


  } else {
      /// input use cookies here
      log('No Login Required. Cookies Already Stored', 'init')

      process.exit()





  }
})


async function login(){
  global.browser = await puppeteer.launch({headless: true,args: ['--no-sandbox']});
  global.page = await browser.newPage();

  await page.setRequestInterception(true);
    page.on('request', request => {
    if (request.url().endsWith('.html'))
        request.abort();
    else
      request.continue();
});



  await page.goto("https://www.chegg.com/writing/login/", {waitUntil: 'networkidle2'});
  await page.waitForTimeout(1000)
  await page.type('#emailForSignIn', 'blakebein@gmail.com', {delay: 100}); // Types slower, like a user enter username here
  await page.type('#passwordForSignIn', '4Craftmine()', {delay: 100}); // Types slower, like a user enter pass here
  await page.click('#eggshell-2 > form > div > div > div > footer > button'); // Types slower, like a user


  await page.waitForSelector('#citation-widget', {visible: true})
  log('Login Good','ok')



  const cookies = await page.cookies();
  console.log(cookies.length)
  await fs.writeFileSync('./cookies.json', '', function(){console.log('Cookies Cleared')})

  //console.log(cookies)
  await fs.writeFileSync('./cookies.json', JSON.stringify(cookies, null, 2))
  //await fs.writeFileSync('./cookies.json', cookies, function(){console.log('Cookies Cleared')})
  log('Cookies Saved')



  await browser.close()
}





