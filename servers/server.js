const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port =process.env.PORT || 8000;
const route = require('./routes/index');

app.use(cors());
// app.use('/api', route);

app.use(bodyParser.json());
// app.use('/api', (req, res)=> res.json({username:'bryan'}));

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})