var fetch = require('node-fetch');
var toHTML = require(__dirname+'/utils/toHTML.js')
const cheerio = require('cheerio');
const fs = require('fs')
var moment = require('moment'); // require
const Discord = require('discord.js');
const client = new Discord.Client();
var log = require(__dirname+'/utils/logger.js')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())






client.on('ready', () => {
    log(`Logged in to Discord as ${client.user.tag}`, 'init')
});




client.on('message', message => {
    //let rawdata = message.author.username+'#'+message.author.discriminator+' Requested  Server info: serverName: '+message.guild.name+' ServerID: '+message.guild.id+' ChannelID: '+message.channel.id
    //whoRequestRaw(rawdata) raw data breaks script sometimes so if its nec add a try catch
    
    try {
        if(message.member.hasPermission(['SEND_MESSAGES'])) {
            if(message.content.startsWith(`https://www.chegg.com/`)) {
                //var s = message.content.replace('!chegg', '')
                var noq = message.content.split("?")[0]; //removes track id 

                // URLS FOR LATER PDF GENERATION FOR CH
                fs.appendFileSync(__dirname+'/PDFS/pdfsURL.txt',noq+'\n')


    
                let server = message.guild.name
                let serverid = message.guild.id
                let channelID = message.channel.id
                let data = message.author.username+'#'+message.author.discriminator+' Requested: '+noq+'  Server info: serverName: '+server+' ServerID: '+serverid+' ChannelID: '+channelID
                log(message.author.username+'#'+message.author.discriminator+' Requested: '+noq, 'info')

            
    
                let start_time = new Date().getTime();



                fetch(noq, {
                    headers: {
                        'Host': 'www.chegg.com',
                        'cache-control': 'max-age=0',
                        'upgrade-insecure-requests': '1',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'sec-gpc': '1',
                        'sec-fetch-site': 'none',
                        'sec-fetch-mode': 'navigate',
                        'sec-fetch-user': '?1',
                        'sec-fetch-dest': 'document',
                        'accept-language': 'en-US,en;q=0.9',
                        'Cookie': ''
                    }
                })    .then(res => res.text())
                .then(body => {
                    //toHTML('webiste.html',body)
                    let $ = cheerio.load(body)
                    toHTML('body.html',body)
                    
                
                    let question = $("body > div.chg-body.no-nav.no-subnav.header-nav > div.chg-container.center-content > div.chg-container-content > div.chg-global-content > div > div.parent-container.question-headline > div.main-content.question-page > div.dialog-question > div.question.txt-small > div.txt-body.question-body.mod-parent-container > div.ugc-base.question-body-text").text()

                    try {

                        let answer = $('body > div.chg-body.no-nav.no-subnav.header-nav > div.chg-container.center-content > div.chg-container-content > div.chg-global-content > div > div.parent-container.question-headline > div.main-content.question-page > div.dialog-question > div.answers-wrap > ul > li > div.answer.txt-small.mod-parent-container > div.txt-body.answer-body > div.answer-given-body.ugc-base').html();
                        $ = cheerio.load(answer);
                        $("img").each(function() {

                            var old_src=$(this).attr("src");
                            if(old_src.includes('https:') === false){
                                var new_src = "https:" + old_src;
                                log('Fixing Broken URL : ' + new_src,'ok')
                                $(this).attr("src", new_src); 
                            } 
           
                    });
                    

                        toHTML('answer.html',$.html())
                        //fs.appendFileSync('./answer.html', question)
                        message.channel.send('<@'+message.author.id+'>', {files: ['./answer.html']});
                    } catch (error) {
                        log('Error on Answer Method 1')
                        toBrowser(noq)

                        //message.channel.send('Sorry, '+ '<@'+message.author.id+'>' +' that question type not supported in this bot use '+'<#'+'835956966308315197'+'>'+ ' bot or see '+'<#'+'846159167584600065'+'>');
                    }

                    // try {
                    //     let answer = $('#solution-player-sdk').text();
                    //     toHTML('answer.html',answer)
                    // } catch (error) {
                    //     log('Error on Answer Method 2')
                    // }
                    //console.log(answer)
                    //toHTML('answer.html',answer)

                
                
                
                
                
                    let time = new Date().getTime() - start_time
                
                    
                    log('Response Time: ' + time+' MS','info')


                    log(`Image Requested by `+message.author.username+' Sent to Server', 'ok')

                    whoRequest(data)
                });
    
    
                    
    
                    
    
    
    

                //message.channel.send(message.author.username, {files: ['./answer.html']});




                
    
    

    
            }
        }
    } catch (error) {
        log('User does not have permission to speak','info')
    }





    async function toBrowser(noq){
        global.browser = await puppeteer.launch({headless: true,args: ['--no-sandbox']});
        global.page = await browser.newPage();
    
    
        await page.setRequestInterception(true);
        page.on('request', request => {
        if (request.url().endsWith('.file'))
            request.abort();
        else
          request.continue();
        });
    
        const cookiesString = await fs.readFileSync('./allCookies.json');
        const cookies = JSON.parse(cookiesString);
        await page.setCookie(...cookies);
    
    
        await page.goto(noq, {waitUntil: 'networkidle2', timeout: 0});
        global.screenshot = await page.screenshot({path: 'test.png', fullPage: true});
        message.channel.send('<@'+message.author.id+'>', {files: [screenshot]});
        await browser.close()
    }
})






async function whoRequest(info){
    fs.appendFileSync('./log.txt', moment().format("dddd, MMMM Do YYYY, h:mm:ss a    ")+info+'\n')
    log('Wrote Info to /Logs.txt', 'info')
    
}







client.login('');
