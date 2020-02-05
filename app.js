const express = require('express');
const { testingNightmare } = require("./w-scraper");
const app = express();

app.get('/', async (req, res, next) => {
    testingNightmare();
    res.send({})
});

app.listen(3003, () => {})

