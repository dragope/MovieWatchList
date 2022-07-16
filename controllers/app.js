const express = require('express');
const path = require('path')
const bodyParser = require("body-parser")
const app = express();
const cors = require('cors')

//Initializations
require("dotenv").config();
require('./database')

//Global variables
app.set('port', process.env.port || 3080)

//Middlewares
app.use(bodyParser.json())
app.use(cors())

//Routes
app.use(require('./src/routes/movies'))

app.listen(app.get('port'), ()=>{
    console.log(`App listening in port`, app.get('port'))
} )