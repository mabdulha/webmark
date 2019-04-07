'use strict';

const logger = require('../utils/logger');

const weblistCollection = require('../models/weblist-store.js');
const weblistStore = require('../models/weblist-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');


const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Weblist Dashboard',
      weblists: weblistStore.getUserWeblists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    logger.info('about to render', weblistStore.getAllWeblists());
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
     addWeblist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newWebList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      marks: [],
    };
    logger.debug('Creating a new Weblist', newWebList);
    weblistStore.addWeblist(newWebList);
    response.redirect('/dashboard');
  },
  
  deleteWeblist(request, response) {
    const weblistId = request.params.id;
    logger.debug(`Deleting Weblist ${weblistId} from Weblist ${weblistId}`);
    weblistStore.removeWeblist(weblistId, weblistId);
    response.redirect('/dashboard/');
  },
  
  
};

module.exports = dashboard;