
import express from 'express';
import UserController from './controllers/userController.js';

const routes = express.Router();

routes.get('/', UserController.indexLogin);
routes.get('/index', UserController.index);
//body = { agency, number, password };
routes.post('/api/login', UserController.login);
routes.post('/api/logout', UserController.logout);
routes.get('/api/infos', UserController.listAllInfos);

export default routes;