var fetch = require('node-fetch');
var toHTML = require(__dirname+'/utils/toHTML.js')
const cheerio = require('cheerio');
const fs = require('fs')
var moment = require('moment'); // require
const Discord = require('discord.js');
const client = new Discord.Client();
var log = require(__dirname+'/utils/logger.js')










client.on('ready', () => {
    log(`Logged in to Discord as ${client.user.tag}`, 'init')
});




client.on('message', message => {
    //let rawdata = message.author.username+'#'+message.author.discriminator+' Requested  Server info: serverName: '+message.guild.name+' ServerID: '+message.guild.id+' ChannelID: '+message.channel.id
    //whoRequestRaw(rawdata) raw data breaks script sometimes so if its nec add a try catch
    
    try {
        if(message.member.hasPermission(['SEND_MESSAGES'])) {
            if(message.content.startsWith(`!chegg`)) {
                var s = message.content.replace('!chegg', '')
                var noq = s.split("?")[0]; //removes track id 
    
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
                        'Cookie': 'id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1NmExZGI5ZS0xNGRkLTQ3YmQtYTI0Zi04NDkzMjQxMTU0ZDUiLCJhdWQiOiJDVyIsImlzcyI6Imh1Yi5jaGVnZy5jb20iLCJleHAiOjE2MzczMzAzNzEsImlhdCI6MTYyMTU2MDM3MSwiZW1haWwiOiJibGFrZWJlaW5AZ21haWwuY29tIn0.DO-imFt5KZk01UO6Dc13qtVsUqUNxL2D20LLRfp6DarUcfTi4dQXrE8XnFFKuQuYOAOAuPBm8V71665LjXHlEi8wEGn2GGzeMBBh_AL8mHqIrMFOwHLgtLSDnAPihn8u5bLxFNF2iXrASdJVbSRQ1We2bXVIivzRbMjQzP_-AYdAAnCaBvyqVtAy7VmoQ-nF531Y698_Wi9Y_gJTgpv5MrppkCoAhlxgZ3lvCHwn2XXALw_rgJCM8Ks2YGftW1yna95ShwF6STKYS9FzKHOfBgCg38E6SxtApQEbWBLndmq9eqvmTWmjaCXTQG9wRPmARN1o3gc0S8pmJuNFJOCE1w'
                    }
                })    .then(res => res.text())
                .then(body => {
                    //toHTML('webiste.html',body)
                    const $ = cheerio.load(body)
                
                    let question = $("body > div.chg-body.no-nav.no-subnav.header-nav > div.chg-container.center-content > div.chg-container-content > div.chg-global-content > div > div.parent-container.question-headline > div.main-content.question-page > div.dialog-question > div.question.txt-small > div.txt-body.question-body.mod-parent-container > div.ugc-base.question-body-text").text()
                    let answer = $('body > div.chg-body.no-nav.no-subnav.header-nav > div.chg-container.center-content > div.chg-container-content > div.chg-global-content > div > div.parent-container.question-headline > div.main-content.question-page > div.dialog-question > div.answers-wrap > ul > li > div.answer.txt-small.mod-parent-container > div.txt-body.answer-body > div.answer-given-body.ugc-base').html();
                    //console.log(question)
                    //console.log(answer)
                    toHTML('answer.html',answer)
                
                
                
                
                
                    let time = new Date().getTime() - start_time
                
                    message.channel.send(message.author.username, {files: ['./answer.html']});
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
})






async function whoRequest(info){
    fs.appendFileSync('./log.txt', moment().format("dddd, MMMM Do YYYY, h:mm:ss a    ")+info+'\n')
    log('Wrote Info to /Logs.txt', 'info')
    
}



client.login('ODQ1MDc4NTA0NTkyNTA2OTQw.YKbusA.BZVyKPLoQZoYpr2etHQSkH9YDrU');
