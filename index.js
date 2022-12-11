const app = require("./app")
const {ensureAuthenticated} = require("./config/auth")
const port =process.env.PORT || 5000

app.get('/dashboard',(req,res,next) => {
    res.render('Dashboard')
})
app.listen(port,()=>console.log('Server has been started'))
