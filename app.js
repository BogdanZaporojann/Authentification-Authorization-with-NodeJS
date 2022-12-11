const express = require("express")
const app = express()
const session = require("express-session")
const passport = require("passport")
const mongoose = require("mongoose")
const flash = require("connect-flash")
const keys = require("./config/keys")
const expressLayout = require("express-ejs-layouts")

//DATA BASE CONNECT
mongoose.connect(keys.MongoDB)
    .then(()=>console.log('MongoDB successfully connection'))
    .catch(()=>console.log('MongoDB connection error'))
//BODY-PARSER
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//EJS
app.use(expressLayout)
app.set('view engine', 'ejs')

//SESSION
app.use(session({
    secret:'secret'
}))

//FLASH
app.use(flash())


//GLOBAL VARIABLE
app.use((req,res,next)=>{
    res.locals.success_msg =req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})


//PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())


//PASPORT CONFIG
require("./config/passport")(passport)


//ROUTING
app.use('/users',require('./router/users'))



module.exports=app