const errorHandling = (res,err) => {
    return res.status(500).json({
        ERROR: err.message
    })
}

const successHandling = (res,obj) => {
    return(
        res.status(200).json({
            result: obj
        })
    )
}

const incompleteHandling = res => {
    return(
        res.status(404).send(
            `Record unable to be added`
        )
    )
}

module.exports = {
    errorHandling,
    successHandling,
    incompleteHandling
}