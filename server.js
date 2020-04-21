let {Client} = require('pg') // postgres, to connect to the database
//specifies the class of client instead of require('pg').Client
let express = require('express');
let path = require('path');
let expbs = require('express-handlebars');
let port = process.env.PORT || 3000;

let app = express();
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

app.root = (...args) => path.join(__dirname, ...args);
app.set('views', app.root('views'));
app.engine('handlebars', expbs({ defaultLayout: 'layout',
layoutsDir: path.join(__dirname, 'views/layout')
}));
app.set('view engine', 'hbs');

let routes = require('./routes');
app.use('/', routes);
// app.get('/', async (req, res) => {
//   res.render('index', {
//     style: 'style.css'
//   }) //if you put it here, the index does not show up!
// })
app.get("/share", async (req, res) => {
  res.render('share')
  // let rows = await readTable();
  // res.setHeader('content-type', 'application/json')
  // res.send(JSON.stringify(rows))
  // res.send('hello world')
})

app.post("/share", async (req, res) => {
  let result = {}
  try {
    let reqJson = req.body;
    await createName(reqJson.name);
    result.success = true;
  }
  catch(e) {
    result.success = false;
  }
  finally {
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(result))
  }
})

app.listen(port, () => console.log('server is listening on 3000'))

let client = new Client ({
  user: "postgres",
  password: 'postgres',
  database: 'sample_db' // the name of the database
})

// client.connect() //this is a promise
// .then(() => console.log('connected'))
// .then(() => client.query(createName)) //this might be where you put variables
// .then(() => client.query('select * from names'))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end) //ends the client's connection

// async version of the same above

// async function execute () {
//   try { // put these in to make sure there is not a problem or else you won't "catch" the problem
//   await client.connect() // need to put await or else it will go forward
//   console.log('connected!')
//   let results = await client.query('select * from names')
//   console.table(results.rows)
//   }
//   catch (ex) {
//     console.log(`something went wrong ${ex}`)
//   }
//   finally {
//     await client.end()
//   }
// }

async function start() {
  await connect();
}
async function connect() {
  try {
    await client.connect();
  }
  catch(e) {
    console.error(`failed ${e}`)
  }
  // let todos = await readTodos();

  // let successCreate = await functionname()
  // let successDelet = await functionname2()
}

async function readTable() {
  try {
    let results = await client.query('select users from names')
    return results.rows;
  }
  catch(e) {
    return [];
  }
}

async function createName(nameText) {
  try {
    await client.query('insert into users (name) values ($1)', [nameText]) //inserts todotext into the sql
  }
  catch(e) {
    return [];
  }
}
