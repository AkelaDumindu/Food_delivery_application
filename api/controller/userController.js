const UserSchema = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const salt=10;
const nodemailer= require('nodemailer');

// const signup = async(req, resp)=>{
//     UserSchema.findOne({email:req.body.email}).then(result=>{
//         if(result==null){
//             bcrypt.hash(req.body.password, 10, function(err, hash) {
//                 if(err){
//                         return resp.status(500).json({message:'something went wrong'});
//                 }

//                 const user = new UserSchema({
//                     userName : req.body.userName,
//                     fullName:req.body.fullName,
//                     password:hash
//                 });
//                 user.save().then(savedData=>{
//                     resp.status(201).json({message:'user was saved'});
//                 }).catch(error=>{
//                     resp.status(500).json(error);
//                 })
//             });
//         }else{
//             resp.status(409).json({message:'email already exist!'});
//         }
//     }).catch(error=>{
//         resp.status(500).json(error);
//     })

// };

const register = (req, resp) => {
    UserSchema.findOne({ email: req.body.email }).then(result => {
        if (result == null) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) {
                    return resp.status(500).json({ message: 'Something went wrong during password hashing' });
                }
                const user = new UserSchema({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hash,
                    confirmPassword: hash,
                    email: req.body.email,
                    activeState: true,
                    role: req.body.role || 'user'
                });

                user.save().then(saveResponse => {
                    return resp.status(201).json({ message: 'User successfully registered!' });
                }).catch(error => {
                    return resp.status(500).json({ message: 'Error saving user', error: error });
                });

            });
        } else {
            return resp.status(409).json({ error: 'Email already exists!' });
        }
    }).catch(error => {
        return resp.status(500).json({ message: 'Error checking email', error: error });
    });
};



// const login = async(req, resp)=>{
//     UserSchema.findOne({userName:req.body.userName}).then(selectedUser=>{
//         if(selectedUser==null){

//             return resp.status(404).json({message:'user not found'});
            
//         }else{
//             bcrypt.compare(req.body.password, selectedUser.password, function(err, result) {
//                 if(err){
//                         return resp.status(500).json(err);
//                 }

//                if(result){
                
//                 const expiresIn = 3600;
//                 const token = jsonWebToken.sign({'userName':selectedUser.userName},process.env.SECRET_KEY, {expiresIn});
//                 resp.setHeader('Authorization', `Bearer ${token}`)
                
//                 return resp.status(200).json({message:'check the headers'});

//                }else{
//                 return resp.status(401).json({message:'password is incorrect'});
//                }
//             });
//         }
//     }).catch(error=>{
//         resp.status(500).json(error);
//     })

// };

const login = (req, resp) => {
    UserSchema.findOne({ email: req.body.email }).then(selectedUser => {
        if (selectedUser !== null) {
            bcrypt.compare(req.body.password, selectedUser.password, function (err, result) {
                if (err) {
                    return resp.status(500).json({ message: 'Internal server error' });
                }

                if (result) {
                    // Successful login, without token generation
                    return resp.status(200).json({
                        message: 'Login successful',
                        user: {
                            id: selectedUser._id,
                            firstName: selectedUser.firstName,
                            lastName: selectedUser.lastName,
                            email: selectedUser.email,
                            role: selectedUser.role,
                            activeState: selectedUser.activeState,
                            role:selectedUser.role
                        }
                    });
                } else {
                    return resp.status(401).json({ message: 'Incorrect password!' });
                }
            });
        } else {
            return resp.status(404).json({ message: 'User not found!' });
        }
    }).catch(error => {
        return resp.status(500).json({ message: 'Internal server error', error: error.message });
    });
};




module.exports = {
    register, login
}