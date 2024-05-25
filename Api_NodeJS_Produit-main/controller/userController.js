const User = require('../Models/user');
const createError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const InvalidToken = require('../Models/invalidToken');
const bcrypt = require('bcryptjs');
const issuedTokens = [];
const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that email address.' });
        }

        const resetToken = bcrypt.randomBytes(32).toString('hex');
        const hashedToken = bcrypt.createHash('sha256').update(resetToken).digest('hex');

        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetURL = `http://localhost:3000/auth/resetPassword/${resetToken}`;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465 , 
            secure: true,
            auth: {
                user: 'nourbenghayadh@gmail.com',
                pass: 'cmdb vjki nqkl ghbc'
            }
        });
        

        const fixedEmail = 'nourbenghayadh@gmail.com'; // Adresse e-mail fixe
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: fixedEmail,
            subject: 'Password reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${resetURL}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending password reset email.' });
    }
};
exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = bcrypt.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Token is invalid or has expired.' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been reset.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error resetting password.' });
    }
};
// Register user
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists!' });
        }
        
        // Hash password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Creating a new user with a hashed password
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        // Create JWT token with the new user's info
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);

        // Store the issued token (if necessary)
        issuedTokens.push(token);

        // Respond with user info and token
        res.status(201).json({
            status: 'success',
            token: token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing up the user.' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465 , 
        secure: true,
        auth: {
            user: 'nourbenghayadh@gmail.com',
            pass: 'cmdb vjki nqkl ghbc'
        }
    });
}



exports.login = async (req, res, next) => {
    try {
        const {username,password}=req.body;
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(404).send('user not found')
        }
        const isPasswordMatch =await bcrypt.compare(password,user.password);
      if(!isPasswordMatch){
        return res.status(401).send('invalid password')
      }
       const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
       res.send({token:token})
       } catch (err) {
        res.status(400).send(err.message)
       }
}

// Logout user
exports.logout = async (req, res, next) => {
    try {
        // Vérifier si l'en-tête Authorization existe dans la demande
        if (!req.headers.authorization) {
            return res.status(400).json({ error: 'Authorization header is missing' });
        }

        // Récupérer le token du header Authorization
        const tokenParts = req.headers.authorization.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(400).json({ error: 'Invalid authorization header format' });
        }
        const token = tokenParts[1];

        // Enregistrez le token actuel dans le modèle InvalidToken
        await InvalidToken.create({ token });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during the logout process' });
    }
};


//fonction pour getter tous les users de role user khw 

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ role: 'user' });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
};



