const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
});


userSchema.pre('save', async function(next){
    const user = this;
  
    next();
})



module.exports = mongoose.model('User', userSchema);
