const router = require('express').Router();
const bcrypt = require('bcrypt'); //! removed s
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;
const expiresIn = {expiresIn: "1 day"};
const { User } = require('../models');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');

//! Signup
router.post('/signup', async(req,res) => { //! added req,res to ()
    try {

        const { email, password } = req.body;
        
        const user = new User({ //! add "await" new User?
            email, //! added req.body.email ?
            password: bcrypt.hashSync(password,13)   
        }).save();
        
        let token;

        if(user) {
            token = jwt.sign({id: user._id}, SECRET, expiresIn); //! changed signs to sign
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
    console.log('password');
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({email: email});

        let token;

        if(user) {
            const match = await bcrypt.compare(password, user.password); //! added user.

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
