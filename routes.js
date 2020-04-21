'use strict';
let express = require('express');
let router = express.Router();
let app = require('./app')
let server = require('./server')
// let { Stories } = require('./models');
// let { ValidationError } = require('objection');

// let controller = require('./controllers') //if you want to use 'router.get(/ controller.main)'

let users = []

router.get('/', async function(req, res) {
  res.render('index', {
    body: 'index.hbs',
    style: 'style.css'
  })
})
router.get('/share', async function(req, res) {
  res.render('share', {
    style: 'share.css'
  })
  // let stories = await Story.query().select('*').orderBy('created_at', 'DESC');

  // response.render('index', { messages });
});
router.get('/resources', function(req, res) {
  res.render('resources', {
    style: 'resources.css'
  })
});

module.exports = router;
