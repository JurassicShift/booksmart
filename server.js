
const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
// const helmet = require("helmet");
// const routes = require('./backend/routes/index');

const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5000;

if (environment !== "production") {
  require("dotenv").config();
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(helmet());

// app.use('/', routes);

//Serve Frontend

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, './frontend/build')));

//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './', 'frontend', 'build', 'index.html')));
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }
app.listen(port, () => console.log(`listening on port: ${port}`));