const Tag = require('../database/models/Tag')

module.exports = async(req, res) => {
    await Tag.find({
        category: req.params.category
    }, function(err, tags) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).send(tags)
        }
    })
}