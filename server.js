import express from "express";

//////////////////
// Server Setup //
//////////////////

// tells node to use express for the server logic
const app = express();

//  process.env.PORT is used when the application is deployed to the server,
//  because the server probably uses a different port than set here.
//  During development on localhost, process.env.PORT doesn't exist,
//  therefore it uses "backup" port specified
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
  console.log(`listening for requests on port ${port}`);
});

// Static files
app.use(express.static("public"));
