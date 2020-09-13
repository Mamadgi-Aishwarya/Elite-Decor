//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Kitchen=require('./Models/Kitchen');
const Bedroom=require('./Models/Bedroom');
const Others=require('./Models/Others');

const app = express();
app.set('view engine', 'ejs');
app.use(require("body-parser").json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/home",async function(req,res){
var kitchenData=[];
var bedroomData=[];
var furnitureData=[];
await Kitchen.find().limit(9).then((item,err)=>{
  kitchenData.push(item);
}).catch(err=> res.render('404'));
await Bedroom.find().limit(9).then((item,err)=>{
  bedroomData.push(item);
}).catch(err=> res.render('404'));
await Others.find().limit(9).then((item,err)=>{
  furnitureData.push(item);
}).catch(err=> res.render('404'));
  res.render('home',{kitchenData:kitchenData[0],bedroomData:bedroomData[0],furnitureData:furnitureData[0]});
});

app.get("/",async function(req,res){
  var kitchenData=[];
  var bedroomData=[];
  var furnitureData=[];
  await Kitchen.find().limit(9).then((item,err)=>{
    kitchenData.push(item);
  }).catch(err=>res.render('404'));
  await Bedroom.find().limit(9).then((item,err)=>{
    bedroomData.push(item);
  }).catch(err=> res.render('404'));
  await Others.find().limit(9).then((item,err)=>{
    furnitureData.push(item);
  }).catch(err=> res.render('404'));
  res.render('home',{kitchenData:kitchenData[0],
      bedroomData:bedroomData[0],
      furnitureData:furnitureData[0]});
  });

app.get("/kitchen",function(req,res){
  Kitchen.find().then((item,err)=>{
    res.render("gallery",{heading:"Kitchen",data:item});
  }).catch(err=>   res.render('404'));
})
app.get("/bedroom",function(req,res){
  Bedroom.find().then((item,err)=>{
    res.render("gallery",{heading:"Bedroom",data:item});
  }).catch(err=> res.render('404'));
})
app.get("/others",function(req,res){
  Others.find().then((item,err)=>{
    res.render("gallery",{heading:"Others",data:item});
  }).catch(err=>   res.render('404'));
})
app.post("/:collection/filter",function(req,res){
  const models={
    Kitchen:Kitchen,
    Bedroom:Bedroom,
    Others:Others
  }
  console.log(req.body);
  models[req.params.collection].find({color:req.body.color}).then((item,err)=>{
    res.render("gallery",{heading:req.params.collection,data:item});
  }).catch(err=>   res.render('404'));
})

app.get("/contact",function(req,res){
  res.render('contact');
  });
  app.post("/contact",async function(req,res){
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL, 
          pass: process.env.PASSWORD
      }
    });
    
    // Step 2
    var message;
    let mailOptions = {
      from:process.env.EMAIL ,
      to: 'mamadgiaishwarya@gmail.com',
      subject: 'Interior Design:Customer',
      text:"I liked your website.Please contact me back.My name is "+req.body.name+"email id is "+ req.body.email+". "+req.body.comment+"." 
    };
    
    // Step 3
     transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        res.render('404');
        res.redirect('/contact');
          }
      else{
     alert('success',"Your request is sent successfully");
      res.redirect('/');
      }
    });
    });
let port=process.env.PORT||3000;
app.listen(port, function() {
  console.log("Server started on port 3000");
});
