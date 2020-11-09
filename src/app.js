import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose  from'mongoose';
import cors from 'cors';
import routes from './routes.js'

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(routes)
app.listen(port);

mongoose.connect('mongodb://localhost:27017/i-w-scraper', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})