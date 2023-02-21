const notFound = (req, res) => {
    res.status(400).res.json({
        success: false,
        msg: "Route does not exist"
    })
}

module.exports = notFound;