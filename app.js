const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const request=require('request');
const https=require('https');
app.listen(process.env.PORT||3000,function(){
console.log("app is running on port 3000");
})

app.get("/",function(request,response){
  response.sendFile(__dirname+"/signup.html");
})

app.post("/failure",function(request,response){
response.redirect("/");
})

app.post("/",function(request,response){
var fname=request.body.fname;
var lname=request.body.lname;
var email=request.body.email;

  console.log("fname::"+request.body.fname);
  console.log("lname::"+request.body.lname);
  console.log("email::"+request.body.email);
  //var email=request.body.email;
  const data={
    members: [
      {
      email_address : email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }
    ]
  }
var jsonData=JSON.stringify(data);
const url="https://us7.api.mailchimp.com/3.0/lists/9d0afcd662";
const options={
  method:"POST",
  auth:"yogita:824d3497c0dccc08675cd3ce41e8e59-us7"
}
const req=https.request(url,options,function(resp){
  var statusCode=resp.statusCode;
resp.on("data",function(data){
//  console.log(JSON.parse(data));
console.log(statusCode);
})
if(statusCode==200){
  //response.send("signup Success");
  response.sendFile(__dirname+"/success.html");

}else{
  //respons.send("signup Failure");
  response.sendFile(__dirname+"/failure.html");

}
})
req.write(jsonData);
req.end();
})


//9824d3497c0dccc08675cd3ce41e8e59-us7
//9d0afcd662
