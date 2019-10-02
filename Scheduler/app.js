var express = require('express');
var cors = require('cors');
var path = require('path');
const jobRouter = require('./routes/jobRouter');

let EXECUTORS_LIMITATION = process.argv[2];
if(EXECUTORS_LIMITATION === undefined){
  EXECUTORS_LIMITATION = 3;
}

const Scheduler = require('./scheduler/Scheduler').getScheduler(EXECUTORS_LIMITATION);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/jobs', jobRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = {
  EXECUTORS_LIMITATION,
  app,
};

