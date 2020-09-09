require('../resources/models/User');
require('../resources/models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../resources/routes/auth');
const trackRoutes = require('../resources/routes/track')
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = "mongodb+srv://jinzu24:Roger_0106@cluster0.eburx.mongodb.net/sample?retryWrites=true&w=majority"
mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=> {
    console.log('connected to mongodb');
})
mongoose.connection.on('error',(err)=> {
    console.log('error to mongodb ',err);
})

app.get('/',requireAuth,(req,res)=>{
    res.send(`Your email ${req.user.email}`);
});

app.listen( 3000, ()=>{
    console.log("listening on port 3000")
})