const path = require('path')
const Post = require('../database/models/Post')

module.exports = (req, res) => {

    if (req.body.published == "on") req.body.published = true
    else req.body.published = false

    if (req.files) {
        const {
            featured_image
        } = req.files

        var ext = featured_image.name.match('[^.]+$')
        var filename = Date.now() + '.' + ext
        featured_image.mv(path.resolve(__dirname, '..', 'public/posts', filename), (error) => {
            Post.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    featured_image: `/posts/${filename}`
                }, { new: true })
                .then((post) => {
                    if (!post) {
                        return res.status(404).send({
                            message: "no post found",
                        });
                    }
                    res.redirect('/admin')
                })
                .catch((err) => {
                    return res.status(404).send({
                        message: "error while updating the post",
                    });
                });
        })
    } else {
        Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((post) => {
                if (!post) {
                    return res.status(404).send({
                        message: "no post found",
                    });
                }
                res.redirect('/admin')
            })
            .catch((err) => {
                return res.status(404).send({
                    message: "error while updating the post",
                });
            });
    }
}