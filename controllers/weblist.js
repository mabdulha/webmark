'use strict';

const logger = require('../utils/logger');
const weblistStore = require('../models/weblist-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const weblist = {
    index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const weblistId = request.params.id;
    logger.debug('Weblist id = ', weblistId);
    if (loggedInUser) {
    const viewData = {
      title: 'Weblist',
      weblist: weblistStore.getWeblist(weblistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('weblist', viewData);
    }
    else response.redirect('/');
  },
  
    deleteMark(request, response) {
    const weblistId = request.params.id;
    const markId = request.params.markid;
    logger.debug(`Deleting Mark ${markId} from Weblist ${weblistId}`);
    weblistStore.removeMark(weblistId, markId);
    response.redirect('/weblist/' + weblistId);
  },
  
    addMark(request, response) {
    const weblistId = request.params.id;
    const weblist = weblistStore.getWeblist(weblistId);
    const newMark = {
      id: uuid(),
      title: request.body.title,
      link: request.body.link,
      summary: request.body.summary,
      picture: request.files.picture,
      amount:1,
    }
    weblistStore.addMark(weblistId, newMark, function() {
      response.redirect('/weblist/' + weblistId);
  });
  },
  
  addWeblist(weblist) {
  this.weblistCollection.push(weblist);
},
  
  deleteWeblist(request, response) {
    const weblistId = request.params.id;
    logger.debug(`Deleting Weblist ${weblistId} from Weblist ${weblistId}`);
    weblistStore.removeWeblist(weblistId, weblistId);
    response.redirect('/dashboard/');
  },
};

module.exports = weblist;