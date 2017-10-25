const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcryptjs'),
      config = require('../config/database');


const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    expenses: {type: Array}
});

const User = mongoose.model('User', UserSchema);
exports.User = User;

const ExpenseSchema = new Schema({
    category: String,
    amount: Number,
    date: Date
    // day
    // month
    // year
});

const Expense = mongoose.model('Expense', ExpenseSchema);
exports.Expense = Expense;

exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

exports.getUserByUsername = (username, callback) => {
    const query = {username: username}
    User.findOne(query, callback);
};

exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

exports.getExpensebyCategory = (category, callback) => {
    const query = {category: category}
    User.find(query, callback);
};

