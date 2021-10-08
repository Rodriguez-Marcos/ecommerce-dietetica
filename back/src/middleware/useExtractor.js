const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID ='908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com';

async function useExtractor (req,res,next){
    

    const authorization = req.get('authorization');
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    let decodeToken = {};
    try {
       if(!await jwt.decode(token)?.iss)
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