const express = require("express");
const https=require("https");
const bodyParser=require("body-parser");
const cors=require("cors");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/",function(req,res){
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey="a8149ade166045acbe2393e80863356e";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weather=JSON.parse(data);
            const weatherdata=weather.main.temp;
            const weatherDescription=weather.weather[0].description;
            const icon=weather.weather[0].icon;
            const iconUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in "+query+" is : " + weatherdata + "&#176;C </h1>");
            res.write("<img src="+iconUrl+" />" );
            res.send();
        })
    });
})



app.listen(3000,function(){
    console.log("Server started on port 3000");
})