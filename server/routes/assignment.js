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

})

//Post route for di splaying the Edit page - Update Operation
router.post('/edit/:id',async(req,res,next)=>{

})

//Get route for peforming delete operation - Delete Operation
router.get('/delete/:id',async(req,res,next)=>{

})

module.exports = router;

