
import express from 'express';
import userController from './controllers/userController.js';

const routes = express.Router();

routes.get('/', userController.indexLogin);
routes.get('/index', userController.index);
//account = { agency, number, password };
routes.post('/api/login', userController.login);
routes.post('/api/logout', userController.logout);
routes.get('/api/infos', userController.listAllInfos);

export default routes;