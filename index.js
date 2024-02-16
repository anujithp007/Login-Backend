const express=require('express')
const app=express()
const mongoose = require('mongoose');
const cors=require('cors');
const bcrypt=require('bcrypt')
const Doctor = require('./models/doctorModel');
mongoose.connect('mongodb://127.0.0.1:27017/hospital')
  .then(() => console.log('Connected!'));

  const db=mongoose.connection
app.use(express.json())
app.use(cors())
const saltrounds=10

app.post('/',async (req,res)=>{
  console.log(req.body,'req');
  const hashPassword= await bcrypt.hash(req.body.password,saltrounds)
  console.log(hashPassword,'encrypted pw');


  let newDoctor=new Doctor({
    ...req.body,
    password:hashPassword
  })
  console.log(newDoctor);
  let response=await newDoctor.save()
    // let response=await db.collection('doctor').insertOne(req.body)
    console.log(response,'insert');
    res.json(response)
})

app.get('/find',async (req,res)=>{
let response=await Doctor.find()
  // let response=await db.collection('doctor').find().toArray()
  console.log(response);
  res.json(response)
    
})
app.put('/update',async(req,res)=>{
  let response=await db.collection('doctor').updateOne({name:'sdsda'},{$set:{name:'anujith',age:25}})
  res.json(response)
})
app.put('/update/:id',async(req,res)=>{
  try{
    let id=req.params.id
    console.log(id,'update id');
  let response=await Doctor.findByIdAndUpdate(id,req.body)
  // let response=await db.collection('doctor').updateOne({_id:id},{$set:req.body})
  console.log(response);
}catch(err){
  console.log(err);
}

})
app.get('/Findone/:id',async(req,res)=>{
  let id=req.params.id
  let response=await Doctor.findById(id)
  // let response=await db.collection('doctor').findOne({_id:id})
  res.json(response)
  console.log(response);
})
app.delete('/deleteone/:id',async (req,res)=>{
  let id=req.params.id
  console.log(id);
  let response=await Doctor.findByIdAndDelete(id)
  // let response=await db.collection('doctor').deleteOne({_id:id})
  res.json(response)
  console.log(response);
 
})
app.post('/login',async(req,res)=>{
try{

  const {email,password}=req.body
  const user=await Doctor.findOne({email})
  console.log(user,'user');

  if(!user){
    return res.status(401).json({message:'invalide username'})
  }
  const passwordCompare=await bcrypt.compare(password,user.password)
  if(!passwordCompare){
    return res.status(401).json({message:'password not match'})
  }
  res.json(user)
}
catch(err){
  console.error('error loging:',err)
}

})
app.listen(4000)