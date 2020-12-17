const Post = require('../database/models/Post')

module.exports = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, { $inc: { claps: 1 } }, { new: true })
        .then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: "no post found",
                });
            }
            res.status(200).send(post);
        })
        .catch((err) => {
            return res.status(404).send({
                message: "error while updating the post",
            });
        });
}