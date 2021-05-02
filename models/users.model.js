const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true,
    },
    email : {
        type : String,
        required : true,
        unique :true
    },
    password : {
        type : String,
        required :true,
        unique : true
    },
    joined : {
        type : Date,
        required : false,
        unique : false,
        default : Date.now
    },
    location : {
        type : String,
        required :false,
        unique : false
    },
    avatar : {
        type : Buffer,
        required : false,
        unique : false
    },
    following : {
        type : Array,
        required:false,
        unique:false
    },
    followers : {
        type: Array,
        required:false,
        unique:false
    },
    tokens :[{
        token : {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({email : user.email} , 'socialmedia',{expiresIn:'2h'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// userSchema.statics.findByCredentials = async (givenEmail,givenPassword) => {
//     const user = await accountModel.findOne({email:givenEmail})

//     if(!user) {
//         throw new  Error('Unable to login')
//     }

//     const isMatch = await bcrypt.compare(givenPassword , user.password)

//     if(!isMatch) {
//         throw new Error('Unable to Login')
//     }

//     return user
// }

// userSchema.pre('save', async function (next) {
//     const user = this
 
//     if(user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
 
//     next()
//  })

const userModel  = mongoose.model('users',userSchema);
module.exports= userModel;