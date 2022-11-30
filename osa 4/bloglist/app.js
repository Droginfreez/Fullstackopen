const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require("./controllers/login")
const testingRouter = require ("./controllers/reset")
const mWare = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected')
  })
    .catch((err) => {
      logger.error(err)
      process.exit(1)
    })

app.use(cors());
app.use(express.json());
app.use(mWare.requestLogger);
app.use(mWare.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use("/api/login", loginRouter);

app.use('/api/testing', testingRouter)

app.use(mWare.unknownEndpoint);
app.use(mWare.errorHandler);

module.exports = app;