const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name.'],
    trim: true,
    maxlengh: [40, 'A username must have less or equal than 40 characters.'],
    minlength: [4, 'A username  must have more or equal than 10 characters.'],
  },
  email: {
    type: String,
    require: [true, 'Please provide your email.'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  password: {
    type: String,
    require: [true, 'Please provide a password.'],
    maxlengh: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please confirm your password.'],
    validate: {
      // works on CREATE and SAVE only
      validator: function (el) {
        return el === this.password;
      },
      message: 'Paswords are not the same.',
    },
  },
  photo: {
    type: String,
    trim: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (candidate, password) {
  return await bcrypt.compare(candidate, password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
