module.exports = (req, res, next) => {
    if (!req.body.title || !req.body.tags || !req.body.content) {
        return res.status(404).send({
            message: "Make sure you already fill all required fields",
        });
    }
    next()
}