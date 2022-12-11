module.exports = {
    ensureAuthenticated: (req,res,next) => {
        if(req.isAuthenticated()){
            return next()
        } else {
            req.flash('error_msg','Please log in to view this resource')
            return redirect('/users/login')
        }
    }
}