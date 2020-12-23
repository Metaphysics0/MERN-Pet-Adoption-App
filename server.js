const express = require('express');
const cors = require('cors');
const { createToken, isAdmin } = require('./utils/auth');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', isAdmin, (req, res) => {
  res.send('hello world');
});

app.post('/signup', (req, res) => {
  // const token = createToken(req.body.email);
  res.send('Hello');
  console.log('res:', req.body);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
