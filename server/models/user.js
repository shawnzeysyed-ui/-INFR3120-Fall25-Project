const { trim, type } = require('jquery');
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
const { collection } = require('./assignmentdue');

let User = mongoose.Schema({
    //username field 
    username:
    {
        type:String,
        default:"",
        trim:true,
        required:'Username is required'
    },
    //email field 
    email:
    {
        type:String,
        default:"",
        trim:true,
        required:'email is required'
    },
    //Display name field 
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:'displayName is required'
    },
    //When the account was created 
    created:
    {
        type:Date,
        default:Date.now
    },
    //When the account was last updated
    updated:
    {
        type:Date,
        default:Date.now
    }
},
{
    collection:"user"
}
)
let options = ({MissingPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoose,options);
module.exports.User = mongoose.model('User',User);