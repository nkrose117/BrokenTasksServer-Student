const setDate = (req,res,next) => {
    let date = new Date();
    // req.date = date.toLocaleDateString();
    req.date = date.toLocaleString();
    next()
}

module.exports = {
    setDate,
}