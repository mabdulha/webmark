'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');

const commentCollection = require('../models/comment-store.js');
const commentStore = require('../models/comment-store');
const uuid = require('uuid');

const about = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('about rendering');
    if (loggedInUser) {
    const viewData = {
      title: 'About Author',
      comments: commentCollection.getAllComments(),
    };
    response.render('about', viewData);
   }
    else response.redirect('/');
  },
  
   addComment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      comment: request.body.comment,
    };
    logger.debug('Creating a new Comment', newComment);
    commentStore.addComment(newComment);
    response.redirect('/about');
  }
};

module.exports = about;