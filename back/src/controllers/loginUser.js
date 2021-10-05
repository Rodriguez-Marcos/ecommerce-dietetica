import Client from "../models/Client";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router();


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

    res.send(
        token
    )
}