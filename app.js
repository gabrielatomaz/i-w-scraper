const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const { loginScraper } = require("./services/w-scraper.service");
const { findUser } = require("./controllers/user.controller");

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());


app.get('/', async (req, res, next) => {
    if (req.cookies['agency']) {
        res.redirect('/index');

        return;
    }

    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/index', async (req, res, next) => {
    if (!req.cookies['agency']) {
        res.redirect('/');

        return;
    }

    res.sendFile(path.join(__dirname + '/views/index.html'));
});

//account = { agency, number, password };
app.post('/api/login', async (req, res, next) => {
    if (req.cookies['agency']) {
        res.redirect('/index');

        return;
    }

    const account = req.body;

    loginScraper(account)
        .then((user) => {
            res.cookie('agency', user.agency, { httpOnly: true });
            res.send({ success: true });
        })
        .catch(next);
});

app.post('/api/logout', async (req, res, next) => {
    res.clearCookie("agency");

    res.send({ success: true });
});

app.get('/api/infos', async (req, res, next) => {
    const agency = (req.cookies['agency']).replace(/\s/g, '');

    findUser(agency)
        .then((user) => res.send({ user }))
        .catch(next);
});

app.listen(3003, () => { });


const connect = () => {
    mongoose.connection
        .on('error', console.log);

    mongoose.set('useCreateIndex', true);
    return mongoose.connect("mongodb://localhost:27017/i-w-scraper", { useNewUrlParser: true, useUnifiedTopology: true });
}

connect();