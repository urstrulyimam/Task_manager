const express=require('express');
const path=require('path');
const fs=require('fs');
const { log } = require('console');
const { fileLoader } = require('ejs');
const app=express();

//views
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//paths of static
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    // res.send("Welcome");
    fs.readdir(`./files`,function(err,files){
        // console.log(files);
        res.render('index',{files:files});
    })
    // res.render('index');
})

//creating new files

app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show',{filename:req.params.filename,filedata:filedata});
    })
})

app.post('/create',function(req,res){
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/")
    });
})

//editing the name of file

app.get('/edit/:filename',function(req,res){
        res.render('edit',{filename:req.params.filename});
})
app.post('/edit',function(req,res){
        //console.log(req.body);
        fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
            res.redirect("/");
        })
})

//server for deleting files
 
app.get('/delete/:filename',function(req,res){
    res.render('delete',{filename:req.params.filename});
})

app.post('/delete',function(req,res){
    fs.unlink(`./files/${req.body.previous}`,function(err){
        res.redirect("/");
    })
})

app.listen(8000,function(){
    console.log("running port number "+`8000`);
})