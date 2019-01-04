import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: 'User with email "VALUE" already exist',
            required: 'Email is required',
            lowercase: true,
        },
        password: {
            type: String,
            required: 'Password is required',
        },
        firstName: {
            type: String,
            required: 'First name is required',
        },
        lastName: {
            type: String,
            required: 'Last name is required',
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.statics.createFields = ['email', 'password', 'firstName', 'lastName'];

UserSchema.statics.getInfo = function(id) {
    return this.findById(id, {
        _id: 0,
        email: 1,
        firstName: 1,
        lastName: 1,
    });
};

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', UserSchema);
