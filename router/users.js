const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

router.get('/login',(req,res)=>res.render('Login'))

router.get('/register',(req,res)=>res.render('Register'))
//HANDLING REGISTER PROCESS
router.post('/register',async (req,res)=>{
    const {name, email, password, password2} = req.body
    let errors = []
    if(password!==password2){
        errors.push({msg:"Passwords don't match"})
    }
    if(password.length < 6){
        errors.push({msg:'Password length must be at least 6 characters'})
    }
    if(!name || ! email || !password || !password2){
        errors.push({msg:"Fill in all fields"})
    }
    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        await User.findOne({email})
            .then(user=>{
                if(user){
                    //USER EXIST
                    errors.push({msg:`User with email ${email} already was registered`})
                    res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    //USER DO NOT EXIST
                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    //HASH PASSWORD
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(newUser.password,salt,(err,hash)=>{
                            //SET PASSWORD TO HASHED
                            newUser.password = hash
                        })
                    })
                    //SAVE USER IN DATABASE
                    newUser.save()
                        .then(user=>{
                            req.flash('success_msg','You are now registered and can log in')
                            res.redirect('/users/login')
                        })
                        .catch(err=>console.error(err))
                }
            })
    }
})

module.exports=router