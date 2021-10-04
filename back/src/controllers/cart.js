const jwt = require('jsonwebtoken')

export async function addCart(req, res) {
    const {
        id,
        userId
    } = req.body;
    const authorization = req.get('authorization');
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
        console.log(token)
    }
    const decodeToken = jwt.verify(token, 'secret')

    if (!token || !decodeToken.id) {
        return res.status(401).json({ error: 'token invalido' })
    }

}