let Router = require('express-promise-router');
let { Message } = require('./models');
let { ValidationError } = require('objection');

let router = new Router();

router.get('/', function(req, res) {
  res.render('index', {
    body: 'index.hbs',
    style: 'style.css'
  })
});
// GET /
router.get('/share', async(request, response) => {
  let messages = await Message.query().select('*').orderBy('created_at', 'DESC');

  response.render('share', { messages });
});

// POST /messages
router.post('/share/stories', async(request, response) => {
  let messageBody = request.body.body;
  let messageTime = new Date();

  try {
    await Message.query().insert({
      body: messageBody,
      created_at: messageTime,
    });

    response.redirect('/share');
  } catch(error) {
    if (error instanceof ValidationError) {
      let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
      let errors = error.data;

      response.render('index', { messages, errors });
    } else {
      throw error;
    }
  }
});

router.get('/resources', function(req, res) {
  res.render('resources', {
    style: 'resources.css'
  })
});

module.exports = router;
