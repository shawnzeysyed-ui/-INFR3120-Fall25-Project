Duedesk webpage url: https://duedesk.onrender.com
UPDATE URL FOR PART 2: https://duedesk-2olv.onrender.com/

### Onedrive folder containing: index.js, package.json###
###index.js##

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hey this is project part 1!!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server is running sucessfully on local host`);
});
## index.js is for node.js webserver listens on localhost found on media gallery, lecture of introduction to node#######

### package.json file###
{
  "name": "project-part-1",
  "version": "1.0.0",
"description": "this is project part 1 ",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "shawnzey",
  "license": "ISC"
}
### used for node as well found on lecture of introduction to node and express part 1####
## Public folder conatining 3 subfolders which are Asset folder, content folder and script folder##
## Asset folder - contains image logo of duedesk webpage -###

  <img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/a54c1435-2edf-43ae-b343-210a345ae1f6" />

### content folder is empty ##
### script folder conatins app.js ####
//Client side 
(function(){
    function Start()
    {
        console.log("App Started");
    }

    window.addEventListener("load", Start)
})();
## runs code for client side ###

### public folder code has been used from lectures, media gallery and codes that are posted on Canvas - Image logo made by Iman Khan ####
## Server folder holds most important folders and files including config folder, models, routes,views##
## config folder###
## app.js###
/* Install 3rd party packages */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let DB = require('./db');
let assignmentsRouter = require('../routes/assignment')
/* Routers connecting with routes in /routes*/
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');


/* app using express */
let app = express();


// test DB conncetion
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection error'));
mongoDB.once('open',()=>{
  console.log('Connected to the MongoDB');
})


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));






app.use('/', indexRouter); //index router
app.use('/users', usersRouter);
app.use('/assignments',assignmentsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error',
  {
    title: "Error"
  }
  );
});


module.exports = app;


### main setup file used to connect MONGODB and creates routes code is written followed through by watching lecture videos posted and onoging lectures, founded on canvas##
### db.js contains MONGODB connection URI - shawnzey syed##
## Models folder##
### assignmentdue.js###
let mongoose = require("mongoose");

// create a model

let assignmentModel = mongoose.Schema(
    {
    Name: String,
    assigned: String,
    Due: String,
    course: String,

    },
    {
        collection:"assignment"
    }


);

module.exports=mongoose.model('Assignment',assignmentModel);
### Connects MONGODB file to webpage - code followed through by lectures, and posted lecture videos for projects##
## Routes folder ##
## assignment.js ###
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Assignment = require('../models/assignmentdue');

// get route for the read assignment list - Read operation
router.get('/',async (req, res, next)=>{
    try 
    {
        const AssignmentList = await Assignment.find();
        //console.log(AssignmentList);
        res.render('Assignments/assignment',{
            title:'Assignment Tracker',
            AssignmentList:AssignmentList
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignments/list', {
            error: 'Error on server'
        })
    }
})

//Get route for displaying the Add page - Create Operation
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Assignments/add', {
            title: "Add Assignment"
        } )
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignments/list', {
            error: 'Error on server'
        })
    }
})

//Post route for processing the Add page - Create Operation
router.post('/add',async(req,res,next)=>{

    try
    {
        let newAssignment = new Assignment({
            "Name": req.body.Name,
            "assigned": req.body.assigned,
            "Due": req.body.Due,
            "course": req.body.course
        });
        Assignment.create(newAssignment).then(()=>{
            res.redirect('/assignments')
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignments/list', {
            error: 'Error on server'
        })
    }
})

//Get route for displaying the Edit page - Update Operation
router.get('/edit/:id',async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const assignToEdit = await Assignment.findById(id);
        res.render("assignments/edit",
            {
                title: "Edit Assignment",
                Assignment: assignToEdit
            }
        )
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }

})

//Post route for displaying the Edit page - Update Operation
router.post('/edit/:id',async(req,res,next)=>{
    try
    {
        let id = req.params.id;
        let updateAssign = Assignment({
            "_id": id,
            "Name": req.body.Name,
            "assigned": req.body.assigned,
            "Due": req.body.Due,
            "course": req.body.course
        })
        Assignment.findByIdAndUpdate(id,updateAssign).then(()=>{
            res.redirect("/assignments")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})



//Get route for peforming delete operation - Delete Operation
router.get('/delete/:id',async(req,res,next)=>{
    try
    {
        let id = req.params.id;
        Assignment.deleteOne({_id:id}).then(()=>{
            res.redirect("/assignments")
        })

    }
    catch(err)
    {
        console.log(err);
        next(err);
    }

})

module.exports = router;

### File for webpage using CRUD and express - code from lectures and small minor updates made by the group##
## index.js##
var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* GET home page alias */
router.get('/home', function(req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* Redirect singular /assignment to /assignments */
router.get('/assignment', function(req, res, next) {
  res.redirect('/assignments');
});

module.exports = router;
### file for connection of homepage, and assignment page rendering - code brought from lecture videos and posted canvas videos##
### User.js ###
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is a user page');
});

module.exports = router;
### code gets users listing - from lecture and posted canvas videos ###

### Views folder - conatiners subfolders of assignment folder, partials folder and error.ejs and index.ejs ###
### Assignment folder contains add.ejs, assignment.ejs, edit.ejs##
## add.ejs##
<%- include ../partials/header %>
<%- include ../partials/main_nav %>

<!-- Adding the assignment -->
<div class ="container">
    <div class="row">
        <div class="offset-md-3 col-md-6">
        <h1><%= title %></h1>

        <form class="form" method="post">
            <div class="form-group">
                <label for="nameTextfield"> Assignment Name</label>
                <input type="text" class="form-control"
                id="nameTextfield"
                placeholder="Enter name of assignment"
                name="Name" required>
            </div>

            <div class="form-group">
                <label for="assignedTextfield"> Date Assigned</label>
                <input type="text" class="form-control"
                id="assignedTextfield"
                placeholder="Date Assigned"
                name="assigned" required>
            </div>

            <div class="form-group">
                <label for="dueTextfield"> Assignment Due Date</label>
                <input type="text" class="form-control"
                id="dueTextfield"
                placeholder="Due Date"
                name="Due" required>
            </div>

            <div class="form-group">
                <label for="courseTextfield"> Course</label>
                <input type="text" class="form-control"
                id="courseTextfield"
                placeholder="Enter Course"
                name="course" required>
            </div>

            <br>
            <button class="btn btn-primary" type="submit">
                <i class="fas fa-edit"></i> Add
            </button>
            <a href="/assignments" class="btn btn-warning">
                <i class="fas fa-undo"></i> Cancel
            </a>
        </form>
    </div>
</div>

<%- include ../partials/footer %>
### containers header, footer, webpage forms and buttons for DueDesk - code from lectures videos, posted code on canvas##
## assignment.ejs##
<%- include ../partials/header.ejs %>
<%- include ../partials/main_nav.ejs %>
<!--Main content for displaying our database-->
<main class="container">
    <div class="row">
        <div class="offset-md-1 col-md-10">
            <h1><%= title %></h1>
            <a href="/assignments/add" class="btn btn-dark mb-3" role="button">
                <i class="fas fa fa-plus-circle"></i> Add Assignment
            </a>

            <table class="table table-bordered table-striped table-hover">
                <!--Header row-->
                <tr class="d-flex">
                    <th class="text-center col-4">Assignment</th>
                    <th class="text-center col-2">Date Assigned</th>
                    <th class="text-center col-2">Due Date</th>
                    <th class="text-center col-3">Course</th>
                    <th class="text-center col-1">Edit</th>
                    <th class="text-center col-1">Delete</th>


                </tr>
                <!--for/while loop-->
                <% for(let count=0; count<AssignmentList.length;count++) { %>
                    <tr class="d-flex">
                         <td class="text-center col-4"><%= AssignmentList[count].Name %></td>
                         <td class="text-center col-2"><%= AssignmentList[count].assigned %></td>
                         <td class="text-center col-2"><%= AssignmentList[count].Due %></td>
                         <td class="text-center col-3"><%= AssignmentList[count].course %></td>
                         <td class="text-center col-1">
                         <a href = "/assignments/edit/<%= AssignmentList[count]._id%>" 
                            class="btn btn-outline-primary btn-sm"> 
                            <i class="fas fa-pencil-alt"></i> Edit
                        </a></td>
                        <td class="text-center col-1">
                         <a href = "/assignments/delete/<%= AssignmentList[count]._id%>" 
                            class="btn btn-outline-danger btn-sm"> 
                            <i class="fas fa-trash-alt"></i> Delete
                        </a></td>

                    </tr>
                <% } %>
            </table>
        </div>
    </div>
</main>
<%- include ../partials/footer.ejs %>

## code is for table assignment tracker on webpage that is connected to MONGODB###
## edit.ejs##
<%- include ../partials/header %>
<%- include ../partials/main_nav %>

<!-- Adding the assignment -->
<div class ="container">
    <div class="row">
        <div class="offset-md-3 col-md-6">
        <h1><%= title %></h1>

        <form class="form" method="post">
            <div class="form-group">
                <label for="nameTextfield"> Assignment Name</label>
                <input type="text" class="form-control"
                id="nameTextfield"
                placeholder="Enter name of assignment"
                name="Name" 
                value="<%= Assignment.Name%>"
                required>
            </div>

            <div class="form-group">
                <label for="assignedTextfield"> Date Assigned</label>
                <input type="text" class="form-control"
                id="assignedTextfield"
                placeholder="Date Assigned"
                name="assigned" 
                 value="<%= Assignment.assigned%>"
                 required>
            </div>

            <div class="form-group">
                <label for="dueTextfield"> Assignment Due Date</label>
                <input type="text" class="form-control"
                id="dueTextfield"
                placeholder="Due Date"
                name="Due" 
                value="<%= Assignment.Due%>"
                required>
            </div>

            <div class="form-group">
                <label for="courseTextfield"> Course</label>
                <input type="text" class="form-control"
                id="courseTextfield"
                placeholder="Enter Course"
                name="course"
                value="<%= Assignment.course%>"
                required>
            </div>

            <br>
            <button class="btn btn-primary" type="submit">
                <i class="fas fa-edit"></i> Add
            </button>
            <a href="/assignments" class="btn btn-warning">
                <i class="fas fa-undo"></i> Cancel
            </a>
        </form>
    </div>
</div>

<%- include ../partials/footer %>
### code for adding the assignment - code from lecture videos and media gallery posted videos from canvas##
## partials folder##
## error.ejs##
<%- include partials/main_nav.ejs %>
<%- include partials/header.ejs %>

<div class = "container">
    <h1><%= message %></h1>
    <h2><%= error.status %></h2>
    <pre><%= error.stack %></pre>
</div>

<%- include partials/bottom_nav.ejs %>
<%- include partials/footer.ejs %>
## code for main header, and footer and nav bar- code from lecture posted videos found on canvas##
## index.ejs##
<%- include partials/main_nav.ejs %>
<%- include partials/header.ejs %>

<!--content of the webpage--> 
<main>
  <div class="jumbotron">
  <h1 class="display-4">Welcome to the <%= title %> page</h1>
  </div>
</main>

<%- include partials/bottom_nav.ejs %>
<%- include partials/footer.ejs %>



  

  <!
### Content of the webpage - code from lectures, live and posted videos found from canvas##
## package.json ##
{
  "name": "webproject",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./server.js"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "^7.1.0",
    "bootstrap": "^5.3.8",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^17.2.3",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jquery": "^3.7.1",
    "mongoose": "^8.19.4",
    "morgan": "~1.9.1"
  }
}
###
### Server.js ###
#!/usr/bin/env node

/**
 * Module dependencies.
 * 
 * / Create, read, update, delete -- Crud operation
 */

var app = require('./server/config/app');
var debug = require('debug')('webproject:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
#### file for setting up server, main server launcher ###














  

