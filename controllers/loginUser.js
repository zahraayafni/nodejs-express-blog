const bcrypt = require('bcrypt')
const User = require('../database/models/User')

module.exports = (req, res) => {
    const {
        password
    } = req.body

    var email = 'zahrahfebriani@gmail.com'
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    var session = req.session
                    session.userId = user._id
                    req.session.save(function(err) {
                        return res.redirect('/admin')
                    })
                } else {
                    return res.redirect('/login')
                }
            })
        } else {
            return res.redirect('/login')
        }
    })
}