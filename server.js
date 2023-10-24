const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const app = express();

// const helmet = require("helmet");
const routes = require('./backend/routes/indexRoute');

const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5000;

if (environment !== 'production') {
	require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/booksmart';

const store = MongoStore.create({ mongoUrl: dbUrl, touchAfter: 24 * 60 * 60 });

const secret = process.env.SECRET || "thequalityofsilence";

const sessionOptions = {
  store: store,
  name: "booksmartsessions",
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    expires: Date.now() + 1000 * 60 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 60 * 24 * 7,
    sameSite: 'none'
  },
};


mongoose.connect(dbUrl, {
	useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(sessionOptions));

// app.use(helmet());

app.use('/', routes);

//Serve Frontend

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, './frontend/build')));

//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './', 'frontend', 'build', 'index.html')));
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }
app.listen(port, () => console.log(`listening on port: ${port}`));
