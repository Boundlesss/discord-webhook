// Discord Webhook Example - Gabe.
// Very simple code, but maybe a little unclean. Will update soon!

// (JUST EDIT THE CONFIG FILE TO YOUR NEEDS!)

const request = require('request');
const c = require('./config.json');

var i = 0;

function webhook() {
    if (c.loop == true) {
        (function loop() {
            if(i >= 0) {
                i++;
                send();
                setTimeout(loop, c.looppause * 1000);
            }
        })();
    } else if (c.loop == false) {
        send();
    } else {
        console.log("error");
    }
}

function webhookloop() {
    for (var i = 0; i < c.webhooks.length; i++){
        console.log(c.webhooks[i]);
    }
}

function send() {    
    var options = {
        url: c.webhooks[0],
        method: 'POST',
        json: {
            "avatar_url": c.avatar_url,
            "username": c.username,
            "content": c.content
        }
    };

    for (var i = 0; i < c.webhooks.length; i++){
        options.url = c.webhooks[i];

        request(options, function (err, res, body){
            if (err) console.log(err);
        
            if (!err){
                console.log(`[POST]: Username: ${c.username}; Content: ${c.content}`);
            }
        });
    }
}

webhook();
