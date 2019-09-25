const { Router } = require('express');
const router = Router();

router.post('/login', (req, res, next) => {
    res.json('login')
})

router.post('/register', (req, res, next) => {
    res.json('register')
})

router.get('/profile', (req, res, next) => {
    res.json('profile')
})

module.exports = router;