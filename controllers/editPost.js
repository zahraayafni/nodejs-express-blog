const Post = require('../database/models/Post')
const Tag = require('../database/models/Tag')

module.exports = async(req, res) => {
    const {
        id
    } = req.params

    const post = await Post.findById(id)
    const tags = await Tag.find({})

    return res.render('pages.admin.credit', {
        post,
        tags
    })
}