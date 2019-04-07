'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
var assets = require("./assets");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');


const app = express();
app.use("/assets", assets);
app.use(cookieParser());
const exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.use(fileUpload());
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    CalculateAmount: function (marks) {
       let total=0;
       for (let i in marks) {
          total+=marks[i].amount;
       }
       return total;
    }
  }
}));
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);

const listener = app.listen(process.env.PORT, function () {
  logger.info(`glitch-weblist started on port ${listener.address().port}`);
});
