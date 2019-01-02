const express = require('express');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(indexRouter);
app.use(express.json());

app.listen(8080, () => console.log("listening on port 8080"));
