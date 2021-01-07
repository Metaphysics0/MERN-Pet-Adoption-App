const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

//import routes
const routes = require('./routes/routes');
const { db } = require('./models/User');

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connected'));

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});

//middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use('/api', routes);

// deployment
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
