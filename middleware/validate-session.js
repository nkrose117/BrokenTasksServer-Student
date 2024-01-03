const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); //! added this line

const validateSession = async (req,res,next) => { //! added res.
    try {
        
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, process.env.JWT); //! added .verify

        const user = await User.findById(decoded.id); 
        if(!user) throw new Error(`User not found`);

        // req.user;
        req.user = user; //! added "= user";
        return next(); //! added line

    } catch (err) {
        res.json({message: err.message})
    }
}

module.exports = validateSession;