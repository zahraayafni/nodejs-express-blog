const Tag = require('../database/models/Tag')

module.exports = (req, res) => {
    Tag.create(req.body, (error, tag) => {
        if (error) {
            return res.status(404).send({
                message: "failed to save tag",
            });
        }
        return res.status(200).send(tag);
    })
}