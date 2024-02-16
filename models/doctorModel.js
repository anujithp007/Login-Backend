const mongoose=require('mongoose')

let doctorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    dob:{
        type:Date,
        required:true

    },
    role:{
        type:String
        

    }
})

let Doctor=mongoose.model('Doctor',doctorSchema,'doctor')

module.exports=Doctor