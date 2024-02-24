
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
               try{
                 const number = phoneUtil.parseAndKeepRawInput(v, 'MG');
                 return phoneUtil.isValidNumber(number);
               } catch (error){
                 return false;
               }
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    address: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        validate: {
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            }, 
            message : props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        isClient: {
            type: Boolean,
            default: false
        }, 
        isEmployee: {
            type: Boolean,
            default: false
        }, 
        isManager: {
            type: Boolean,
            default: false
        }
    }, 
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });


userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch(err){
        next(err);
    }
    
});

userSchema.pre('save', async function(next){
    if(this.isModified('contacts') && (this.role.isEmployee || this.role.isManager)){
        const managers = await this.model('User').find({'role.isManager': true});
        managers.forEach(async (manager)=> {
            manager.contacts.push(...this.contacts);
            await manager.save();
        });
    }
    next();
})

userSchema.methods.isValidPassword = async function (password) {
    try{
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

userSchema.plugin(uniqueValidator);



const User = mongoose.model('User', userSchema);

module.exports = User;
