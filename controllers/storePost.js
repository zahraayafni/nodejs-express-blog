const path = require('path')
const Post = require('../database/models/Post')

module.exports = (req, res) => {
    if (req.body.published == "on") req.body.published = true
    if (req.files) {
        const {
            featured_image
        } = req.files

        var ext = featured_image.name.match('[^.]+$')
        var filename = Date.now() + '.' + ext
        featured_image.mv(path.resolve(__dirname, '..', 'public/posts', filename), (error) => {
            Post.create({
                ...req.body,
                featured_image: `/posts/${filename}`
            }, (error, post) => {
                if (error) return console.log(error)
                res.redirect('/admin')
            })
        })
    } else {
        Post.create(req.body, (error, post) => {
            if (error) return console.log(error)
            res.redirect('/admin')
        })
    }
}