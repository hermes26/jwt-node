const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User')

router.post('/login', async (req, res, next) => {
    const { username, email, password } = req.body;
   // User.create({}) //user.create() es un metodo del modelo para guardar un dato directamente en la bd
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
        
})

router.get('/profile', async (req, res, next) => { //usuario puede acceder solamente si tiene authorisacion. asi que primero hay que ver si el usuario tiene un token o no

    //cuando enviamos un token, existe una cabezera/header x-access-token con valor el token que tenemos
    //en el servidor comprobamos que existe esa header, entonces tiene un token, y entonces authorisacion para hacer algo
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    };

    const decoded = jwt.verify(token, config.secret);
    const user = await User.findById(decoded.id, { password: 0 }); //si no quieres devolver un dato en mongoose eg password: 0
    if(!user){
        return res.status(404).send('No user found');
    }

    res.json(user);
})

router.post('/register', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).send('The email does not exist')
    };

    const passwordIsValid = await user.validatePassword(password);
    if(!passwordIsValid){
        return res.status(404).json({auth:false, token:null})
    };

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({auth: true, token: token})
})


module.exports = router;