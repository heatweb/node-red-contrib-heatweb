module.exports = function(RED) {

    const fs = require('fs');

    function heatwebFilter(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var globalContext = this.context().global;
        var resetEvery = parseInt(config.resetEvery || 0);
        var defaultGroup = config.defaultGroup || "dat";

        node.status({fill:"green",shape:"ring",text:"waiting"});
        //const fs = require('fs');
        //var fsread={"payload":"hello"};

        // fs.readdir('/home/pi/node-hiu/logs', function(err, files) {
        //  fsread.files = files;
        //  fsread.err = err;
        // });


        node.on('input', function(msg) {

            var nodeId = globalContext.get('node');
            if (!nodeId) { return null; }
            //var networkId = globalContext.get('networkId');
            var localNetworkId = globalContext.get('localNetworkId');    
            
            if (!msg.topic) { return null; }
            var topic = msg.topic;

            var today = new Date();
            var ttt = today.getTime();
            
            

            if (!topic.split("/")[1]) {   topic = defaultGroup + "/" + topic;   }
            if (!topic.split("/")[2]) {   topic = nodeId + "/" + topic;   }
            if (!topic.split("/")[3]) {   topic = nodeId + "/" + topic;   }
            if (!topic.split("/")[4]) {   topic = localNetworkId + "/" + topic;   }

            topic = topic.replace(/ /g, "");

            var topics = topic.split("/");

            msg.originalTopic = msg.topic;
            msg.topic =  topic;

            msg.title = globalContext.get('topics.default.'+topic.split("/")[3]+'.'+topic.split("/")[4]+'.title') || topic.split("/")[4];
            msg.units = globalContext.get('topics.default.'+topic.split("/")[3]+'.'+topic.split("/")[4]+'.units');

            //msg.payload = msg.payload.toLowerCase();

            
            globalContext.set("readings."  + topics[0] + "." + topics[1] + ".system.timestamp.value", ttt);
            globalContext.set("readings."  + topics[0] + "." + topics[2] + ".system.timestamp.value", ttt);
            if(topics[3]=='dat') {
                globalContext.set("readings."  + topics[0] + "." + topics[2] + ".system.lastDat.value", ttt);
                globalContext.set("readings."  + topics[0] + "." + topics[2] + ".system.node.value", topics[1]); 
            }
            //globalContext.set("readings."  + topics[0] + "." + topics[1] + ".system.node.timestamp", msg.timin);


            var rtopic = "readings."  + topics[0] + "." + topics[2] + "." + topics[3] + "." + topics[4]  ;
            
            var sensorobj=globalContext.get(rtopic) || {};

            var dosend = false;

            //sensorobj["gap"] = ttt - (sensorobj["changed"] || ttt);
            if ((ttt - (sensorobj["lastpass"] || ttt)) > (resetEvery*1000)) {  dosend=true; }

            if (sensorobj["value"] !== msg.payload) { 

                sensorobj["changed"] = ttt;  
                dosend=true; 
            }            
            

            sensorobj["value"] = msg.payload; 
            sensorobj["topic"] = topic; 
            sensorobj["timestamp"] = ttt;
            if (msg.title && (!sensorobj["title"])) { sensorobj["title"] = msg.title; }  // remark out for large numbers of similar devices - can be looked up from global.topics
            if (msg.units && (!sensorobj["units"])) { sensorobj["units"] = msg.units; }

            


            if (dosend===true) { 
                
                node.send(msg); 
                sensorobj["lastpass"] = ttt;
            }

            globalContext.set(rtopic, sensorobj);

            node.status({fill:"green",shape:"dot",text:"ok"});
        });
    }
    RED.nodes.registerType("heatwebFilter",heatwebFilter);
}
