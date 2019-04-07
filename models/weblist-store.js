'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');
const userStore = require('./user-store.js');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const weblistStore = {

  store: new JsonStore('./models/weblist-store.json', { weblistCollection: [] }),
  collection: 'weblistCollection',

  getAllWeblists() {
    return this.store.findAll(this.collection);
  },

  getWeblist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addWeblist(weblist) {
    this.store.add(this.collection, weblist);
  },

  removeWeblist(id) {
    const weblist = this.getWeblist(id);
    this.store.remove(this.collection, weblist);
  },

  removeAllWeblists() {
    this.store.removeAll(this.collection);
  },

  /*addMark(id, mark) {
    const weblist = this.getWeblist(id);
    weblist.marks.push(mark);
  },*/
  
  addMark(weblistId, mark, response) {
   const weblist = this.getWeblist(weblistId);
    
   mark.picture.mv('tempimage', err => {
     if (!err) {
       cloudinary.uploader.upload('tempimage', result => {
         console.log(result);
         
         const markFinal = {
           id: mark.id,
           title: mark.title,
           link: mark.link,
           summary: mark.summary,
           picture: result.url,
           amount: mark.amount
         };
         weblist.marks.push(markFinal);
         response();
       });
     }
   });
  },

  removeMark(id, markId) {
    const weblist = this.getWeblist(id);
    const marks = weblist.marks;
    _.remove(marks, { id: markId});
  },
  
  getUserWeblists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = weblistStore;