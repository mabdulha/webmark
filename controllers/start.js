'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const weblistStore = require ('../models/weblist-store.js');
const userStore = require ('../models/user-store.js');

const start = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('start rendering');
    
    if (loggedInUser) {
      
      // Total number of bookmarks per user
      const weblistUserAmount = weblistStore.getUserWeblists(loggedInUser.id);
      
      // Total number of bookmark collections
      let totalmarks = 0;
      
      for(let i=0; i< weblistUserAmount.length; i++) {
        totalmarks = totalmarks + weblistUserAmount[i].marks.length;
      }
      
      // Average number of bookmarks in each Collection
      let averagemarks = Math.round(totalmarks/weblistUserAmount.length *100)/100;
      
      // Name of bookmark collection with most and least bookmarks
      
      let mostmarks = 0;
      let leastmarks = 0;
      let leastTitle = "";
      let mostTitle = "";
      
     for(let i=0; i< weblistUserAmount.length; i++) {
        
        if(weblistUserAmount[i].marks.length >= mostmarks) {
         mostmarks = weblistUserAmount[i].marks.length;
         mostTitle = weblistUserAmount[i].title;
        }
        
        if(weblistUserAmount[i].marks.length <= weblistUserAmount[i].marks.length) {
          leastmarks = weblistUserAmount[i].marks.length;
          leastTitle = weblistUserAmount[i].title;
        }
      } 
      
      
    // Total number of bookmarks over all
      const weblistAmount = weblistStore.getAllWeblists();
      
    // Average number of bookmarks per user
      let totalUsermarks = 0;
      
      for(let i=0; i< weblistAmount.length; i++) {
        totalUsermarks = totalUsermarks + weblistAmount[i].marks.length;
      }
      
      let numUsers = userStore.getAllUsers().length;
      
      let avgperUser = Math.round(totalUsermarks/numUsers *100)/100;
      
    // Name of user with most and least bookmarksmarks


      let mostUsermarks = 0;
      let leastUsermarks = 0;
      let mostUserName = "";
      let leastUserName = "";
      let alluser = userStore.getAllUsers();
      let totalmark = 0;
      
      for(let i=0; i<alluser.length; i++) {
       const eachuser = weblistStore.getUserWeblists(alluser[i].id)
        for(let x=0; x<eachuser.length; x++) {
          totalmark = totalmark + eachuser[x].marks.length;
        
        
        if(eachuser[x].marks.length >= mostUsermarks) {
         mostUsermarks = eachuser[x].marks.length;
         mostUserName = userStore.getUserById(eachuser[x].userid);
          mostUserName = mostUserName.firstName;
        }
          
        
        if(eachuser[x].marks.length <= eachuser[x].marks.length) {
          leastUsermarks = eachuser[x].marks.length;
          leastUserName = userStore.getUserById(eachuser[x].userid);
          leastUserName = leastUserName.firstName;
        }
        }
        
      }
      
      
      
    const viewData = {
      title: 'Welcome to Weblist 1',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      totalNumofWeblistsperUser: weblistUserAmount.length,
      totalNumofMarks: totalmarks,
      avgMarks: averagemarks,
      leastMarks: leastTitle,
      mostMarks: mostTitle,
      totalNumofWeblists: weblistAmount.length,
      avgMarksPerUser: avgperUser,
      userWithMostMarks: mostUserName,
      userWithLeastMarks: leastUserName,
    };
    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

module.exports = start;
