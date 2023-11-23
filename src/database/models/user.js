
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        telefone: {
            type: String,
            unique: true,
            required: true
        },
        lastLogin: {
            type: Date,
            default: null
        }
    },
    { timestamps: true } 
);


userSchema.method('compare', async function (formPass, userPass) {
    return bcrypt.compare(formPass, userPass);
});


const User = mongoose.model('User', userSchema);

module.exports = User;