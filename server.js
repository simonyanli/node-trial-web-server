'use strict';

const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');

const port =process.env.PORT || 3000;

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

app.get('/contact',(req,res) =>{
    res.render('contact.hbs',{
        pageTitle: "Contact Email"
    });
});

app.use(express.static(__dirname+ '/public'));

app.listen(port,()=>{
    console.log(`Server is up on the port ${port}`);
});