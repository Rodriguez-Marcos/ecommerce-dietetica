import Client from "../models/Client";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router();
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID ='908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com';



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
        email: user.email
    }
    const token = jwt.sign(userForToken, 'secret')
console.log(user.dataValues)
    res.send(
    token
    )
}

///midleware xd

async function comodin (email){
    const user = await Client.findOne({where:{email}})
    return user;
}



async function useExtractor (req,res,next){
    

    const authorization = req.get('authorization');
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    let decodeToken = {};
    try {
       if(!await jwt.decode(token).iss)
       {decodeToken = jwt.verify(token,'secret')}
       else{
        const client = new OAuth2Client(CLIENT_ID);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            console.log(ticket, userid)
            console.log(await comodin(ticket.payload.email))
        }
        verify().catch(console.error);
    }
    } catch (error) {
        console.log(error);
    }
    if (!token || !decodeToken?.id) {
        return res.status(401).json({ error: 'token invalido' })
    }
    req.id = decodeToken.id
    next();

}

export default useExtractor;