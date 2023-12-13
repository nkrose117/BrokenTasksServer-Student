const setDate = (req,res,next) => {
    let date = new Date();
    req.date = date.toLocaleDateString();
    next()
}

module.exports = {
    setDate,
}