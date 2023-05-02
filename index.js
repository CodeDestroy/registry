const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const sequelize = require('./sequelize')
const app = express();
const { PrismaClient } = require('@prisma/client');
const authRouter = require('./routes/authRouter')
const dataRouter = require('./routes/dataRouter')
global.prisma = new PrismaClient();

const PITRS = require('./models/PITRS')
/* const User = require("./models/User") */
const City = require('./models/City')
const Course = require('./models/Course')
const Polyclinic = require('./models/Polyclinic')
const RegistrG35 = require('./models/registrG35(RC)')



app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});




function allowCrossDomain(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  var origin = req.headers.origin;
  if (_.contains(app.get('allowed_origins'), origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}
app.use(cors({
  origin: process.env.CLIENT_URL,
  cedentials: true
}))
app.use(express.static(__dirname));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.use(bodyParser.json());
app.use('/auth', authRouter)
app.use('/data', dataRouter)
/* app.use(allowCrossDomain); */
//routes





//init server


const PORT = process.env.PORT || 5000;




const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        console.log(process.env.CLIENT_URL)
        /* City.hasMany(RegistrG35)
        Polyclinic.hasMany(RegistrG35)
        Course.hasMany(RegistrG35) 
        PITRS.hasMany(RegistrG35)  */

        /* sequelize.sync().then(result=>{ 
           
            
          })
          .catch(err=> console.log(err)); */
          
    }
    catch (e) {
        console.log(e);
    }
}

start()