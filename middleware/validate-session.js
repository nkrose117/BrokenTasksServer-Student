const jwt = require('jsonwebtoken');


const validateSession = async (req,res,next) => { //! added res.
    try {
        
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, process.env.JWT); //! added .verify

        const user = await user.findById(decoded.id); //! changed User to user.
        if(!user) throw new Error(`User not found`);

        // req.user;
        req.user = user; //! added "= user";
        next(); //! added next();

    } catch (err) {
        res.json({message: err.message})
    }
}

module.exports = validateSession;