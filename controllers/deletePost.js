const Post = require('../database/models/Post')

module.exports = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found ",
                });
            }
            res.redirect('/admin')
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete Post ",
            });
        });
}