const PORT = 3010;
const express = require('express');

const cors = require('cors');
const app = express();
const router = require('./router');

require ('dotenv').config()

const db = require('./models/index.js'); 

app.use(cors());
app.use(express.json());
app.use(router);

(async function () {
  try {
    await db;
    app.listen(PORT, () => {
      console.log(`Brainer Decks Express server is running at http://localhost:${PORT}`)
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
})();