let Router = require('express-promise-router');
let router = new Router();

// Knex is a module used to generate SQL queries
// See http://knexjs.org/
let Knex = require('knex');
let dbConfig = require('./knexfile');
let knex = Knex(dbConfig[process.env.NODE_ENV]);

router.get('/', function(req, res) {
  res.render('index');
});

// GET /
router.get('/share', async(request, response) => {
  let stories = await knex('stories').select('*').orderBy('created_at', 'DESC');

  response.render('share', { stories });
});

// POST /messages
router.post('/share/stories', async(request, response) => {
  let storyBody = request.body.body;
  await knex('stories').insert({
    body: storyBody,
  });

  response.redirect('/share');
});

router.get('/resources', function(req, res) {
  res.render('resources', {
    style: 'resources.css'
  })
});

module.exports = router;
