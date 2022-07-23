const express = require('express');
const session= require('express-session');
const app = express();
const port = process.env.PORT || "5000";
const bodyParser= require('body-Parser');
const {v4: uuidv4}= require('uuid')
const AuthRoute= require('./Route/Auth.js');
const walletRoutes= require('./routes/wallets');
app.use('/api/wallets', walletRoutes)
const { JsonWebTokenError } = require('jsonwebtoken');
app.use(bodyParser.urlencoded({extended: true}))

require("dotenv").config();

app.use('/api/Auth', AuthRoute)
//declaring the unique id.
uuidv4()// 1hasajjsdkhhkwu8u2uhaloi2
uuidv4(options);
uuidv4(options, buffer, offset)
//use express-session 
app.use(session(
    {secret: "nodeJs mongodb",
    cookie: {},
    resave: false,
    saveUninitialized: false
}));

app.use(async (req, res, next)=>{
if(req.headers["x-access-token"]){
    const accessToken= req.headers["x-access-token"];
    const{userId, exp}= await JsonWebTokenError.verify(accessToken, process.env.JWT_SECRET);
//Check if token has expired
if(exp<Date.now().valueOf/1000){
    return res.status(401).json({error: "JWT has expired, please login to obtain a new one"})
}
res.locals.loggedInUser= await userId.findById(userId); next();
}
else{
    next()
}
})

//default endpoint
app.get('/', ()=>{
    res.json({message: 'This is cool mehn!'})
})

//listening on port
app.listen(port, ()=>{
      console.log(`listening on ${port}`)
  })

module.exports= app();