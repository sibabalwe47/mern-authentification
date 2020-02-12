const express = require('express')
const router = express.Router();
const { check, validationResult} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/',

    /* #1 Validation */
     
    [
        check('email', 'Email is require').not().isEmpty(),
        check('password', 'Password is require').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) return res.status(401).json({errors: errors.array()})

    /* #2 Data from Request Body */

    const { email, password} = req.body;

    try {

        /* #3 Check user exists */

        const user = await User.findOne({email})

        /* #4 Matched Password */

        const matchPasswords = await bcrypt.compare(password, user.password)

        /* #5 Match */
        if(matchPasswords) {

            /* #6 Payload */

            const payload = {
                user: {
                    id: user.id
                }
            }

            /* #7 Create Token */

            jwt.sign(payload, 'secrettoken', {expiresIn: 360000}, (err, token) => {
                res.json({token})
            })

            console.log(req)
        } else {
            return res.status(400).json({msg: 'Invalid credentials'})
        }


        
    } catch (error) {
         console.log(error.message)
         res.status(500).send('Server Error')
    }


    // Validate
    // Find user by email
    // Match password 
    // Send token
})



module.exports = router