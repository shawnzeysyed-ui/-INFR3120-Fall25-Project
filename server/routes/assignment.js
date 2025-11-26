let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Assignment = require('../models/assignmentdue');

//require authentication function
function requireAuth(req,res,next)
{
    //if user is not logged, redirect user to login page 
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}

// get route for the read assignment list - Read operation
router.get('/',async (req, res, next)=>{
    try 
    {
        const AssignmentList = await Assignment.find();
        //console.log(AssignmentList);
        res.render('Assignments/assignment',{
            title:'Assignment Tracker',
            AssignmentList:AssignmentList,
            //display display name if logged in
            displayName: req.user?req.user.displayName:""
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
            title: "Add Assignment",
            //display display name if logged in
            displayName: req.user?req.user.displayName:""

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
                Assignment: assignToEdit,
                //display display name if logged in
                displayName: req.user?req.user.displayName:""

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

