'use strict';

const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');

let app = express();
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log',log+'\n',(error)=>{
        if (error)
          console.log(error);
    })
    next();
})

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})


app.get('/',(req,res) => {
   // res.send('<h1>Hello Express!</h1>');
   res.render('main.hbs',{
        pageTitle:'The main page'
        
   });


});
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle:'About Page',
    
    });  // Here write the template file.
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'Wrong address',

    });
});

app.use(express.static(__dirname+ '/public'));

app.listen(3000,()=>{
    console.log('Server is up on the port 3000');
});