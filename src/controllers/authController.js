const { Router } = require('express');
const router = Router();

const User = require('../models/User')

router.post('/login', async (req, res, next) => {
    const { username, email, password } = req.body;
   // User.create({ //user.create() es un metodo del modelo para guardar un dato directamente en la bd
    const user = new User({ //crea un objeto que despues voy a guardar en mi bd. ese obj tendra un id anadido tambien
        username,
        email,
        password
    })
    user.password = await user.encryptPassword(user.password);
    await user.save();
    console.log(user);
    res.json({message: 'received'});
        
    //})
})

router.post('/register', (req, res, next) => {
    res.json('register')
})

router.get('/profile', (req, res, next) => {
    res.json('profile')
})

module.exports = router;