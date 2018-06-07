const express = require('express');
const fs = require('fs');

const hbs = require('hbs');
const port = process.env.PORT || 3000;


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



// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });



app.use((req,res,next)=>{
    var serverDate = new Date().toString();
    var log = `${serverDate}: ${req.method}  ${req.url}`;
    // console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();
});

var welcomeMsg = 'Welcome to Ramesh Website.';

app.get('/',(req,res)=>{
    res.render('index.hbs',{
        title: welcomeMsg
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title: welcomeMsg
    }
    );
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        title: welcomeMsg
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to load the page!'
    })
})




app.listen(port,()=>{
    console.log(`Server is up an running in port ${port}`);
});

