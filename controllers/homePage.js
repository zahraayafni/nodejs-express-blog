const Post = require('../database/models/Post')

module.exports = async(req, res) => {
    const posts = await Post.find({})
    res.render('pages.admin.show', {
        posts
    })
}