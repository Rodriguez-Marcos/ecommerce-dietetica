import Client from "../models/Client";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router();
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID ='908895428836-4a919vmuc5gl4ao04i8cjpgmnjt58ks0.apps.googleusercontent.com';



export async function loginUser(req, res) {
    const { username, password } = req.body
    const email = username
    const user = await Client.findOne({ where: { email } })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'invalid user or password' })
    }
    const userForToken = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }
    const token = jwt.sign(userForToken, 'secret')
    res.send(
    token
    )
}

///midleware xd



async function useExtractor (req,res,next){
    

    const authorization = req.get('authorization');
 
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    else{
        throw new Error('El metodo de autenticacion tiene que ser Bearer')
    }
    let decodeToken = {};
    let iss = await jwt.decode(token)?.iss
    try {
       if(!iss)
       {decodeToken = jwt.verify(token,'secret')}

       else{
        const client = new OAuth2Client(CLIENT_ID);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                expires_in: false,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            const user = await Client.findOne({where:{email: ticket.payload.email}});
            if(user?.password)
                throw new Error('Se encontro un usuario ya registrado con ese email')

                req.id = user?.id;
                req.email = ticket.payload.email;
                let [name, lastname] = ticket.payload.name.split(' ')
                req.name = name
                req.lastname = lastname?lastname:'no lastname';

        }

        await verify()
    }
    } catch (error) {
        console.log(error)
        return res.status(409).json({error: error});
    }
    if (!token || !decodeToken?.id) {
        if(!iss)
        return res.status(401).json({ error: 'token invalido' })
    }
    if(!req.id)
    req.id = decodeToken.id;
    if(!req.email)
    req.email = decodeToken.email;

    next();

}

export default useExtractor;