const express = require('express');
const app = express();
const session = require('express-session');
const flash= require('connect-flash');

app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'views'));



const sessionOptions={
    secret:'mysupersecret',
    saveUninitialized:true,
    resave:false
}
app.use(session(sessionOptions)); 
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash('success');
    next();
})
app.get('/register',(req,res)=>{
    let {name='anonymous'}=req.query;
    req.session.name = name;
    req.flash("success","user registered successfully!");
    res.redirect('/hello')
})

app.get('/hello',(req,res)=>{
  
    res.render("page.ejs",{name:req.session.name});

})

app.get('/test',(req,res)=>{
    res.send('test successful!');
})
app.listen(3000,()=>{
    console.log('server is listening to 3000');
}) 

   
/* 

app.get('/hi',(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`${req.session.count}`);
})
*/ 