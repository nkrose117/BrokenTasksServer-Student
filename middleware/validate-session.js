const jwt = require('jsonwebtoken');


const validateSession = async (req,next) => {
    try {
        
        const token = req.headers.authorization;
        const decoded = await jwt(token, process.env.JWT);

        const user = await User.findById(decoded.id);
        if(!user) throw new Error(`User not found`);

        req.user;

        

    } catch (err) {
        res.json({message: err.message})
    }
}

module.exports = validateSession;