const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email is incorrect').isEmail(),
        check('password', 'Password is incorrect').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty) {
            return req.status(400).json({
                message: 'Data input is incorrect!',
                errors: errors.array()
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({message: 'This user is already exist!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email: email, password: hashedPassword})

        await user.save()

        res.status(200).json({message: 'User created'})
        
    } catch(e) {
        res.status(500).json({message: 'Something went wrong with server, try again'})
    }
})

// /api/auth/login
router.post('/login',
    [
        check('email', 'Email is incorrect').normalizeEmail().isEmail(),
        check('password', 'Password is incorrect').exists().isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty) {
            return req.status(400).json({
                message: 'Data input is incorrect!',
                errors: errors.array()
            })
        }
        
        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: 'User not found'})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Wrong password, try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

    } catch(e) {
        res.status(500).json({message: 'Something went wrong with server, try again' + e.message})
    }
})


module.exports = router