import WScrapperService from '../services/wScraperService.js';
import UserService from '../services/userService.js';
import path from 'path';

class UserController {
    async indexLogin(req, res){
        if (req.cookies['agency']) {
            res.redirect('/index');
    
            return;
        }
    
        res.sendFile(path.join(`${__dirname}/views/login.html`));
    }

    async index(req, res) {
        if (!req.cookies['agency']) {
            res.redirect('/');
    
            return;
        }
    
        res.sendFile(path.join(`${__dirname}/views/index.html`));
    }

    async login(req, res, next) {
        if (req.cookies['agency']) {
            res.redirect('/index');
    
            return;
        }
        WScrapperService.loginScraper(req.body)
            .then((user) => {
                res.cookie('agency', user.agency, { httpOnly: true });
                res.send({ success: true });
            })
            .catch(next);
    }

    async logout(req, res) {
        res.clearCookie("agency");
    
        res.send({ success: true });
    }

    async listAllInfos(req, res, next) {
        const agency = (req.cookies['agency']).replace(/\s/g, '');
    
        UserService.findUser(agency)
            .then((user) => res.send({ user }))
            .catch(next);
    }
}

export default new UserController();