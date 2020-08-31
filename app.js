const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport');


mongoose.connect("mongodb://localhost:27017/auction",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, function(err){
    if(err) return console.log(err);
    // app.listen(3000, function(){
    //     console.log("Сервер ожидает подключения...");
    // });
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);

app.use(passport.initialize());
app.use(passport.session());
// Add the line below, which you're missing:
require('./routes/passport')(passport);

module.exports = app;
