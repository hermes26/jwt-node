const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User')

router.post('/login', async (req, res, next) => {
    const { username, email, password } = req.body;
   // User.create({ //user.create() es un metodo del modelo para guardar un dato directamente en la bd
    const user = new User({ //crea un objeto que despues voy a guardar en mi bd. ese obj tendra un _id anadido tambien
        username,
        email,
        password
    })
    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret, {//sign-permite registrar/crear un token
        expiresIn: 60 * 60 * 24//3 param - cuanto tiempo va a durar el token
    }); 
    
    res.json({auth: true, token: token});//va a pasar al usuario el mensaje auth:true y el token
        
    //})
})

router.post('/register', (req, res, next) => {
    res.json('register')
})

router.get('/profile', (req, res, next) => {
    res.json('profile')
})

module.exports = router;