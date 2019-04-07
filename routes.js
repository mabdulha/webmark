'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const weblist = require('./controllers/weblist.js');
const about = require('./controllers/about.js');
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteweblist/:id', dashboard.deleteWeblist);
router.post('/dashboard/addWeblist', dashboard.addWeblist);

router.get('/weblist/:id', weblist.index);
router.get('/weblist/:id/deletemark/:markid', weblist.deleteMark);
router.post('/weblist/:id/addmark', weblist.addMark);

router.get('/about', about.index);
router.post('/about/addcomment', about.addComment);

module.exports = router;