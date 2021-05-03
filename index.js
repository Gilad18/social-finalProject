const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path:'./cerdt.env'})

const cors = require('cors');
const app = express();
app.use(cors());

const socialRoute = require('./routes/routes')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/social/api',socialRoute);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.d82yt.mongodb.net/social`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connect")
});

app.get('/',(req,res)=>{
    res.json({success : 'Social API'})
})


app.listen(process.env.PORT || 4500, () => {
   return console.log(`application start`);
})