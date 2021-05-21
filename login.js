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
  await page.type('#emailForSignIn', '', {delay: 100}); // Types slower, like a user enter username here
  await page.type('#passwordForSignIn', '', {delay: 100}); // Types slower, like a user enter pass here
  await page.click('#eggshell-2 > form > div > div > div > footer > button'); // Types slower, like a user


  await page.waitForSelector('#citation-widget', {visible: true})
  log('Login Good','ok')

  await page.goto("https://www.chegg.com/writing/login/", {waitUntil: 'networkidle2'});


  
  const cookiess = await page.cookies();
  await fs.writeFileSync('./allCookies.json', '', function(){console.log('Cookies Cleared')})
    
  //console.log(cookies)
  await fs.writeFileSync('./allCookies.json', JSON.stringify(cookiess, null, 2))
  //console.log(cookies)
    //await fs.writeFileSync('./cookies.json', cookies, function(){console.log('Cookies Cleared')})





  await fs.writeFileSync('./cookies.json', '', function(){console.log('Cookies Cleared')})
  await page.waitForTimeout(5000)
  const cookies = await page.cookies();
  console.log(cookies.length)
  log('Cookies Saved')
  let allCookies = [];
  for(let i=0; cookies.length > i; i++) {
    if(cookies[i].name==='id_token'){
      allCookies.push(`${cookies[i].name}=${cookies[i].value}`);
    }
  
  };
  let cookie = allCookies.join('; ');
  await fs.writeFileSync('./cookies.json', cookie)


  await browser.close()
}





