const express = require('express')
const app = express();
const rootRouter = require('./routes/rootRouter')
const bodyParser = express.json();

app.use(bodyParser)

app.use('/api', )

module.exports = app;