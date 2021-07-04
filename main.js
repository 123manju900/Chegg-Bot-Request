var Client = require('ssh2').Client;
const Discord = require('discord.js');
const client = new Discord.Client();
var fetch = require('node-fetch');
var toHTML = require('/Users/Documents/GitHub/Chegg-Bot-Request/utils/toHTML.js') //youll need to fix this if you run it
const cheerio = require('cheerio');
const fs = require('fs')
var moment = require('moment'); // require
var log = require('/Users/Documents/GitHub/Chegg-Bot-Request/utils/logger.js') //youll need to fix this if you run it
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

let x = 0
let y = 0
let z = 0
let a = 0

var connSettings = {
  host: '',
  port: ,
  username: '',
  password: ''
     // You can use a key file too, read the ssh2 documentation
};


var conn = new Client();
conn.on('ready', function() {
    console.log('Logged into api')
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         
        var fs = require("fs"); // Use node filesystem


        client.on('message', message => {
            try {
                if(message.member.hasPermission(['SEND_MESSAGES'])) {
                    if(message.content.startsWith(`https://www.chegg.com/`)) {
                        let id = makeid(10)
          
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
                        let id_token = [
                            'id_token=',
                            'id_token=',
                            'id_token=',
                            'id_token='
                            ]
                        let r = getRandomInt(4)
                        if(r===0){
                            x++
                            console.log('X: '+x)
                        }
                        if(r===1){
                            y++
                            console.log('Y: '+y)
                        }
                        if(r===2){
                            z++
                            console.log('Z: '+z)
                        }
                        if(r===3){
                            a++
                            console.log('A: '+a)
                        }



                        //console.log(r)
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
                                'Cookie': id_token[r]
                            }
                        })    .then(res => res.text())
                        .then(body => {
                            //toHTML('webiste.html',body)
                            let $ = cheerio.load(body)
                            toHTML('body.html',body)
                            
                        
                            let question = $("body > div.chg-body.no-nav.no-subnav.header-nav > div.chg-container.center-content > div.chg-container-content > div.chg-global-content > div > div.parent-container.question-headline > div.main-content.question-page > div.dialog-question > div.question.txt-small > div.txt-body.question-body.mod-parent-container > div.ugc-base.question-body-text").text()
        
                            try {

                                let answer = $('body > div.chg-body.no-nav.no-subnav.header-nav > div.chg-container.center-content > div.chg-container-content > div.chg-global-content > div > div.parent-container.question-headline > div.main-content.question-page > div.dialog-question > div.answers-wrap > ul > li > div.answer.txt-small.mod-parent-container > div.txt-body.answer-body > div.answer-given-body.ugc-base').html();
                                //console.log(answer)
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

                                var base = fs.readFileSync('./base.html','utf8')
                                var answer2 = fs.readFileSync('./answer.html','utf8')
                              
                              
                              
                                fs.appendFileSync('./'+id+'.html', base);
                                fs.appendFileSync('./'+id+'.html', answer);
                              
                                global.readStream = fs.createReadStream( './'+id+'.html' );
                                global.writeStream = sftp.createWriteStream( './'+id+'.html' );
                              
                              
                                writeStream.on('close',function () {
                                    log('File transferred succesfully','ok')
                                });
                              
                                writeStream.on('end', function () {
                                    console.log( "sftp connection closed" );
                                    conn.close();
                                });
                              
                                // initiate transfer of file
                                readStream.pipe( writeStream );


                                let freelink = 'https://example.com/'+id+'.html'
                                let purchase = 'https://example.com/purchase/'
                                let link = 'ADLINK'+'example.com/adblock?'+id
                                const exampleEmbed = {
                                    color: 0xffcc33,
                                    title: x+'/200'+'   '+y+'/200'+'   '+z+'/200'+'   '+a+'/200',
                                    author: {
                                        name: 'CHEGG BOT',
                                        icon_url: 'https://c.cheggcdn.com/assets/site/marketing/icons/icon-studenthub-200x200.png'
                                    },
                                    fields: [
                                        {
                                            name: 'Question',
                                            value: noq,
                                            inline: true,
                                        },
                                        {
                                            name: 'Answer',
                                            value: '[Click here!]('+link+')',
                                            inline: true,
                                        },
                                        {
                                            name: 'Want Premium?',
                                            value: '[Click here!]('+purchase+')',
                                            inline: true,
                                        },
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        text: 'Contact #4692 for any issues'
                                    },
                                };
                                message.channel.send('<@'+message.author.id+'>')
                                message.channel.send({ embed: exampleEmbed });












                                console.log(id)


                                log(`Image Requested by `+message.author.username+' Sent to Server', 'ok')
                                deleteFile(id,sftp,conn)
                            } catch (error) {
                                console.log(error)
                                try {
                                    log('Error on Answer Method 1')
                                    fetch('https://proxy.chegg.com/oidc/token', {
                                        method: 'POST',
                                        headers: {
                                            'Host': 'proxy.chegg.com',
                                            'X-CHEGG-DFID': '      ', // needed
                                            'X-PX-AUTHORIZATION':' ',//likely needed
                                            'Accept': 'application/json',
                                            'Authorization': '   ',//neded
                                            'Accept-Language': 'en-US;q=1.0',
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                                            'User-Agent': 'CheggApp/3.40.0 (com.chegg.mobile.consumer; build:3.40.0.0; iOS 14.6.0) Alamofire/5.2.2',
                                            'x-chegg-auth-mfa-supported': 'true'
                                        },
                                        body: ' '// needed
                                    })
                                    .then(res => res.json())
                                    .then(json => {
                                      let access_token = json.access_token
                                      let id_token = json.id_token
                                      console.log(access_token)
                                      console.log(id_token)
                                      console.log(json)
                              
                            
                            
                            
                            
                            
                                      multiStep(noq,access_token,id_token,sftp,id)
                            
                                    });
    
    
    
    
    
    
    
    
                                    let freelink = 'https://example.com/'+id+'.html'
                                    let purchase = 'https://example.com/purchase/'
                                    let link = 'ADLINK'+'example.com/adblock/?'+id
                                    const exampleEmbed = {
                                        color: 0xffcc33,
                                        title: x+'/200'+'   '+y+'/200'+'   '+z+'/200'+'   '+a+'/200',
                                        author: {
                                            name: 'CHEGG BOT',
                                            icon_url: 'https://c.cheggcdn.com/assets/site/marketing/icons/icon-studenthub-200x200.png'
                                        },
                                        fields: [
                                            {
                                                name: 'Question',
                                                value: noq,
                                                inline: true,
                                            },
                                            {
                                                name: 'Answer',
                                                value: '[Click here!]('+link+')',
                                                inline: true,
                                            },
                                            {
                                                name: 'Want Premium?',
                                                value: '[Click here!]('+purchase+')',
                                                inline: true,
                                            },
                                        ],
                                        timestamp: new Date(),
                                        footer: {
                                            text: 'Contact #4692 for any issues'
                                        },
                                    };
                                    message.channel.send('<@'+message.author.id+'>')
                                    message.channel.send({ embed: exampleEmbed });
    
                                    
                                    deleteFile(id,sftp,conn)
                                    //message.channel.send('Sorry, '+ '<@'+message.author.id+'>' +' textbook solution isnt support yet...');
                                } catch (error) {
                                    message.channel.send('Sorry, '+ '<@'+message.author.id+'>' +' That problem doesnt have a solution or we ran into an unexpected error!');
                                }
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
        
        
                            
        
                            whoRequest(data)
                        });
            
            
                            
            
                            
            
            
            
        
                        //message.channel.send(message.author.username, {files: ['./answer.html']});
        
        
        
        
                        
            
            
        
            
                    }
                }
            } catch (error) {
                log('User does not have permission to speak','info')
            }

        })








    });
}).connect(connSettings);
client.login('');









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






async function whoRequest(info){
    fs.appendFileSync('./log.txt', moment().format("dddd, MMMM Do YYYY, h:mm:ss a    ")+info+'\n')
    log('Wrote Info to /Logs.txt', 'info')
    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }








  function multiStep(noq,access_token,id_token,sftp,id){
try {
    var base = fs.readFileSync('./base.html','utf8')
  
    fetch(noq, {
      headers: {
          'Host': 'www.chegg.com',
          'cache-control': 'max-age=0',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-gpc': '1',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'sec-fetch-dest': 'document',
          'accept-language': 'en-US,en;q=0.9'
      }
    })
    .then(res => res.text())
    .then(body => {
        try {
            const $ = cheerio.load(body);
            let json = JSON.parse($('#__NEXT_DATA__').html())
            let isbn = json.props.pageProps.extractedData.pageData.isbn13
            let chapterid = json.props.pageProps.extractedData.chapterData.chapterId
            let problemid = json.props.pageProps.extractedData.problemData.problemId
        
        
        
            console.log('ISBN: '+isbn)
            console.log('ChapterID:  '+chapterid)
            console.log('ProblemID:  '+problemid)
            fetch('https://proxy.chegg.com/v1/tbs/_/solution', {
              method: 'POST',
              headers: {
                  'Host': 'proxy.chegg.com',
                  'X-CHEGG-DFID': 'mobile|E723BCA1-67AB-4635-B9A9-3FBA34073B38',
                  'Accept': 'application/json',
                  'Authorization': 'Basic MFQxOE5HYmFsUURGYzBnWkh6b3ZwZVJkN0E1Y3BMQ3g6dnRnamFZa3Ric2p4OUFPUg==',
                  'Accept-Language': 'en-US;q=1.0',
                  'Content-Type': 'application/json',
                  'User-Agent': 'CheggApp/3.40.0 (com.chegg.mobile.consumer; build:3.40.0.0; iOS 14.6.0) Alamofire/5.2.2',
                  'access_token': access_token,
                  'x-chegg-auth-mfa-supported': 'true',
                  'Cookie': 'access_token='+access_token+'; id_token='+id_token+''
              },
              body: JSON.stringify({"problemId":problemid,"userAgent":"Mobile","isbn13":isbn})
            })
            .then(res => res.json())
            .then(json => {
                try {
                    console.log(json.result.solutions)
                  console.log(json)
                  let steps = json.result.solutions[0]['steps']
                  fs.appendFileSync('./'+id+'.html', base);
                
                  let length = steps.length - 1
          
                  //console.log(steps)
                  //console.log(steps[length])
                  
                  let lasturl = steps[length]['link']
          
          
                  steps.forEach(element => {
                    //element['link']
                    fetch(element['link'])
                    .then(res => res.text())
                    .then(body => {
                      fs.appendFileSync('./'+id+'.html', body);
                      if(element['link']===lasturl){
                          global.readStream = fs.createReadStream( './'+id+'.html' );
                          global.writeStream = sftp.createWriteStream( './example.com'+id+'.html' );
                        
                        
                          writeStream.on('close',function () {
                              log('File transferred succesfully','ok')
                          });
                        
                          writeStream.on('end', function () {
                              console.log( "sftp connection closed" );
                              conn.close();
                          });
                        
                          // initiate transfer of file
                          readStream.pipe( writeStream );
                      }
                    });
                  });
            
            
            
          
          
            
            
            
            
                } catch (error) {
                    console.log(error)
                }
            })
      
      
            
      
        } catch (error) {
            console.log(error) //try catch hell
        }

    });
} catch (error) {
    console.log(error)
}
  
}


async function deleteFile(id,sftp,conn){
    log('Starting Delete File Function','info')
    try {
        setTimeout(() => {{
            try {
                sftp.unlink('./example.com/'+id+'.html', function(err){
                    if ( err ) {
                        console.log( "Error, problem starting SFTP: %s", err );
                    }
                    else
                    {
                        log('Deleted File: ' + id,'ok')
                    }
        
                    
                });
            } catch (error) {
                log('Error on deleting file: ' + id,'err')
            }
        }}, 600000);
    } catch (error) {
        log('Error on deleting file: ' + id,'err')
    }

}

