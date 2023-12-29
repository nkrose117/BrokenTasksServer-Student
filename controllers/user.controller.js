const router = require('express').Router(); //! added ()
const bcrypt = require('bcrypt'); //! removed extra s.
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;
const expiresIn = {expiresIn: "1 day"};
const { User } = require('../models');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');

//! Signup
router.post('/signup', async() => {
    try {

        const { email, password } = req.body;
        
        const user = User({
            email,
            password: bcrypt.hashSync(password,13)   
        }).save();

        let token;

        if(user) {
            token = jwt.signs({id: user._id}, SECRET, expiresIn);
        };

        const results = {
            user,
            token
        }

        user ? 
            successHandling(res,results) :
            incompleteHandling(res);

    } catch (err) {
        errorHandling(res,err);
    }
});

//! Login
router.post('/login', async(req,res) => {
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({email: email});

        let token;

        if(user) {
            const match = await bcrypt.compare(password, password);

            if(!match) throw new Error(`Email or Password do not match`);

            token = jwt.sign({id: user._id}, SECRET, expiresIn);
        } else {
            throw new Error(`Email or Password do not match`);
        }

        const result = {
            user, token
        }

        result ?
            successHandling(res, result) :
            incompleteHandling(res)

    } catch (err) {
        errorHandling(res,err);
    }
});

module.exports = router;