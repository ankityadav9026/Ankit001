const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const { log } = require('console');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.get('/', function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("new",{files:files});
    });
});

app.get('/edit/:filename',function(req,res){
    res.render("edit",{filename:req.params.filename} );
});


app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8" , function(err,filedata){
      res.render("show", {filename:req.params.filename,  filedata:filedata});
    });
})
    app.get('/edits/:filenames',function(req,res){
        res.render("edits",{filenames:req.params.filenames} );
    });
    app.post('/edit',function(req,res){
        fs.writeFile(`./files/${req.body.previouss}`,`./files/${req.body.news}`,function(err){
            res.redirect("/");
        })
     })
 app.post('/edit',function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/");
    })
 })
 app.post('/create',function(req,res){

fs.writeFile(`./files/${req.body.tittle.split(' ').join('')}.txt`,req.body.details,function(err){
res.redirect("/")
});



});
app.listen(3000);   