const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("Public"));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : fname,
                    LNAME : lname
                }

            }
        ]
    }
    const JsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/fb292c65c8";
    const options = {
        method : "POST",
        auth : "Khushbu:157838030c265d93a5ef788f5b3dc2cc-us18"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/faiure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    })
    
    request.write(JsonData);
    request.end();
    
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})


// 157838030c265d93a5ef788f5b3dc2cc-us18-api key
// fb292c65c8 - audience key