const express = require('express');
const fs = require('fs');

const hbs = require('hbs');

app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('copyrightText',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});


app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});



app.use((req,res,next)=>{
    var serverDate = new Date().toString();
    var log = `${serverDate}: ${req.method}  ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();
});


app.get('/',(req,res)=>{
    res.render('index.hbs',{
        title: 'Home page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/about',(req,res)=>{
    res.send('About page.');
})



app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to load the page!'
    })
})

app.listen(3000,()=>{
    console.log('Server is up an running in port 3000 ');
});

