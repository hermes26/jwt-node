const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req,res,next){ //eso es un middleware
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
    //en todos las rutas de mi servidor existe un obj req, puedo guardar userid, para que todas las rutas pueden pasarse datos
    req.userId = decoded.id;
    next(); //next() porque la function va ser utilizada como function intermediaria, middleware. sigfig continuar con la siguiente funcion despues del middleware
}

module.exports = verifyToken;