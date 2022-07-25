const express = require("express")
const request = require("request")
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

app.get("/", (req,res)=>{

    res.sendFile(__dirname +"/newsLetter.html")

})

app.post("/",(req,res)=>{

    let first = req.body.fName;
    let last = req.body.lName;
    let Email = req.body.email;
    // res.send("First Name: " +first+ "  Last Name: "+last+"  Email:"+Email)
    // console.log(first,last,Email)

    const data = {
        members: [
            {
            email_address: Email,
            status:"subscribed",

            merge_fields:{

                FNAME: first,
                LNAME: last
               }
            }
        ]
     }

     const jsonData = JSON.stringify(data);
     const url = "https://us12.api.mailchimp.com/3.0/lists/db0f49ed7f"
       
     const options = {
        method : "POST",
        auth : "vipin1:vdf859f613ff77fa96900546bbb1f6ad4-us12"
     }
   const request = https.request(url ,options, function(response){
            

    if(response.statusCode===200){
          res.sendFile(__dirname +"/success.html")
    }else{
         res.sendFile(__dirname+"/failure.html")
    }

    response.on("data",function(data){
          console.log(JSON.parse(data))
    })
    
})

//    sending our data to mailchimp we call a method
        request.write(jsonData);
        request.end();
})

app.post("/failure", (req, res)=>{
    res.redirect("/")
})

app.listen(3000, function(req,res){
    console.log("listening on port 3000")
})


// c5aa373a80565634c304ce6030f54ad9-us12
//  db0f49ed7f