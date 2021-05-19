const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
var log = require('./untils/logger.js')
const fs = require('fs');

let config = fs.readFileSync('./untils/config.json');
let parsedConfig = JSON.parse(config);

let webhookID = parsedConfig.webhookID;
let webhookToken = parsedConfig.webhookToken;





const hook = new Discord.WebhookClient(webhookID, webhookToken);

let toDiscord = function(msg,type){

    if(webhookID === '' || webhookToken === ''){
        log('No Webook in ./config.json Cannot Send to Discord', 'err')
    } else {
        switch (type) {

            case 'ok':
                
                const embed1 = new MessageEmbed()
                .setAuthor('Program')
                .setColor(0x2ecc71)
                .setDescription(msg);
                hook.send(embed1);
                log('Sent Discord WebHook','ok')
              break;
    
            case 'err':
                
                const embed2 = new MessageEmbed()
                .setAuthor('Program')
                .setColor(0xe74c3c)
                .setDescription(msg);
                hook.send(embed2);
                log('Sent Discord WebHook','ok')
              break;
    
            case 'info':
                
                const embed3 = new MessageEmbed()
                .setAuthor('Program')
                .setColor(0x3498db)
                .setDescription(msg);
                hook.send(embed3);
                log('Sent Discord WebHook','ok')
              break;
    
            case 'res':
                
                const embed4 = new MessageEmbed()
                .setAuthor('Program')
                .setColor(0x95a5a6)
                .setDescription(msg);
                hook.send(embed4);
                log('Sent Discord WebHook','ok')
             break;
    
            case 'init':
                
                const embed5 = new MessageEmbed()
                .setAuthor('Program')
                .setColor(0xf1c40f)
                .setDescription(msg);
                hook.send(embed5);
                log('Sent Discord WebHook','ok')
             break;
            case 'log':
                
                const embed6 = new MessageEmbed()
                .setAuthor('Program')
                .setColor(0x2980b90)
                .setDescription(msg);
                hook.send(embed6);
                log('Sent Discord WebHook','ok')
             break;
    
            default:
                
                const embed7 = new MessageEmbed()
                .setAuthor('Program')
                .setColor(0xecf0f1)
                .setDescription(msg);
                hook.send(embed7);
                log('Sent Discord WebHook','ok')
              break;
          }
    }
    

}


module.exports = toDiscord;


