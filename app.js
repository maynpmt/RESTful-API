const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cors = require('cors')



//require config
const config = require('./config/index')

//require middleware
const errorHandler = require('./middleware/errorHandler')
const passportJWT = require('./middleware/passportJWT');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company')
const staffRouter = require('./routes/staff')
const shopRouter = require('./routes/shop')



const app = express();

app.use(cors())

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  
//  apply to all requests
app.use(limiter);

app.use(helmet())

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.MONGODB_URI, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//init passport
app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', companyRouter);
app.use('/staff', [ passportJWT.isLogin ], staffRouter);
app.use('/shop', shopRouter);

app.use(errorHandler)


module.exports = app;