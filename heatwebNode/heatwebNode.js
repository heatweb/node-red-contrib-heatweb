module.exports = function(RED) {

    const fs = require('fs');
    const hwfilter = require('../modules/heatweb.js');

    const https = require("https");
    
     
     
    function heatwebNode(config) {
        RED.nodes.createNode(this,config);

        var hwurl = config.url;
        var nodeId = config.nodeId;
        var networkId = config.networkId;
        var localNetworkId = config.localNetworkId;
        var localDirectory = config.localDirectory;
        
        var node = this;

        //testing
        var globalContext = this.context().global;
        
        globalContext.set('node',nodeId);
        globalContext.set('networkId',networkId);
        globalContext.set('localNetworkId',localNetworkId);
        globalContext.set('localDirectory',localDirectory);

        node.status({fill:"red",shape:"ring",text:hwurl});
        var fsread={};

        fs.readdir(localDirectory + '/logs', function(err, files) {
         fsread.files = files;
         fsread.err = err;
        });


        
        var today = new Date();
        var ttt = today.getTime();
       

        //nodered_settings.json
        var settings = {};
        fs.readFile(localDirectory + '/logs/nodered_settings.json', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            //console.log(data);
            settings = JSON.parse(data);
            
            for(var k in settings) {

                var entry = {value:settings[k], timestamp:ttt }
                globalContext.set('readings.'+localNetworkId+'.'+nodeId+'.settings.' + k ,entry);
            }
            
            globalContext.set('settings',settings);
        });
        
        
        fsread.comment = "ok";
        
        var entry = 
        globalContext.set('readings.'+localNetworkId+'.'+nodeId+'.system.heatwebNodeVersion',{value:'0.0.1', timestamp:ttt, title:'Heatweb Node-RED nodes version' });
        globalContext.set('readings.'+localNetworkId+'.'+nodeId+'.stat.state',{value:'starting', timestamp:ttt, title:'Device state' });

        //hwfilter.log(hwurl,'ihiu/testingNode/testingNode/system/','Hello from Me', function(err,result) {
        //    fsread.log = result;
        //});
       
        var registerurl = (hwurl + "/registerdevice.php").replace("//registerdevice.php","/registerdevice.php");
        //fsread.log = hwfilter.log(registerurl,networkId+'/'+nodeId+'/'+nodeId+'/system/heatwebNodeVersion','0.0.1');
        
        https.get(registerurl, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {

                body = JSON.parse(body);
                console.log(body);
                fsread.connect = body;
                node.status({fill:"green",shape:"dot",text:hwurl});
                globalContext.set('readings.heatweb',body.readings);
                globalContext.set('topics',body.topics);
                globalContext.set('readings.'+localNetworkId+'.'+nodeId+'.alarm.heatwebNode',{value:'ok', timestamp:ttt, title:'Connection to Heatweb cloud server' });
            });
        });


        node.on('input', function(msg) {

            msg.payload =  fsread;
            node.send(msg);
        });
    }
    RED.nodes.registerType("heatwebNode",heatwebNode);
}

