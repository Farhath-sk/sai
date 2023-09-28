const express= require("express");
const app=express();
const request =require('request');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./samplekey.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db=getFirestore();
app.get("/Regist",function(req,res){
    res.sendFile(__dirname+"/public/"+"Regist.html");
});
app.get("/signupsubmit",function(req,res){
    console.log(req.query);
    const Names=req.query.username;
    const Mail=req.query.email;
    const Password=req.query.password;
    db.collection('personal info').add({
        Name:Names,
        Email:Mail,
        password:Password,
    }).then(()=>{
    res.send("signup successfully click here to <a href='/login'>log in</a>.");
    })
});
    app.get("/logged",function(req,res){
        res.sendFile(__dirname+"/public/"+"logged.html");   
    })
    app.get("/log",function(req,res){
    db.collection('personal info')
    .where('Email','==',req.query.email)
    .where('password','==',req.query.password)
    .get()
        .then((docs)=>{
           // console.log(docs);
            //console.log(docs.size);
            if(docs.size>0){
              res.sendFile(__dirname+"/public/"+"saidashboard.html");
           }else{
              res.sendFile(__dirname+"/public/"+"saidashboard.html");
            }  
    })
}) 
app.listen(2200)