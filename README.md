# Inventory-Management-app
The objective of the project was to create an asset management program whose purpose was to simplify the accounting of sales and to tally all increasing or decreasing assets in a small business. 
This exercise was intended to give us a hands-on experience on building a front end and back end application.
Front End part of the build.
  The front end was built using React
  
  Backend
  Backend built using Nodejs, 
  I mostly worked on the backend, setting up the postgressql environment, authentication using (JWT) JaSon Web Token authentication, and     database connection.
  authentication is the only part of the application that uses JWT. 
  To make sure the authentication was successful, I used a middleware function that made sure the routes were authenticated by checking     for a token in requested objects.
  
  Database
  We used postgresssql for the database
  DB connection and hosting can be found in config_db.js and config_env.js, we describe how and where the connection is made on what port   the backend listens out for.
  The DB is set up on a singleton instance. We elected to do this so as  to make sure that only one instance of the app would be created    
  I walked away from this experience feeling the need to learn more about front end and back end development.
  
