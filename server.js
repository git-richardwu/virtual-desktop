const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Define routers
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const stocksAPIRouter = require('./routes/stocks');
app.use('/api/stocks', stocksAPIRouter);
//

console.log(path.resolve(__dirname, 'visual-desktop-tools-box', 'build', 'index.html'));

// Deploying static files
app.use(express.static('visual-desktop-tools-box/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'visual-desktop-tools-box', 'build', 'index.html'));
});
//

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
