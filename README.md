# Coda Connects

Are you feeling alone with nowhere to go? Coda Connects has your back where it connects anonymous people to each other and you to important resources. Coda Connects is an online anonymous outlet for people to express themselves and see other people share their experiences with depression.

This is a small web application built for beginners that highlights essential web programming topics such as:
<ul>
  <li>The HTTP request response life cycle</li>
  <li>Node's Express web application framework</li>
  <li>Fundamental patterns in computer programming (loops, branching, variables)</li>
  <li>Data persistence using a SQL database</li> 
  <li>HTML templating using Handlebars</li> 
  <li>Deploying an application using Heroku</li>
 </ul>
<h2>Contents</h2>
  <ul>
    <li>Getting Started</li>
    <li>Installing PostgreSQL</li>
      <ul>
       <li>Mac</li>
       <li>Windows</li>
      </ul>
    <li>Interacting With The Database</li>
    <li>Iterations</li>
    <li>Deploying To Heroku</li>
  </ul>   
    <h2>Getting Started</h2>
Note: This project requires you to install PostgreSQL. See Installing PostgreSQL for instructions.

1. Fork this repository
2. Clone your fork
3. Run <code>npm install</code> inside the project directory
4. Get started on the Iterations

<code>npm run db:create</code> will create local databases for development and testing.

Installing PostgreSQL
Mac
You can install PostgreSQL on a Mac with <code>brew</code>:

<span class="pl-c1">brew install postgresql</span>
Once installed, start the database server with

<span class="pl-c1">brew services start postgresql</span>
<h3>Windows</h3>
You can install PostgreSQL on Windows using Chocolatey's choco command:

<span class="pl-c1">choco install postgresql</span>
See the Chocolatey PostgreSQL package page for more details.

Once installed, you have to add PostgreSQL's bin directory to your PATH environment variable. Search for Edit system environment variable to open System Properties. From there, click the Environment Variables button.

Under User variables, click the row labeled Path and then click the Edit... button. Click New and add the following directory to the PATH environment variable:

C:\Program Files\PostgreSQL\12\bin
Interacting With The Database
We are using two libraries two interact with the database:

Knex.js, which is used to generate SQL queries and interact with PostgreSQL
Objection.js, which allows us to interact with the database using JavaScript objects (rather than writing SQL queries). Under the hood, it uses Knex to talk to the database.
Iterations
[v0.1] Start The Core App
To create the local development database, run the following command inside the project directory:

npm run db:create
If this fails it means your PostgreSQL installation is broken. Find an instructor and get help! If PostgreSQL isn't set up correctly, nothing will work.

Next, run the following command to create the initial tables:

npx knex migrate:latest
Finally, run the following to start the server:

npm start
Visit http://localhost:3000 to see the app!

[v0.2] Deploy App To Heroku
See Deploying To Heroku below for instructions on how to make the application available to the public. You can skip this step for now, if you want.

Deploying To Heroku
Heroku is a service that allows us to host our application and make it available to the whole world. Every time we have a new version of our application, we push it to Heroku (a process called deploying).

One nice feature of Heroku is that we use git to publish new versions of your application.

Before anything else, do the following:

Create an account on Heroku

Download and install the Heroku command line tool

Once the heroku command is available, log into your Heroku account with the following command:

heroku login
Inside the project directory, run the following command to create a new Heroku application (replace some-example-app with a unique name for your application):

heroku create some-example-app
Add PostgreSQL to your Heroku instance with the following command:

heroku addons:create heroku-postgresql:hobby-dev
You're now ready to deploy to Heroku using git:

git push heroku master
Once git push has finished, run the following command to ensure the database is up to date:

heroku run npx knex migrate:latest
Finally, run

heroku domains
to see the domain for your application. Open it up in your browser of choice!
