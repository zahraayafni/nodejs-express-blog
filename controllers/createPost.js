const Tag = require('../database/models/Tag')

module.exports = async(req, res) => {
    const tags = await Tag.find({})
    return res.render('pages.admin.credit', {
        tags
    })
}