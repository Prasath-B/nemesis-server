const bcrypt = require('bcrypt');
const User = require('../modals/Usermodel.js')
const Userdata = require('../modals/Userdata.js')
const passport = require('passport')
const jwt  =require('jsonwebtoken');



const loginUser = (req,res,done)=>{

        // const user = new User({
        //     email:req.body.mail,
        //     password:req.body.password
        // })
        // user.save()

    User.findOne({email:req.body.mail},(err,user)=>{
        
            if(err){
                console.log(err)
                res.send({result:'Truble finding username'})
                return false
            }
            if(!user){
             res.send({result:'User does not exist'})
             return false   
            }
            if(user){

             if(req.body.password === user.password){

                 const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.SECRET_KEY,
                { expiresIn: "5m" })

                res.send({result:'success',token,user})
            }else{
                res.send({result:'Password Incorrect'}) 
                }
            }
            
            
           
        })
    }

    const saveData = (req,res) =>{
       

      
        const userNameRegex = /^[a-zA-Z0-9]*$/;
        const emailRegex =/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        const  userNameValidation  = userNameRegex.test(req.body.userData.username) 
        const emailValidation = emailRegex.test(req.body.userData.email) 

        if(!req.body.userData.username ||!req.body.userData.mobile ||!req.body.userData.address ||!req.body.userData.email ){
            res.send({result:'please do fill out all the fields :)'})
            return false;
        }

        if(!userNameValidation){
            res.send({result:'username field should Only contain alphanumerical inputs'})
            return false;
        }
        
        if(!emailValidation){
            res.send({result:'Wrong email fomrat'})
            return false
        }


        try {
            const data = new Userdata({
            username:req.body.userData.username,
            mobile:req.body.userData.mobile,
            address:req.body.userData.address,
            email:req.body.userData.email
        })
        data.save()

        res.send({result:"User Added successfully"})
        } catch (error) {
            res.send({error:error})
        }

         
    }

    const fetchData =(req,res)=>{
        Userdata.find({},function(error,data){
            if(error){
                res.status(400).send({error:error})
                console.log(error)
            }
            if(data){
                
                res.send(data)
            }
        })
    }

const deleteUserName = (req,res)=>{
   

    Userdata.findOne({username:req.body.username},function(error,doc){
        doc.username =undefined;
        doc.save();

    })

}  

const authorize =(req,res)=>{
    res.send({result:"accept"})
}

module.exports ={loginUser,saveData,fetchData,deleteUserName,authorize}