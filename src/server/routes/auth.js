const router = require('express').Router()
const User = require('../../database/models/user')
const passport = require('passport')
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require("jsonwebtoken")
const { secretKey } = require('../../environment/vars')


module.exports = app => {     
    router.post("/login", (req, res, next) => { 
        passport.authenticate('local', 
            { session: false }, 
            async (err, user, info) => { 
                if (err) { 
                    return res.status(500).json({ err });
                }
    
                if (!user) { 
                    const { message } = info;
                    return res.status(401).json({ message });
                }
                
                const { _id } = user;
                const token = jwt.sign({ _id }, secretKey, { expiresIn: '3m' });
    
                
                user.lastLogin = new Date();
                await user.save(); 
    
                res.cookie('jwt', token, { 
                    httpOnly: false, 
                    secure: false
                }).status(200).send({
                    id: _id,
                    data_criacao: user.createdAt,
                    data_atualizacao: user.updatedAt,
                    ultimo_login: user.lastLogin,
                    token: token
                });
            }
        )(req, res, next);
    });
    
    router.post("/register", async (req, res) => { 
        const { senha, nome, email, telefone } = req.body
    
        try {
            const hash = await bcrypt.hash(senha, saltRounds);
            const newUser = await User.create({ nome, email, senha: hash, telefone });
            return res.json({ message: "usuario criado" });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: "usuario ja existe" });
        }
    });
    
    app.use("/auth", router)
}