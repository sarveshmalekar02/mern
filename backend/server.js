const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const sessionSecret = require('./sessionKey');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const uri = 'mongodb+srv://sarveshmalekar02:A1S5CBkNHmQcB9uf@cluster0.a7u6stn.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0'



const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use(session({
    secret: sessionSecret, // Use the generated secret key
    resave: false,
    saveUninitialized: false
}));

// MongoDB connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("connection established successfully");
});


app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);


// Start the server

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

