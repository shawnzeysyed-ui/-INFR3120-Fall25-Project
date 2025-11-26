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
