const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    featured_image: { type: String, default: null },
    slug: { type: String, slug: 'title', unique: true, dropDups: true },
    content: { type: String },
    claps: { type: Number, default: 0 },
    category: { type: String },
    tags: { type: [String] },
    published: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post