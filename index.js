const { appendFile } = require('fs');
const mongodb = require('mongodb')
const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
const app = express()
const MangoClient = mongodb.MongoClient
//const connectionURL = 'mongodb://localhost:27017/task';
// const databaseName = 'Mongo_DemoDB'

// MangoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
//     if(error){
//         console.log(error);
//        return console.log('Unable to connect DB')
//     }
//     console.log('Connection with MongoDB is succesfully')

//     const db = client.db(databaseName);
//     db.collection('Users').insertOne({
//          name:'lucky singh',
//          age:30,
//          address:'BTM'

//     },(error,result)=>{
//         if(error){
//            return console.log('Insert not possible');
//         }
//         else{
//             console.log(result)
//         }

//     })

// })


mongoose.connect( process.env.MONGO_URL,{
 useNewUrlParser:true, useUnifiedTopology: true
})
//Create DB with name Users

const user =  mongoose.model('Users',{
    name:{type:String , required:true, trim :true},
    age:{type :Number, default:0, validate(value){
      if(value<0){
       throw new Error("Negitive age is not allowed")
      }
    }},
    Email:{type:String, validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is not valid formate")
        }
    }},
    password:{type:String,required:true,trim:true,minLength:7}
})

const me = new user(
    {
        name:'sohan',
        age:30,
        Email:'Lucky@gmail.com',
        password:'Lucky1213'
})

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
  console.log("Error", error);
})

app.get('/', async(req, res)=>{
    try{
        const userDetails = await user.find({})
        console.log(userDetails)
        res.send(userDetails)
      }
      catch(e){
      }
})


const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`${port} is listning`)
})

