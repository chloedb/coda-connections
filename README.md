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

<h2>Installing PostgreSQL</h2>
<h3>Mac</h3>
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

<pre lang="text"><code>C:\Program Files\PostgreSQL\12\bin
</code></pre>

<h2>Interacting With The Database</h2>
We are using two libraries two interact with the database:

<ol>
<li><a href="http://knexjs.org/" rel="nofollow">Knex.js</a>, which is used to generate SQL queries and interact with PostgreSQL</li>
<li><a href="https://vincit.github.io/objection.js/" rel="nofollow">Objection.js</a>, which allows us to interact with the database using JavaScript objects (rather than writing SQL queries). Under the hood, it uses Knex to talk to the database.</li>
</ol>

<h2>Iterations</h2>
<h3>[v0.1] Start The Core App</h3>
To create the local development database, run the following command inside the project directory:

<span class="pl-c1">npm run db:create</span>
If this fails it means your PostgreSQL installation is broken. Find an instructor and get help! If PostgreSQL isn't set up correctly, nothing will work.

Next, run the following command to create the initial tables:

npx knex migrate:latest
Finally, run the following to start the server:

npm start
Visit http://localhost:5432 to see the app!

<h3>[v0.2] Deploy App To Heroku</h3>
See Deploying To Heroku below for instructions on how to make the application available to the public. You can skip this step for now, if you want.

<h2>Deploying To Heroku</h2>
Heroku is a service that allows us to host our application and make it available to the whole world. Every time we have a new version of our application, we push it to Heroku (a process called deploying).

One nice feature of Heroku is that we use git to publish new versions of your application.

Before anything else, do the following:
<ol>
<li>
<p>Create an account on <a href="https://heroku.com" rel="nofollow">Heroku</a></p>
</li>
<li>
<p><a href="https://devcenter.heroku.com/articles/heroku-cli#download-and-install" rel="nofollow">Download and install the Heroku command line tool</a></p>
</li>
<li>
<p>Once the <code>heroku</code> command is available, log into your Heroku account with the following command:</p>
<div class="highlight highlight-text-shell-session"><pre><span class="pl-c1">heroku login</span></pre></div>
</li>
<li>
<p>Inside the project directory, run the following command to create a new Heroku application (replace <code>some-example-app</code> with a <em>unique</em> name for your application):</p>
<div class="highlight highlight-text-shell-session"><pre><span class="pl-c1">heroku create some-example-app</span></pre></div>
</li>
<li>
<p>Add PostgreSQL to your Heroku instance with the following command:</p>
<div class="highlight highlight-text-shell-session"><pre><span class="pl-c1">heroku addons:create heroku-postgresql:hobby-dev</span></pre></div>
</li>
</ol>
You're now ready to deploy to Heroku using git:

<div class="highlight highlight-text-shell-session"><pre><span class="pl-c1">git push heroku master</span></pre></div>
Once <code>git push</code> has finished, run the following command to ensure the database is up to date:

<div class="highlight highlight-text-shell-session"><pre><span class="pl-c1">heroku run npx knex migrate:latest</span></pre></div>
Finally, run

<div class="highlight highlight-text-shell-session"><pre><span class="pl-c1">heroku domains</span></pre></div>
to see the domain for your application. Open it up in your browser of choice!
