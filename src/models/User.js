const { Schema, model } = require('mongoose'); //ahora no va importar mongoose para connectar sino algunos metodos que tiene
const bcrypt = require('bcryptjs');


const userSchema = new Schema({//el schema es que data voy a estar guardando. DESCRIBIENDO
    username: String,
    email: String,
    password: String,
});

userSchema.methods.encryptPassword = async (password) => { //este metodo encryptPassword ahora apartenece al modelo User
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password) //password-> the one that is passed of signin; this.password->validate password is a method que apartanece a userschema method, asi que this.password es la contraseña que ya tengo en la bd en userschema
}

module.exports = model('User', userSchema);//para crear en la bd. en la bd voy a guardar un modelo de usuario que voy a llamar 'User', y va a estar basado en el userSchema 