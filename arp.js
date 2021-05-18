const express = require('express');
const network = require('network');
const arp = require('node-arp');
const requestIP = require('request-ip');

const server = express();

network.get_gateway_ip(function(err,ip)
{
    console.log("Server Gateway : " + (err||ip));
    arp.getMAC(ip, function(err, mac){
        if(err){
            console.log('Application is not work!');
        }else{
        console.log("MAC Address : " + mac);
        }
    });
});

server.get('/', function(req, res){
    res.send('main page')
    console.log('Client IP : '+requestIP.getClientIp(req));
    
    // arp.getMAC('127.0.0.1', function(err, mac)
    arp.getMAC(requestIP.getClientIp(req), function(err, mac)
    {
        if(err){
            console.log("Client IP cannot receive IP address");
        }else{
        res.send(mac);
        console.log(mac);
        }
    })
})

server.listen(3000, (err)=>{
    if(err)
    {
        return console.log(err);
    }else{
        console.log("Express server started at port 3000");
    }
}
)
