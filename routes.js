'use strict';
let express = require('express');
let router = express.Router();
let app = require('./app')
let server = require('./server')
let knex = require('./db/knex.js')
let db = require('./db/knex')

let {Client} = require('pg')

let client = new Client ({
  user: "postgres",
  password: 'postgres',
  database: 'coda_connections_development' // the name of the database
});

async function readTable() {
  try {
    let results = await client.query('select * from stories order by created_at desc');
    return results.rows;
  }
  catch(e) {
    return 'share';
  }
}

async function createStory(storyBody, date) {
  try {
    await client.query('insert into stories (body, created_at) values ($1, $2)', [storyBody, date]);
    return true //inserts todotext into the sql
  }
  catch(e) {
    return false
  }
}

router.get('/', function(req, res) {
  res.render('index', {
    body: 'index.hbs',
    style: 'style.css'
  })
});

router.get('/share', async function(req, res) {
  res.render('share')

  let storyRows = await readTable();
  res.setHeader('content-type', 'application/JSON')
  res.render(JSON.stringify(storyRows))
  // knex.select('*').from('stories').then(function(stories) {
  //   // res.render('share', { stories })
  //   res.send(console.log(stories))
  // // }); THIS IS THE PROBLEM THAT MAKES IT NOT LOAD
  // });
});

router.post('/share/stories', async function(req, res) {
  // res.render('share')
  let result = {}
  try {
    let reqJSON = req.body;
    await createStory(reqJSON.story);
    result.success = true;

  } catch(e) {
    result.success = false;
  }
  finally {
    res.setHeader('content-type', 'application/JSON')
    res.render('share', JSON.stringify(result))
  }
});

// router.post('/share/stories', function(req, res) {
//   let storyBody = req.body.body;
//   let storyTime = new Date();

//   knex('stories').insert({
//     body: storyBody,
//     created_at: storyTime,
//   }).then(function(stories) {
//     res.redirect('/share')
//   });
//   // res.redirect('/share')
// });
  // let stories = await Story.query().select('*').orderBy('created_at', 'DESC');

  // response.render('index', { messages });

router.get('/resources', function(req, res) {
  res.render('resources', {
    style: 'resources.css'
  })
});

module.exports = router;
