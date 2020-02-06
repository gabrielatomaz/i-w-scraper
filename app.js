const express = require('express');
const path = require('path');
const { loginScrapper } = require("./services/w-scraper");
const app = express();

app.get('/', async (req, res, next) => {
    loginScrapper();
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.listen(3003, () => {})

