const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const indexRouter = require('./routes/index');

const app = express();

// body parser
app.use(bodyParser.json());

// loggers
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.info(JSON.stringify(req.body, null, 2));
  next();
});

// routers
app.use(indexRouter);

app.listen(8080, () => console.log("listening on port 8080"));
