//this file will hold the resources for the route paths beginning with /api/users
const express = require('express');

//User Signup API Route
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models')

const router = express.Router();

//sign up
router.post(
    '/',
    async(req, res) => {
        const { email, password, username } = req.body
        const user = await User.signup({ email, username, password })

        await setTokenCookie(res, user)

        return res.json({ user })
    }
)


module.exports = router;