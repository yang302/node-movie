const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10; //加密强度

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    //0: 普通用户
    //1: 管理员
    //2: 超级管理员
    role: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function(next) {
    const user = this;
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if(err) return cb(err);

            cb(null, isMatch);
        });
    }
};

UserSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
};

module.exports = UserSchema;