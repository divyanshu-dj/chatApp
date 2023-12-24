const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    }
},{timestamps:true})


// userSchema.path('password').validate((password) => {
//     return password.length>=8;
// }, 'Password must be at least 8 characters long.')
//
// // Hashing a password before saving it to the database
// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//     next();
// });


const User = mongoose.model('User', userSchema);


module.exports = User;