const path = require('path')
const expressEdge = require('express-edge')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')

const homePageController = require('./controllers/homePage')
const getSinglePostController = require('./controllers/getPost')
const blogPostController = require('./controllers/blogPosts')

const loginController = require('./controllers/login')
const logoutController = require('./controllers/logout')
const loginUserController = require('./controllers/loginUser')

const createPostController = require('./controllers/createPost')
const storePostController = require('./controllers/storePost')
const editPostController = require('./controllers/editPost')
const storeEditedPostController = require('./controllers/storeEditedPost')
const deletePostController = require('./controllers/deletePost')

const incClapsController = require('./controllers/incClaps')

const storeTagController = require('./controllers/storeTag')
const getTagsController = require('./controllers/getTags')

const storeUserController = require('./controllers/storeUser')

const storePost = require('./middleware/storePost')
const authChecker = require('./middleware/authChecker')
const redirectIfAuth = require('./middleware/redirectIfAuthenticated')

const app = new express()

mongoose.connect('mongodb://127.0.0.1:27017/node-blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'Its me Zahrah!',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 30 * 1000
    }
}))

app.use(fileUpload())
app.use(express.static(__dirname + '/public'))
app.use(expressEdge.engine)
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.render('index')
})

// app.get('/blog', (req, res) => {
//     res.render('pages.blog')
// })

app.get('/blog', blogPostController)
app.get('/post/:slug', getSinglePostController)
app.post('/post/claps/:id', incClapsController)
app.get('/tags/:category', getTagsController)

app.get('/logout', authChecker, logoutController)
app.get('/login', redirectIfAuth, loginController)
app.post('/login', redirectIfAuth, loginUserController)
app.get('/admin', authChecker, homePageController)
app.post('/admin/tag/create', authChecker, storeTagController)
app.get('/admin/post/create', authChecker, createPostController)
app.post('/admin/post/create', authChecker, storePost, storePostController)
app.get('/admin/post/edit/:id', authChecker, editPostController)
app.post('/admin/post/edit/:id', authChecker, storePost, storeEditedPostController)
app.post('/admin/post/delete/:id', authChecker, deletePostController)
app.post('/user/register', authChecker, storeUserController)

app.listen(4000, () => {
    console.log('App listening on port 4000')
})