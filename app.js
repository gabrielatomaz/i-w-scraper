const express = require('express');
const path = require('path');
var cors = require('cors');
const { loginScrapper } = require("./services/w-scraper");
const app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

//account = { agency, number, password };
app.post('/api/login', (req, res, next) => {
    const account = req.body;
    
    loginScrapper(account)
    .then(() => res.send({ success: true }))
    .catch(next);
});

app.listen(3003, () => { });

