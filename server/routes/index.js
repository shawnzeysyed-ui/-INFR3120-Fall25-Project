var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;



/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Home',
  displayName: req.user?req.user.displayName:""
  });
});

/* GET home page alias */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home',displayName: req.user?req.user.displayName:"" 
  });
});

/* Redirect singular /assignment to /assignments */
router.get('/assignment', function(req, res, next) {
  res.redirect('/assignments');
});

// Get method for register
router.get('/login', function(req, res, next) {
  //if user is not logged in, show login page 
  if(!req.user)
  {
    res.render('auth/login',
      {
        title:"Login",
        message: req.flash('loginMessage')
      }
    )
  }
  //else if user is logged in, redirect to home page 
  else
  {
    return res.redirect("/")
  }
});

// Post method for login
router.post('/login', function(req,res,next){
  passport.authenticate('local',(err,user,info)=>{
    if(err)
    {
      return next(err);
    }
     // If authentication fails, redirect to login page 
    if(!user)
    {
      req.flash('loginMessage','AuthenticationError');
      return res.redirect('/login');
    }
    req.login(user,(err)=>{
    if(err)
    {
      return next(err);
    }
    return res.redirect("/assignments")
    })
  })(req,res,next)
});

// Get method for register
router.get('/register', function(req, res, next) {
  // Only show registration page if NOT logged in
  if(!req.user)
  {
    res.render('auth/register',
      {
        title:"Register",
        message: req.flash('loginMessage')
      }
    )
  }
  else
  {
    return res.redirect("/")
  }
});

// Post method for register
router.post('/register', function(req, res, next) {
    let newUser = new User({
      username: req.body.username,
      email:req.body.email,
      displayName: req.body.displayName
    })
    User.register(newUser, req.body.password, (err)=>{
      if(err)
      {
        console.log("Error:Inserting the new user");

        // If username already exists
        if(err.name=="UserExistingError")
        {
          req.flash('registerMessage','Registration Error:User already Exist');
        }
        // Reload registration page with error message
        return res.render('auth/register',
          {
            title:'Register',
            message:req.flash('registerMessage')
          }
        )
      }
      else{
        return passport.authenticate('local')(req,res,()=>{
          res.redirect("/assignments");
        })
      }
    })
  });

  //Get method for logout 
  router.get('/logout',function(req,res,next){
  req.logout(function(err)
  {
    if(err)
    {
      return next(err)
    }
  })
  res.redirect("/");
  })

module.exports = router;
