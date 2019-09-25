const { Schema, model } = require('mongoose'); //ahora no va importar mongoose para connectar sino algunos metodos que tiene

const userSchema = new Schema({//el schema es que data voy a estar guardando. DESCRIBIENDO
    username: String,
    email: String,
    password: String,
})

module.exports = model('User', userSchema);//para crear en la bd. en la bd voy a guardar un modelo de usuario que voy a llamar 'User', y va a estar basado en el userSchema 