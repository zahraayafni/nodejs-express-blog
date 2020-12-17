const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String }
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag