const Post = require('../database/models/Post')

module.exports = async(req, res) => {
    const posts = await Post.aggregate()
        .match({
            category: "Blog",
            published: true
        }).sort({ claps: -1 })
        .project({
            title: 1,
            featured_image: 1,
            claps: 1,
            slug: 1,
            tags: 1,
            content: 1,
            duration: {
                $trunc: {
                    $divide: [{ $subtract: [new Date(), '$timestamp'] }, 1000 * 60 * 60 * 24]
                }
            }
        })

    return res.render('pages.blog', {
        posts
    })
}