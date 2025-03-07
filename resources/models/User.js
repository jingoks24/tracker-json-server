const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next){
    const user = this;
    console.log("save");
    if(!user.isModified('password')){
        return next;
    }

    bcrypt.genSalt( 10 , ( err,salt ) => {
        console.log("gensalt Error >> ",err);

        if(err){
            return next(err)
        }

        bcrypt.hash(user.password, salt, (err, hash)=>{
        console.log("hash Error >> ",err);
            if(err){
                next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword){
    const user = this;
    return new Promise((resolve, reject)=>{
        bcrypt.compare(candidatePassword,user.password, (err,isMatch) => {
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(false);
            }
            resolve(true);
        })
    })
}

mongoose.model('User', userSchema);