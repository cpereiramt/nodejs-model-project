const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const indexRouter = require('./routes/index');

const app = express();

/*
*
* Swagger definition
*/
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stock API with Swagger",
      version: "1.0.0",
      description:
        "This is a API to query stock information",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Clayton Pereira",
        url: "https://claytonpereira.com",
        email: "cpereiramt@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/",
      }
    ],
  },
  apis: ['./docs/**/*.yaml'],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter.apiRouter, indexRouter.historyRouter, indexRouter.loginRouter,indexRouter.passwordResetRouter,indexRouter.registerRouter,indexRouter.statsRouter,indexRouter.stockRouter);

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
  // res.render('error');
});



module.exports = app;
