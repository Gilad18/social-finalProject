const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();
app.use(cors());

const socialRoute = require('./routes/routes')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/social/api',socialRoute);

mongoose.connect('mongodb+srv://gilad18587:MapileyEgoz85@cluster1.d82yt.mongodb.net/social', {
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