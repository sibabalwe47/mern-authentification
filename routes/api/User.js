const express = require('express')
const router = express.Router();
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')

router.post('/', 
[
    /* #1 Validattion */

    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()

], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    /* #2 Data from request body */

    const {name, email, password} = req.body;

    try {
        
        /* #3 Check if user exists */

        let user = await User.findOne({ email })

        if(user) return res.status(400).json({msg: 'User already exists'})

        /* #4 Instantiate User Model and put in data */

        user = new User({
            name, 
            email, 
            password
        })

        /* #5 Hash password */

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        /* #6 Save user */
        

        await user.save();

        /* #7 Create payload */

        const payload = {
            user: {
                id: user.id
            }
        }

        /* #8 Create token */

        jwt.sign(payload, 
                'secrettoken', 
                { expiresIn: 360000 } , (err, token) => {
                    res.json({token})
        })

        console.log(req.user)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }

})

module.exports = router;