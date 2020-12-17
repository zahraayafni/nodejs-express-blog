const Post = require('../database/models/Post')

module.exports = async(req, res) => {
    const {
        slug
    } = req.params

    const post = await Post.findOne({ slug })
    res.render('pages.post', {
        post
    })
}