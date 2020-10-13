//var url = 'https://hw3.ddns.net/log.php';


//var https = require("https");
//const url = "https://jsonplaceholder.typicode.com/posts/1";




function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function log(url, topic, message) {

    console.log(message);
    console.log(topic);


    //var https = require("https");
    // 
    // https.get(url, res => {
    //     res.setEncoding("utf8");
    //     let body = "";
    //     res.on("data", data => {
    //       body += data;
    //     });
    //     res.on("end", () => {
    //       body = JSON.parse(body);
    //       console.log(body);
          
    //     });
    //   });

    // if (url) {
    //     https.get(url, function(res) {
    //         var weather = "";

    //         res.on('data', function(d) {
    //             weather += d;
    //         });

    //         res.on('end', function() {
    //             if (weather === "Forbidden") {
    //                 return callback(RED._("heatwebNode.error.incorrect-apikey"));
    //             } else {
    //                 var jsun;
    //                 try {
    //                     jsun = JSON.parse(weather);
    //                 } catch (err) {
    //                     return callback(RED._("heatwebNode.error.api-response", { response:weather }));
    //                 }
                    
    //                 //msg.data = jsun;
                    
    //                 // msg.payload.weather = jsun.daily.data[when].icon;
    //                 // msg.payload.detail = jsun.daily.data[when].summary;
    //                 // msg.payload.humidity = jsun.daily.data[when].humidity;
    //                 // msg.payload.maxtemp = jsun.daily.data[when].temperatureMax;
    //                 // msg.payload.mintemp = jsun.daily.data[when].temperatureMin;
    //                 // msg.payload.windspeed = jsun.daily.data[when].windSpeed;
    //                 // msg.payload.winddirection = jsun.daily.data[when].windBearing;
    //                 // msg.payload.lat = jsun.latitude;
    //                 // msg.payload.lon = jsun.longitude;
    //                 // msg.payload.clouds = jsun.daily.data[when].cloudCover;
    //                 // msg.payload.precipitation = jsun.daily.data[when].precipProbability;
    //                 // msg.payload.sunrise = jsun.daily.data[when].sunriseTime;
    //                 // msg.payload.sunset = jsun.daily.data[when].sunsetTime;
    //                 // msg.payload.units = jsun.flags.units;
    //                 // msg.location.lat = jsun.latitude;
    //                 // msg.location.lon = jsun.longitude;
    //                 // msg.time = new Date(jsun.daily.data[when].time*1000);
    //                 // msg.title = RED._("heatwebNode.message.weather-forecast");
                   
    //                 callback();
    //             }
    //         });
    //     }).on('error', function(e) {
    //         callback(e);
    //     });
    // } else {
    //     callback(RED._("heatwebNode.error.invalid-url"));
    // }




    return(url + " / " +  topic + " / " + message);

}

module.exports.log = log;
module.exports.makeid = makeid;

