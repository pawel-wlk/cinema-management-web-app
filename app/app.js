const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');

app.use(session({secret: "DEVELOPMENT"}));

app.use(bodyParser.urlencoded({extended: false}));

// loggers
app.use(morgan('dev'));
//app.use((req, res, next) => {
//  console.info(JSON.stringify(req.body, null, 2));
//  next();
//});

// routers
app.use(indexRouter);

app.listen(8080, () => console.log("listening on port 8080"));
