require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.json());
app.use(bodyParser.urlencoded({extends: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use('/api/v1/auth',require('./routes/loginRoute'));
app.use('/api/v1/feedback',require('./routes/feedbackRoute'));

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Connected to port: ${process.env.SERVER_PORT}`);
});